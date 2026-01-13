import { motion } from "framer-motion";

type SocialShareButtonsProps = {
  url: string;
  title: string;
  description?: string;
  image?: string;
};

const SocialShareButtons = ({ url, title, description, image }: SocialShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || "");

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&media=${image}&description=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`,
  };

  const handleShare = async (platform: keyof typeof shareLinks) => {
    if (navigator.share && (platform === "facebook" || platform === "twitter")) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        });
        return;
      } catch (err) {
        // Fall back to URL sharing
      }
    }

    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  const platforms = [
    { key: "facebook" as const, icon: "📘", label: "Facebook", color: "bg-blue-600 hover:bg-blue-700" },
    { key: "twitter" as const, icon: "🐦", label: "Twitter", color: "bg-sky-500 hover:bg-sky-600" },
    { key: "pinterest" as const, icon: "📌", label: "Pinterest", color: "bg-red-600 hover:bg-red-700" },
    { key: "whatsapp" as const, icon: "💬", label: "WhatsApp", color: "bg-green-500 hover:bg-green-600" },
    { key: "linkedin" as const, icon: "💼", label: "LinkedIn", color: "bg-blue-700 hover:bg-blue-800" },
    { key: "email" as const, icon: "📧", label: "Email", color: "bg-gray-600 hover:bg-gray-700" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {platforms.map((platform) => (
        <motion.button
          key={platform.key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleShare(platform.key)}
          className={`${platform.color} text-white px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-xl`}
          aria-label={`Share on ${platform.label}`}
        >
          <span>{platform.icon}</span>
          <span>{platform.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default SocialShareButtons;
