import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm your shopping assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const botResponses = [
    "That's a great question! Let me help you with that.",
    "I'd be happy to assist you!",
    "Thanks for asking! Here's what I know:",
    "Let me check that for you...",
    "I'm here to help! What else can I do for you?",
    "That's a good point! Here's my suggestion:",
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    setTimeout(() => {
      const randomResponse =
        botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage: Message = {
        id: Date.now() + 1,
        text: `${randomResponse} For more details, please check our product pages or contact support.`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  const quickQuestions = [
    "How do I track my order?",
    "What's your return policy?",
    "Do you ship internationally?",
    "How do I apply a promo code?",
  ];

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-16 h-16 bg-emerald-500 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl"
      >
        {isOpen ? "✕" : "💬"}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 left-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="max-w-[80%] bg-gray-100 p-3 rounded-xl">
                    <p className="text-sm">{m.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {messages.length <= 1 && (
              <div className="p-3 flex gap-2 flex-wrap">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => setInputText(q)}
                    className="text-xs px-2 py-1 bg-emerald-100 rounded"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="p-4 flex gap-2">
              <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 border rounded px-3 py-2"
              />
              <button className="bg-emerald-500 text-white px-4 rounded">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
