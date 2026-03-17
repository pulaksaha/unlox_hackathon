import { motion } from "framer-motion";
import { Megaphone, Code2, Trophy, GraduationCap, Calendar } from "lucide-react";

const notices = [
  { title: "Semester Exam Schedule Released", deadline: "Mar 25", icon: Calendar, accent: "neon-cyan" },
  { title: "HackFest 2026 — Registrations Open", deadline: "Mar 30", icon: Code2, accent: "neon-purple" },
  { title: "NSS Community Service Event", deadline: "Mar 22", icon: Trophy, accent: "neon-blue" },
  { title: "National Scholarship Portal Update", deadline: "Apr 01", icon: GraduationCap, accent: "neon-cyan" },
  { title: "AI Workshop by Google DSC", deadline: "Mar 28", icon: Megaphone, accent: "neon-purple" },
];

export default function NoticesPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <h2 className="font-display font-semibold text-foreground mb-4">Notices & Events</h2>
      <div className="grid gap-3">
        {notices.map((n, i) => (
          <div key={i} className={`glass-card glass-card-hover p-3 flex items-start gap-3`}>
            <div className={`w-8 h-8 rounded-md bg-${n.accent}/10 flex items-center justify-center shrink-0`}>
              <n.icon className={`w-4 h-4 text-${n.accent}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm text-foreground font-medium">{n.title}</p>
              <p className="text-xs text-muted-foreground">Deadline: {n.deadline}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
