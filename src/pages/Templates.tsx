import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { templates } from "@/lib/templates";

const Templates = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 bg-primary text-primary-foreground py-2 px-3 shadow-md">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")} className="text-primary-foreground hover:bg-primary-foreground/10 -ml-2 h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base font-bold">Choose a Template</h1>
        </div>
      </header>

      <main className="px-2 py-3">
        <div className="grid grid-cols-2 gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(`/editor/${t.id}`)}
              className="group relative rounded-md overflow-hidden border-2 border-border hover:border-primary transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            >
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                decoding="async"
                width={300}
                height={400}
                className="w-full aspect-[3/4] object-cover"
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
