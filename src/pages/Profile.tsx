import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, Mail, Building, GraduationCap, IdCard, Zap } from "lucide-react";

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const name = user?.email?.split("@")[0] || "Student";

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  const details = [
    { label: "Email", value: user?.email || "—", icon: Mail },
    { label: "Department", value: "Computer Science", icon: Building },
    { label: "Year", value: "3rd Year", icon: GraduationCap },
    { label: "College ID", value: "CSE2023042", icon: IdCard },
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-2xl mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-background">{name[0].toUpperCase()}</span>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground capitalize">{name}</h1>
            <p className="text-sm text-muted-foreground">Intermediate • 320 XP</p>
            <div className="flex items-center gap-1 mt-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary">Connected to ERP</span>
            </div>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "64%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
          />
        </div>
        <p className="text-xs text-muted-foreground">320 / 500 XP to Pro level</p>

        <div className="space-y-3">
          {details.map(d => (
            <div key={d.label} className="flex items-center gap-3 p-3 rounded-md bg-muted/30">
              <d.icon className="w-4 h-4 text-primary shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{d.label}</p>
                <p className="text-sm text-foreground">{d.value}</p>
              </div>
            </div>
          ))}
        </div>

        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" /> Logout
        </Button>
      </motion.div>
    </div>
  );
}
