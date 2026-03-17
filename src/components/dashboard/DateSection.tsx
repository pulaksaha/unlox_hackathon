import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function DateSection() {
  const [open, setOpen] = useState(false);
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells = Array.from({ length: firstDay + daysInMonth }, (_, i) =>
    i < firstDay ? null : i - firstDay + 1
  );

  const isToday = (d: number) => d === now.getDate() && viewMonth === now.getMonth() && viewYear === now.getFullYear();

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-5">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between">
        <div>
          <p className="font-display text-2xl font-bold text-foreground">{now.getDate()}</p>
          <p className="text-sm text-muted-foreground">{MONTHS[now.getMonth()]} {now.getFullYear()}</p>
        </div>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <button onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }}
                  className="text-xs text-muted-foreground hover:text-foreground">←</button>
                <span className="text-xs font-display font-medium text-foreground">{MONTHS[viewMonth]} {viewYear}</span>
                <button onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }}
                  className="text-xs text-muted-foreground hover:text-foreground">→</button>
              </div>
              <div className="grid grid-cols-7 gap-0.5 text-center">
                {DAYS.map(d => <div key={d} className="text-[10px] text-muted-foreground py-1">{d}</div>)}
                {cells.map((d, i) => (
                  <div key={i} className={`text-xs py-1 rounded ${d && isToday(d) ? "bg-primary text-primary-foreground font-bold" : d ? "text-foreground hover:bg-muted/50" : ""}`}>
                    {d || ""}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
