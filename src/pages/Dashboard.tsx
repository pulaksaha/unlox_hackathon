import { useState } from "react";
import ProfileCard from "@/components/dashboard/ProfileCard";
import TasksPanel from "@/components/dashboard/TasksPanel";
import NoticesPanel from "@/components/dashboard/NoticesPanel";
import TimetablePanel from "@/components/dashboard/TimetablePanel";
import DateSection from "@/components/dashboard/DateSection";
import QuickLinks from "@/components/dashboard/QuickLinks";
import AIFloatingButton from "@/components/dashboard/AIFloatingButton";
import AIChatModal from "@/components/dashboard/AIChatModal";
import { motion } from "framer-motion";

export default function Dashboard() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <motion.div
        animate={{ scale: chatOpen ? 0.95 : 1, filter: chatOpen ? "blur(4px)" : "blur(0px)" }}
        transition={{ duration: 0.3 }}
        className="min-h-screen p-4 md:p-6 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-4 md:gap-5 mb-4">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <ProfileCard />
            <TasksPanel />
          </div>

          {/* Center Column */}
          <div className="flex flex-col gap-4">
            <NoticesPanel />
            <TimetablePanel />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            <DateSection />
            {/* Gamification summary */}
            <div className="glass-card p-5 space-y-3">
              <h2 className="font-display font-semibold text-foreground text-sm">XP Activity</h2>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-muted-foreground">
                  <span>Checked reminders</span><span className="text-primary">+10 XP</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Used CampusBot</span><span className="text-neon-purple">+20 XP</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Event attendance</span><span className="text-accent">+50 XP</span>
                </div>
              </div>
            </div>
            {/* AI Suggestions */}
            <div className="glass-card p-5 space-y-3">
              <h2 className="font-display font-semibold text-foreground text-sm">AI Suggestions</h2>
              <div className="space-y-2">
                {["Study DBMS for 30 min", "Revise ML Chapter 4", "Complete OS assignment"].map((s, i) => (
                  <div key={i} className="text-xs text-muted-foreground bg-muted/30 rounded-md px-3 py-2">
                    💡 {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <QuickLinks />
      </motion.div>

      <AIFloatingButton onClick={() => setChatOpen(true)} />
      <AIChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
}
