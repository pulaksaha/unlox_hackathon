import { motion } from "framer-motion";
import { Megaphone, Code2, Trophy, GraduationCap, Calendar, Bell } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

// Map string icon names from DB to actual lucide-react components
const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Calendar': return Calendar;
    case 'Code2': return Code2;
    case 'Trophy': return Trophy;
    case 'GraduationCap': return GraduationCap;
    case 'Megaphone': return Megaphone;
    default: return Bell;
  }
};

export default function NoticesPanel() {
  const { events, loading } = useEvents();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-5"
    >
      <h2 className="font-display font-semibold text-foreground mb-4">Notices & Events</h2>
      
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="py-8 text-center text-muted-foreground flex flex-col items-center justify-center">
          <Bell className="w-8 h-8 mb-2 opacity-20" />
          <p className="text-sm">No notices yet</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {events.map((n) => {
            const IconComponent = getIcon(n.icon);
            return (
              <div key={n.id} className={`glass-card glass-card-hover p-3 flex items-start gap-3`}>
                <div className={`w-8 h-8 rounded-md bg-${n.accent}/10 flex items-center justify-center shrink-0`}>
                  <IconComponent className={`w-4 h-4 text-${n.accent}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-foreground font-medium">{n.title}</p>
                  <p className="text-xs text-muted-foreground">Deadline: {n.deadline}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

