import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

export type Review = {
  id: number;
  name: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified?: boolean;
  helpful?: number;
  images?: string[];
  replies?: Array<{
    id: number;
    author: string;
    text: string;
    date: string;
  }>;
};

type ReviewItemProps = {
  review: Review;
  productId: number;
  onHelpful?: (reviewId: number, helpful: boolean) => void;
  onReply?: (reviewId: number, replyText: string) => void;
};

const ReviewItem = ({ review, productId, onHelpful, onReply }: ReviewItemProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [helpfulCount, setHelpfulCount] = useState(review.helpful || 0);
  const [userVoted, setUserVoted] = useState(false);
  const { showToast } = useToast();

  const handleHelpful = () => {
    if (userVoted) {
      showToast("You've already voted!", "info");
      return;
    }
    const newCount = helpfulCount + 1;
    setHelpfulCount(newCount);
    setUserVoted(true);
    onHelpful?.(review.id, true);
    
    // Save to localStorage
    const helpfulVotes = JSON.parse(localStorage.getItem(`reviewHelpful_${productId}`) || "{}");
    helpfulVotes[review.id] = newCount;
    localStorage.setItem(`reviewHelpful_${productId}`, JSON.stringify(helpfulVotes));
    
    showToast("Thank you for your feedback!", "success");
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) {
      showToast("Please enter a reply", "error");
      return;
    }
    
    onReply?.(review.id, replyText.trim());
    setReplyText("");
    setShowReplyForm(false);
    showToast("Reply submitted!", "success");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-b border-gray-200 dark:border-gray-700 pb-6 mb-6 last:border-b-0"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h4 className="font-bold text-gray-900 dark:text-gray-100">{review.name}</h4>
            {review.verified && (
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold rounded-full">
                ✓ Verified Purchase
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">{renderStars(review.rating)}</div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {formatDate(review.date)}
            </span>
          </div>
          <h5 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{review.title}</h5>
          <p className="text-gray-700 dark:text-gray-300 mb-3">{review.text}</p>
        </div>
      </div>

      {/* Review Images */}
      {review.images && review.images.length > 0 && (
        <div className="flex gap-2 mb-3 flex-wrap">
          {review.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Review image ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700 cursor-pointer hover:border-emerald-400 transition-all"
              onClick={() => window.open(image, "_blank")}
            />
          ))}
        </div>
      )}

      {/* Helpful Button */}
      <div className="flex items-center gap-4 mb-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleHelpful}
          disabled={userVoted}
          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-all ${
            userVoted
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 cursor-not-allowed"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          <span>👍</span>
          <span>Helpful ({helpfulCount})</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReplyForm(!showReplyForm)}
          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium transition-all"
        >
          💬 Reply
        </motion.button>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleReplySubmit}
          className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
        >
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            rows={3}
            className="w-full px-4 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
          />
          <div className="flex gap-2 mt-2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold text-sm"
            >
              Submit Reply
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowReplyForm(false);
                setReplyText("");
              }}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm"
            >
              Cancel
            </motion.button>
          </div>
        </motion.form>
      )}

      {/* Replies */}
      {review.replies && review.replies.length > 0 && (
        <div className="mt-4 ml-6 space-y-3 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
          {review.replies.map((reply) => (
            <div key={reply.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{reply.author}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(reply.date)}
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.text}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ReviewItem;
