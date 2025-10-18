import toast from "react-hot-toast";
import { RiShareBoxLine } from "react-icons/ri";

const ShareButton = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Bu sahifani ko‘r!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share canceled or failed");
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("URL nusxalandi! 📋");
    }
  };

  return (
    <div
      onClick={handleShare}
      className="mt-15 flex items-center font-bold justify-center gap-1 cursor-pointer hover:opacity-80 transition"
    >
      <RiShareBoxLine />
      <span className="text-sm text-[#000000] text-[12px] opacity-70">
        Ulashish
      </span>
    </div>
  );
};

export default ShareButton;
