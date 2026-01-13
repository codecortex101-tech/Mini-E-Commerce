import { motion } from "framer-motion";
import { useToast } from "../context/ToastContext";

type SocialLoginProps = {
  onGoogleLogin?: () => void;
  onFacebookLogin?: () => void;
  onGitHubLogin?: () => void;
};

const SocialLogin = ({
  onGoogleLogin,
  onFacebookLogin,
  onGitHubLogin,
}: SocialLoginProps) => {
  const { showToast } = useToast();

  const handleSocialLogin = (provider: string, callback?: () => void) => {
    showToast(`${provider} login clicked (Demo mode)`, "info");
    callback?.();
  };

  const providers = [
    {
      name: "Google",
      icon: "🔴",
      color: "bg-red-500 hover:bg-red-600",
      onClick: () => handleSocialLogin("Google", onGoogleLogin),
    },
    {
      name: "Facebook",
      icon: "📘",
      color: "bg-blue-600 hover:bg-blue-700",
      onClick: () => handleSocialLogin("Facebook", onFacebookLogin),
    },
    {
      name: "GitHub",
      icon: "⚫",
      color: "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-800",
      onClick: () => handleSocialLogin("GitHub", onGitHubLogin),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {providers.map((provider) => (
          <motion.button
            key={provider.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={provider.onClick}
            className={`${provider.color} text-white py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-xl flex flex-col items-center gap-1`}
            aria-label={`Login with ${provider.name}`}
          >
            <span className="text-2xl">{provider.icon}</span>
            <span className="text-xs">{provider.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default SocialLogin;
