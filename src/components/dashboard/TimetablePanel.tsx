import { motion } from "framer-motion";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const timeSlots = ["9:00", "10:00", "11:00", "12:00", "2:00", "3:00"];

const schedule: Record<string, Record<string, string>> = {
  Mon: { "9:00": "DBMS", "10:00": "ML", "11:00": "OS", "2:00": "English" },
  Tue: { "9:00": "Math", "10:00": "DBMS Lab", "11:00": "DBMS Lab", "3:00": "Sports" },
  Wed: { "9:00": "ML", "10:00": "OS", "11:00": "Math", "2:00": "ML Lab" },
  Thu: { "9:00": "English", "10:00": "Math", "11:00": "DBMS", "2:00": "OS Lab" },
  Fri: { "9:00": "OS", "10:00": "ML", "2:00": "Seminar", "3:00": "Library" },
};

const subjectColors: Record<string, string> = {
  DBMS: "bg-neon-cyan/15 text-neon-cyan",
  ML: "bg-neon-purple/15 text-neon-purple",
  OS: "bg-neon-blue/15 text-accent",
  Math: "bg-green-500/15 text-green-400",
  English: "bg-amber-500/15 text-amber-400",
  "DBMS Lab": "bg-neon-cyan/10 text-neon-cyan",
  "ML Lab": "bg-neon-purple/10 text-neon-purple",
  "OS Lab": "bg-neon-blue/10 text-accent",
  Sports: "bg-rose-500/15 text-rose-400",
  Seminar: "bg-indigo-500/15 text-indigo-400",
  Library: "bg-teal-500/15 text-teal-400",
};

export default function TimetablePanel() {
  const today = new Date().getDay();
  const todayIdx = today >= 1 && today <= 5 ? today - 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass-card p-5"
    >
      <h2 className="font-display font-semibold text-foreground mb-4">Timetable</h2>
      <div className="overflow-x-auto scrollbar-thin">
        <div className="min-w-[500px]">
          <div className="grid grid-cols-[60px_repeat(5,1fr)] gap-1">
            <div />
            {days.map((d, i) => (
              <div key={d} className={`text-center text-xs font-display font-medium py-1.5 rounded-md ${i === todayIdx ? "bg-primary/20 text-primary" : "text-muted-foreground"}`}>
                {d}
              </div>
            ))}
            {timeSlots.map(time => (
              <>
                <div key={time} className="text-xs text-muted-foreground py-2 text-right pr-2">{time}</div>
                {days.map(day => {
                  const subj = schedule[day]?.[time];
                  return (
                    <div key={`${day}-${time}`} className="py-1 px-1">
                      {subj ? (
                        <div className={`text-xs rounded-md px-2 py-1.5 text-center font-medium ${subjectColors[subj] || "bg-muted/30 text-muted-foreground"}`}>
                          {subj}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
