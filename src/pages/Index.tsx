import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/Landing.png";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-16 px-4">
          <Button
            size="lg"
            className="text-lg px-12 py-8 bg-white text-black font-bold hover:bg-white/90 shadow-lg"
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