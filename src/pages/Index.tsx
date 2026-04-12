import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/land.png";

const Index = () => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = heroBg;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden min-h-screen">
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ 
            backgroundImage: imageLoaded ? `url(${heroBg})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "#1a1a2e" 
          }}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-b from-red-900 to-red-950" />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-16 px-4">
          <Button
            size="lg"
            className="text-lg px-12 py-8 bg-white text-black font-bold hover:bg-white/90 shadow-lg touch-manipulation active:scale-95 transition-transform"
            onClick={() => navigate("/templates")}
          >
            Continue
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;