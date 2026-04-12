import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Image as ImageIcon, Download, Share2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { templates } from "@/lib/templates";

const features = [
  { icon: ImageIcon, title: "Choose Template", desc: "Pick from stunning poster designs" },
  { icon: Sparkles, title: "Customize", desc: "Add your photo and name easily" },
  { icon: Download, title: "Download", desc: "Export as high-quality PNG" },
  { icon: Share2, title: "Share", desc: "Share on social media instantly" },
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    templates.forEach((t) => {
      const img = new window.Image();
      img.src = t.image;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden min-h-[50vh] md:min-h-[60vh]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 to-accent/90" />
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[50vh] md:min-h-[60vh] px-4 text-center">
          <h1 className="text-2xl md:text-4xl lg:text-6xl font-extrabold text-primary-foreground mb-2 md:mb-3 animate-fade-in">
            Poster Generator
          </h1>
          <p className="text-sm md:text-base lg:text-xl text-primary-foreground/90 mb-4 md:mb-6 max-w-lg md:max-w-xl animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Create stunning posters in seconds. Upload your photo, add your name, and share with the world.
          </p>
          <Button
            size="lg"
            className="text-sm md:text-base px-5 py-3 md:px-6 md:py-4 bg-card text-primary font-bold hover:bg-card/90 shadow-lg animate-fade-in"
            style={{ animationDelay: "0.2s" }}
            onClick={() => navigate("/templates")}
          >
            <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5" />
            Create Poster
          </Button>
        </div>
      </section>

      <section className="py-6 md:py-10 px-3 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-center text-foreground mb-6 md:mb-8">
            How It Works
          </h2>
          <div className="grid grid-cols-2 gap-3 md:gap-4 lg:gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center p-3 md:p-4 lg:p-6 rounded-lg bg-card shadow-sm border border-border animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2 md:mb-3">
                  <f.icon className="h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1 text-sm md:text-base">{f.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-4 md:py-6 text-center text-muted-foreground text-xs md:text-sm border-t border-border">
        © 2026 Poster Generator. Made with ❤️
      </footer>
    </div>
  );
};

export default Index;
