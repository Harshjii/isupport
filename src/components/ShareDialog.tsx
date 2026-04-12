import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageCircle, Facebook, Twitter, Instagram } from "lucide-react";

interface ShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posterDataUrl: string | null;
}

const shareOptions = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "bg-green-500 hover:bg-green-600",
    getUrl: () => `https://wa.me/?text=${encodeURIComponent("Check out my poster! Created with Poster Generator")}`,
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-600 hover:bg-blue-700",
    getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "bg-sky-500 hover:bg-sky-600",
    getUrl: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent("Check out my poster! Created with Poster Generator")}&url=${encodeURIComponent(window.location.href)}`,
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-pink-500 hover:bg-pink-600",
    getUrl: () => "",
  },
];

const ShareDialog = ({ open, onOpenChange, posterDataUrl }: ShareDialogProps) => {
  const handleShare = (option: typeof shareOptions[0]) => {
    if (option.name === "Instagram") {
      if (posterDataUrl) {
        const link = document.createElement("a");
        link.download = "poster-for-instagram.png";
        link.href = posterDataUrl;
        link.click();
      }
      alert("Image downloaded! Open Instagram and share from your gallery.");
      return;
    }
    window.open(option.getUrl(), "_blank", "width=600,height=400");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm mx-4 max-w-[calc(100%-1rem)]">
        <DialogHeader>
          <DialogTitle className="text-foreground text-base md:text-lg">Share Your Poster</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2 md:gap-3 pt-2">
          {shareOptions.map((opt) => (
            <Button
              key={opt.name}
              className={`${opt.color} text-primary-foreground py-4 md:py-6 text-sm`}
              onClick={() => handleShare(opt)}
            >
              <opt.icon className="mr-1 md:mr-2 h-4 w-4 md:h-5 md:w-5" />
              {opt.name}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
