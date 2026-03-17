import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Mic, MicOff, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

type Msg = { role: "user" | "assistant"; content: string };

export default function AIChatModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hey! I'm **CampusBot** 🤖 Ask me about your timetable, assignments, or anything else!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    const userMsg: Msg = { role: "user", content: text };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("chat", {
        body: { messages: newMsgs.map(m => ({ role: m.role, content: m.content })) },
      });
      if (error) throw error;

      // Handle non-streaming response
      const content = data?.choices?.[0]?.message?.content || data?.content || "Sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: "assistant", content }]);
    } catch (e: any) {
      console.error("Chat error:", e);
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInput(prev => prev + text);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
          >
            <div className="glass-card neon-glow-cyan flex flex-col h-[70vh] max-h-[600px]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
                    <Bot className="w-4 h-4 text-background" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-sm text-foreground">CampusBot AI</h3>
                    <p className="text-xs text-primary">Online</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-2 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    {m.role === "assistant" && (
                      <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="w-3 h-3 text-neon-purple" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted/50 text-foreground"
                    }`}>
                      <ReactMarkdown className="prose prose-sm prose-invert max-w-none [&>p]:m-0">{m.content}</ReactMarkdown>
                    </div>
                    {m.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-1">
                        <User className="w-3 h-3 text-accent" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-neon-purple/20 flex items-center justify-center shrink-0">
                      <Bot className="w-3 h-3 text-neon-purple" />
                    </div>
                    <div className="bg-muted/50 rounded-xl px-4 py-2">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border/50">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleVoice}
                    className={`p-2 rounded-lg transition-colors ${isListening ? "bg-destructive/20 text-destructive" : "bg-muted/30 text-muted-foreground hover:text-foreground"}`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Ask CampusBot anything..."
                    className="bg-muted/30 border-border/50 text-sm"
                  />
                  <Button variant="neon" size="icon" onClick={sendMessage} disabled={isLoading}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
