import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Bot } from "lucide-react";

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (mode: "login" | "signup") => {
    if (!email || !password) { toast.error("Please fill in all fields"); return; }
    setIsLoading(true);
    try {
      if (mode === "login") {
        await signIn(email, password);
        toast.success("Welcome back!");
      } else {
        await signUp(email, password);
        toast.success("Account created! Check your email to confirm.");
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="glass-card p-8 w-full max-w-md space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <Bot className="w-6 h-6 text-background" />
            </div>
            <h1 className="font-display text-2xl font-bold gradient-text">CampusBot Pro</h1>
          </div>
          <p className="text-muted-foreground text-sm">Your AI-powered student command center</p>
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-muted/50 border-border/50 focus:border-primary"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-muted/50 border-border/50 focus:border-primary"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="neon" className="flex-1" onClick={() => handleAuth("login")} disabled={isLoading}>
            Login
          </Button>
          <Button variant="glass" className="flex-1" onClick={() => handleAuth("signup")} disabled={isLoading}>
            Sign Up
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
