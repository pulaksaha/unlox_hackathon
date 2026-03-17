import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth";
import { Zap } from "lucide-react";

const LEVELS = ["Rookie", "Intermediate", "Pro", "Elite"];

export default function ProfileCard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const xp = 320;
  const maxXp = 500;
  const level = 1;
  const pct = (xp / maxXp) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-card glass-card-hover p-5 cursor-pointer"
      onClick={() => navigate("/profile")}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="16" fill="none" stroke="hsl(var(--border))" strokeWidth="2" />
            <circle
              cx="18" cy="18" r="16" fill="none"
              stroke="url(#xpGrad)" strokeWidth="2.5"
              strokeDasharray={`${pct} ${100 - pct}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="xpGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--neon-cyan))" />
                <stop offset="100%" stopColor="hsl(var(--neon-purple))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-display font-bold text-foreground">{level + 1}</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground truncate">
            {user?.email?.split("@")[0] || "Student"}
          </h3>
          <p className="text-xs text-muted-foreground">{LEVELS[level]} • {xp} XP</p>
        </div>
      </div>

      <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
        />
      </div>

      <div className="mt-3 flex items-center gap-1.5">
        <Zap className="w-3 h-3 text-primary" />
        <span className="text-xs text-primary font-medium">Connected to ERP</span>
      </div>
    </motion.div>
  );
}
