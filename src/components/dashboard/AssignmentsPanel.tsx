import { motion } from "framer-motion";
import { Clock, AlertCircle, ExternalLink, BookOpen, Loader2 } from "lucide-react";
import { useAssignments } from "@/hooks/useAssignments";

function getUrgency(deadline: string | null) {
  if (!deadline) return "pending";
  const diff = new Date(deadline).getTime() - Date.now();
  const days = diff / (1000 * 60 * 60 * 24);
  if (days < 0) return "overdue";
  if (days <= 2) return "urgent";
  return "pending";
}

function formatDeadline(deadline: string | null) {
  if (!deadline) return "No deadline";
  return new Date(deadline).toLocaleDateString("en-IN", {
    month: "short", day: "numeric", hour: "2-digit", minute: "2-digit",
  });
}

const urgencyConfig = {
  pending: { icon: Clock, color: "text-neon-cyan" },
  urgent:  { icon: AlertCircle, color: "text-orange-400" },
  overdue: { icon: AlertCircle, color: "text-destructive" },
};

export default function AssignmentsPanel() {
  const { assignments, loading, error } = useAssignments();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5 flex-1 overflow-hidden flex flex-col"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-semibold text-foreground">Assignments</h2>
        <span className="text-xs text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
          {assignments.length} total
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center flex-1 py-6">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center flex-1 py-6 text-center gap-2">
          <AlertCircle className="w-6 h-6 text-destructive" />
          <p className="text-xs text-destructive font-mono">{error}</p>
        </div>
      ) : assignments.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-6 text-center">
          <BookOpen className="w-8 h-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No assignments yet</p>
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto scrollbar-thin flex-1">
          {assignments.map((a) => {
            const urgency = getUrgency(a.deadline);
            const Cfg = urgencyConfig[urgency];
            return (
              <div
                key={a.id}
                className="flex items-center gap-3 p-2.5 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors group"
              >
                <Cfg.icon className={`w-4 h-4 ${Cfg.color} shrink-0`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground truncate">{a.title}</p>
                  <div className="flex items-center gap-2">
                    {a.type && (
                      <span className="text-xs text-primary">{a.type}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      Due: {formatDeadline(a.deadline)}
                    </span>
                  </div>
                </div>
                {a.link && (
                  <a
                    href={a.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground hover:text-primary" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
