import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

type QAItem = {
  id: number;
  question: string;
  answer?: string;
  author: string;
  date: string;
  helpful?: number;
  answers?: Array<{
    id: number;
    answer: string;
    author: string;
    date: string;
  }>;
};

type ProductQAProps = {
  productId: number;
  initialQAs?: QAItem[];
};

const ProductQA = ({ productId, initialQAs = [] }: ProductQAProps) => {
  const [qas, setQAs] = useState<QAItem[]>(initialQAs);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [answerToId, setAnswerToId] = useState<number | null>(null);
  const { showToast } = useToast();

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) {
      showToast("Please enter a question", "error");
      return;
    }

    const qa: QAItem = {
      id: Date.now(),
      question: newQuestion.trim(),
      author: "You", // In real app, get from auth context
      date: new Date().toISOString(),
      helpful: 0,
    };

    setQAs([qa, ...qas]);
    setNewQuestion("");
    setShowQuestionForm(false);
    showToast("Question submitted!", "success");

    // Save to localStorage
    const savedQAs = JSON.parse(localStorage.getItem(`qa_${productId}`) || "[]");
    savedQAs.push(qa);
    localStorage.setItem(`qa_${productId}`, JSON.stringify(savedQAs));
  };

  const handleAnswer = (qaId: number) => {
    if (!newAnswer.trim()) {
      showToast("Please enter an answer", "error");
      return;
    }

    const answer = {
      id: Date.now(),
      answer: newAnswer.trim(),
      author: "You",
      date: new Date().toISOString(),
    };

    setQAs((prev) =>
      prev.map((qa) =>
        qa.id === qaId
          ? {
              ...qa,
              answer: newAnswer.trim(),
              answers: [...(qa.answers || []), answer],
            }
          : qa
      )
    );

    setNewAnswer("");
    setAnswerToId(null);
    showToast("Answer submitted!", "success");

    // Save to localStorage
    const savedQAs = JSON.parse(localStorage.getItem(`qa_${productId}`) || "[]");
    const updatedQAs = savedQAs.map((qa: QAItem) =>
      qa.id === qaId
        ? { ...qa, answer: newAnswer.trim(), answers: [...(qa.answers || []), answer] }
        : qa
    );
    localStorage.setItem(`qa_${productId}`, JSON.stringify(updatedQAs));
  };

  const handleHelpful = (qaId: number) => {
    setQAs((prev) =>
      prev.map((qa) =>
        qa.id === qaId ? { ...qa, helpful: (qa.helpful || 0) + 1 } : qa
      )
    );
    showToast("Thank you for your feedback!", "success");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          💬 Questions & Answers
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowQuestionForm(!showQuestionForm)}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition"
        >
          Ask a Question
        </motion.button>
      </div>

      {/* Ask Question Form */}
      <AnimatePresence>
        {showQuestionForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleAskQuestion}
            className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
          >
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Ask a question about this product..."
              rows={3}
              className="w-full px-4 py-2 border-2 border-emerald-200 dark:border-emerald-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mb-3"
            />
            <div className="flex gap-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm"
              >
                Submit Question
              </motion.button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setShowQuestionForm(false);
                  setNewQuestion("");
                }}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm"
              >
                Cancel
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Q&A List */}
      {qas.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            No questions yet. Be the first to ask!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {qas.map((qa) => (
            <div
              key={qa.id}
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6"
            >
              {/* Question */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-gray-900 dark:text-gray-100 text-lg">
                    Q: {qa.question}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(qa.date)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">by {qa.author}</p>
              </div>

              {/* Answer */}
              {qa.answer && (
                <div className="ml-6 mb-4 pl-4 border-l-4 border-emerald-500 dark:border-emerald-600">
                  <p className="font-semibold text-emerald-700 dark:text-emerald-400 mb-1">A:</p>
                  <p className="text-gray-700 dark:text-gray-300 mb-2">{qa.answer}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    by {qa.author} • {formatDate(qa.date)}
                  </p>
                </div>
              )}

              {/* Additional Answers */}
              {qa.answers && qa.answers.length > 0 && (
                <div className="ml-6 space-y-3">
                  {qa.answers.map((answer) => (
                    <div
                      key={answer.id}
                      className="pl-4 border-l-4 border-emerald-300 dark:border-emerald-700"
                    >
                      <p className="text-gray-700 dark:text-gray-300 mb-1">{answer.answer}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {answer.author} • {formatDate(answer.date)}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {!qa.answer && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setAnswerToId(qa.id)}
                    className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 rounded-lg text-sm font-medium transition"
                  >
                    💬 Answer
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleHelpful(qa.id)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition"
                >
                  👍 Helpful ({qa.helpful || 0})
                </motion.button>
              </div>

              {/* Answer Form */}
              {answerToId === qa.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <textarea
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Write your answer..."
                    rows={3}
                    className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 mb-2"
                  />
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAnswer(qa.id)}
                      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm"
                    >
                      Submit Answer
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setAnswerToId(null);
                        setNewAnswer("");
                      }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm"
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductQA;
