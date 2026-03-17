import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export default function AIFloatingButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center shadow-lg cursor-pointer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{ boxShadow: ["0 0 15px hsla(187,82%,53%,0.4)", "0 0 30px hsla(270,91%,65%,0.4)", "0 0 15px hsla(187,82%,53%,0.4)"] }}
      transition={{ boxShadow: { duration: 2, repeat: Infinity } }}
    >
      <Bot className="w-6 h-6 text-background" />
    </motion.button>
  );
}
