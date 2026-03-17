import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowLeft, LogOut, Mail, Building, GraduationCap, IdCard, Zap, Save } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    department: "",
    year: "",
    college_id: "",
  });

  const name = profile?.full_name || user?.email?.split("@")[0] || "Student";
  const xp = profile?.xp ?? 0;
  const level = profile?.level ?? "Beginner";
  const xpTarget = 500;
  const xpPercent = Math.min((xp / xpTarget) * 100, 100);

  const startEditing = () => {
    setForm({
      full_name: profile?.full_name || "",
      department: profile?.department || "",
      year: profile?.year || "",
      college_id: profile?.college_id || "",
    });
    setEditing(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const error = await updateProfile(form);
    setSaving(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Profile updated!");
      setEditing(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 max-w-2xl mx-auto">
      <button onClick={() => navigate("/")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 space-y-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
            <span className="font-display text-2xl font-bold text-background">{name[0].toUpperCase()}</span>
          </div>
          <div>
            <h1 className="font-display text-xl font-bold text-foreground capitalize">{name}</h1>
            <p className="text-sm text-muted-foreground">{level} • {xp} XP</p>
            <div className="flex items-center gap-1 mt-1">
              <Zap className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary">Connected to Supabase</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${xpPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-purple"
          />
        </div>
        <p className="text-xs text-muted-foreground">{xp} / {xpTarget} XP to Pro level</p>

        {/* Profile Fields */}
        <div className="space-y-3">
          {/* Email — always read-only */}
          <div className="flex items-center gap-3 p-3 rounded-md bg-muted/30">
            <Mail className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm text-foreground">{user?.email || "—"}</p>
            </div>
          </div>

          {editing ? (
            <>
              {[
                { label: "Full Name", field: "full_name" as const, icon: IdCard },
                { label: "Department", field: "department" as const, icon: Building },
                { label: "Year", field: "year" as const, icon: GraduationCap },
                { label: "College ID", field: "college_id" as const, icon: IdCard },
              ].map(({ label, field, icon: Icon }) => (
                <div key={field} className="flex items-center gap-3 p-3 rounded-md bg-muted/30">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-1">{label}</p>
                    <Input
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      className="h-7 text-sm bg-transparent border-border/50"
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {[
                { label: "Full Name", value: profile?.full_name, icon: IdCard },
                { label: "Department", value: profile?.department, icon: Building },
                { label: "Year", value: profile?.year, icon: GraduationCap },
                { label: "College ID", value: profile?.college_id, icon: IdCard },
              ].map(d => (
                <div key={d.label} className="flex items-center gap-3 p-3 rounded-md bg-muted/30">
                  <d.icon className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{d.label}</p>
                    <p className="text-sm text-foreground">{d.value || "—"}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {editing ? (
            <>
              <Button variant="neon" className="flex-1" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" /> {saving ? "Saving..." : "Save"}
              </Button>
              <Button variant="glass" className="flex-1" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <Button variant="glass" className="flex-1" onClick={startEditing}>
              Edit Profile
            </Button>
          )}
          <Button variant="destructive" className="flex-1" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
