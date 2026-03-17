import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

const tasks = [
  { title: "DBMS Assignment", due: "Mar 20", status: "pending" },
  { title: "ML Lab Report", due: "Mar 22", status: "urgent" },
  { title: "English Presentation", due: "Mar 25", status: "done" },
  { title: "OS Mini Project", due: "Mar 28", status: "pending" },
  { title: "Math Tutorial Sheet", due: "Mar 19", status: "urgent" },
];

const statusConfig = {
  pending: { icon: Clock, color: "text-neon-cyan" },
  urgent: { icon: AlertCircle, color: "text-destructive" },
  done: { icon: CheckCircle2, color: "text-green-400" },
};

export default function TasksPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5 flex-1 overflow-hidden flex flex-col"
    >
      <h2 className="font-display font-semibold text-foreground mb-4">Tasks</h2>
      <div className="space-y-2 overflow-y-auto scrollbar-thin flex-1">
        {tasks.map((t, i) => {
          const S = statusConfig[t.status as keyof typeof statusConfig];
          return (
            <div key={i} className="flex items-center gap-3 p-2.5 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors">
              <S.icon className={`w-4 h-4 ${S.color} shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{t.title}</p>
                <p className="text-xs text-muted-foreground">Due: {t.due}</p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
