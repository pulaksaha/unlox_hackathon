import { motion } from "framer-motion";
import { Megaphone, Code2, Trophy, GraduationCap, Calendar, Bell } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/skeleton";

// Map categories to appropriate icons and accents
const getIconProps = (category: string | null) => {
  const cat = category?.toLowerCase() || '';
  if (cat.includes('exam') || cat.includes('schedule')) return { icon: Calendar, accent: 'neon-cyan' };
  if (cat.includes('hackathon') || cat.includes('tech')) return { icon: Code2, accent: 'neon-purple' };
  if (cat.includes('scholarship') || cat.includes('academic')) return { icon: GraduationCap, accent: 'neon-blue' };
  if (cat.includes('event')) return { icon: Trophy, accent: 'neon-purple' };
  return { icon: Megaphone, accent: 'neon-cyan' };
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
            const { icon: IconComponent, accent } = getIconProps(n.category);
            return (
              <div key={n.id} className={`glass-card glass-card-hover p-3 flex items-start gap-3`}>
                <div className={`w-8 h-8 rounded-md bg-${accent}/10 flex items-center justify-center shrink-0`}>
                  <IconComponent className={`w-4 h-4 text-${accent}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-foreground font-medium">{n.message}</p>
                  {n.deadline && <p className="text-xs text-muted-foreground">Deadline: {n.deadline}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}

