import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between mb-6 pb-4 border-b border-border/40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden border border-neon-cyan/20">
          <img src="/astra_logo.png" alt="Astra Logo" className="w-full h-full object-cover" />
        </div>
        <div>
          <h1 className="font-display text-2xl font-bold gradient-text">Astra</h1>
          <p className="text-xs text-muted-foreground hidden sm:block">Campus AI Platform</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button variant="glass" size="sm" onClick={() => navigate("/profile")}>
          Profile
        </Button>
      </div>
    </header>
  );
}
