import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../context/ToastContext";

type VoiceSearchProps = {
  onTranscript: (text: string) => void;
  onClose?: () => void;
};

const VoiceSearch = ({ onTranscript, onClose }: VoiceSearchProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const { showToast } = useToast();

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported in your browser");
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
      onTranscript(transcript);
      setIsListening(false);
      showToast("Voice search completed!", "success");
      onClose?.();
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setError(`Error: ${event.error}`);
      setIsListening(false);
      showToast("Voice recognition error", "error");
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onClose, showToast]);

  const startListening = () => {
    setError(null);
    setTranscript("");
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        showToast("Listening... Speak now!", "info");
      } catch (err) {
        console.error("Error starting recognition:", err);
        setError("Could not start voice recognition");
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  if (error && !isListening) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
        <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
        <p className="text-xs text-red-600 dark:text-red-500 mt-2">
          Please use Chrome, Edge, or Safari for voice search
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-emerald-200 dark:border-gray-700">
      <div className="text-center">
        <motion.div
          animate={isListening ? { scale: [1, 1.2, 1] } : {}}
          transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
          className="mb-4"
        >
          <div
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl ${
              isListening
                ? "bg-red-500 animate-pulse"
                : "bg-emerald-500 dark:bg-emerald-600"
            }`}
          >
            🎤
          </div>
        </motion.div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {isListening ? "Listening..." : "Voice Search"}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {isListening
            ? "Speak your search query..."
            : "Click the microphone to start voice search"}
        </p>

        {transcript && (
          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              You said: "{transcript}"
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          {!isListening ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startListening}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              🎤 Start Listening
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopListening}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition shadow-lg hover:shadow-xl"
            >
              ⏹ Stop
            </motion.button>
          )}

          {onClose && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition"
            >
              Cancel
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSearch;
