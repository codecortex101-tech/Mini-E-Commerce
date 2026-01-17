import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

type VoiceSearchProps = {
  onTranscript: (text: string) => void;
};

const VoiceSearch = ({ onTranscript }: VoiceSearchProps) => {
  const recognitionRef = useRef<any>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (e: any) => {
      const transcript = e.results[0][0].transcript;
      onTranscript(transcript);
      showToast("Voice captured 🎤", "success");
    };

    recognition.onerror = () => {
      showToast("Voice recognition failed", "error");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [onTranscript, showToast]);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      showToast("Listening… speak now", "info");
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={startListening}
      className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-semibold"
    >
      🎤 Voice Search
    </motion.button>
  );
};

export default VoiceSearch;
