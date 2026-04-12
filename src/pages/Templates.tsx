import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-primary text-primary-foreground py-3 px-4 shadow-md">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-primary-foreground hover:bg-primary-foreground/10 -ml-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-lg font-bold">Choose a Template</h1>
        </div>
      </header>

      <main className="px-3 py-6">
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(`/editor/${t.id}`)}
              className="group relative rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-all shadow-sm hover:shadow-lg active:scale-95"
            >
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                width={600}
                height={800}
                className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 to-transparent p-2 md:p-3">
                <span className="text-xs md:text-sm font-semibold text-primary-foreground">{t.name}</span>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Templates;
