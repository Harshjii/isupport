import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-primary text-primary-foreground py-2 px-3 shadow-md md:py-3">
        <div className="flex items-center gap-2 md:gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-primary-foreground hover:bg-primary-foreground/10 -ml-2 h-10 w-10 md:h-9 md:w-9">
            <ArrowLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <h1 className="text-base md:text-lg font-bold">Choose a Template</h1>
        </div>
      </header>

      <main className="px-2 py-3 md:px-3 md:py-6">
        <div className="grid grid-cols-2 gap-2 md:gap-4">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(`/editor/${t.id}`)}
              className="group relative rounded-md overflow-hidden border-2 border-border hover:border-primary transition-all shadow-sm hover:shadow-lg active:scale-95"
            >
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                width={600}
                height={800}
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent p-2">
                <span className="text-xs font-semibold text-primary-foreground">{t.name}</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Templates;
