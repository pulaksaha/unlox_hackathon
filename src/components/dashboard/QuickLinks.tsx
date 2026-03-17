import { motion } from "framer-motion";
import { BookOpen, FileText, Table2, MessageCircle, Calendar as CalIcon, Send } from "lucide-react";

const links = [
  { label: "Library", icon: BookOpen },
  { label: "PYQs", icon: FileText },
  { label: "Sheets", icon: Table2 },
];

const integrations = [
  { label: "WhatsApp", icon: MessageCircle },
  { label: "G Cal", icon: CalIcon },
  { label: "Telegram", icon: Send },
];

export default function QuickLinks() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card p-4 flex items-center justify-between gap-4 flex-wrap"
    >
      <div className="flex items-center gap-2">
        {links.map(l => (
          <button key={l.label} className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors text-sm text-foreground">
            <l.icon className="w-4 h-4 text-primary" />
            {l.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        {integrations.map(l => (
          <div key={l.label} className="flex items-center gap-1 text-xs text-muted-foreground">
            <l.icon className="w-3.5 h-3.5" />
            {l.label}
          </div>
        ))}
      </div>
    </motion.div>
  );
}
