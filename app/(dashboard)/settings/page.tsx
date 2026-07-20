"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { 
  User, 
  Lock, 
  Bell, 
  Save, 
  CheckCircle2, 
  ShieldAlert, 
  Palette 
} from "lucide-react";

export default function SettingsPage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.displayName || "Rahul Kumar");
  const [email, setEmail] = useState(user?.email || "rahul@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Preferences
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [instantPayouts, setInstantPayouts] = useState(true);

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setTimeout(() => {
      setMessage({ type: "success", text: "Profile details updated successfully!" });
      setIsLoading(false);
    }, 800);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match!" });
      return;
    }
    setIsLoading(true);
    setMessage(null);
    setTimeout(() => {
      setMessage({ type: "success", text: "Password changed successfully!" });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsLoading(false);
    }, 1000);
  };

  const handleSavePreferences = () => {
    setIsLoading(true);
    setMessage(null);
    setTimeout(() => {
      setMessage({ type: "success", text: "Preferences saved successfully!" });
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      <div>
        <h2 className="text-xl font-bold text-[var(--color-pk-text-primary)]">Account Settings</h2>
        <p className="text-xs text-[var(--color-pk-text-secondary)] mt-0.5">
          Manage your profile options, password settings, and email notifications.
        </p>
      </div>

      {message && (
        <div className={`flex items-start gap-2.5 p-3 rounded-lg border text-xs font-semibold ${
          message.type === "success" 
            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400" 
            : "bg-[var(--color-danger)]/10 border-[var(--color-danger)]/20 text-[var(--color-danger)]"
        }`}>
          {message.type === "success" ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Settings Navigation Sidebar */}
        <div className="space-y-1">
          <div className="p-3 rounded-lg bg-[var(--color-pk-surface-elevated)]/30 border border-[var(--color-pk-border)]/50">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-pk-text-tertiary)] mb-3 px-2">
              Settings Sections
            </h3>
            <nav className="space-y-1 flex flex-col">
              <a href="#profile" className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-[var(--color-pk-text-primary)] bg-[var(--color-pk-surface-elevated)]/60 rounded-md">
                <User className="h-4 w-4 text-[var(--color-pk-accent)]" />
                Profile Info
              </a>
              <a href="#password" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--color-pk-text-secondary)] hover:bg-[var(--color-pk-surface-elevated)]/40 hover:text-[var(--color-pk-text-primary)] rounded-md transition-colors">
                <Lock className="h-4 w-4 text-[var(--color-pk-text-tertiary)]" />
                Security & Password
              </a>
              <a href="#notifications" className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-[var(--color-pk-text-secondary)] hover:bg-[var(--color-pk-surface-elevated)]/40 hover:text-[var(--color-pk-text-primary)] rounded-md transition-colors">
                <Bell className="h-4 w-4 text-[var(--color-pk-text-tertiary)]" />
                Preferences
              </a>
            </nav>
          </div>
        </div>

        {/* Settings Forms container */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Section */}
          <section id="profile">
            <Card className="border border-[var(--color-pk-border)] bg-[var(--color-pk-surface)] shadow-sm">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                  <User className="h-4 w-4 text-[var(--color-pk-accent)]" />
                  Profile Information
                </CardTitle>
                <CardDescription className="text-[11px]">
                  Update your display name and email address.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSaveProfile}>
                <CardContent className="p-5 pt-0 space-y-4">
                  <Input 
                    label="Display Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input 
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </CardContent>
                <CardFooter className="p-5 pt-0 border-t border-[var(--color-pk-border)]/50 mt-4 flex justify-end">
                  <Button type="submit" disabled={isLoading} className="h-8 text-xs flex items-center gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    Save Details
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </section>

          {/* Password Section */}
          <section id="password">
            <Card className="border border-[var(--color-pk-border)] bg-[var(--color-pk-surface)] shadow-sm">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                  <Lock className="h-4 w-4 text-[var(--color-pk-accent)]" />
                  Security & Password
                </CardTitle>
                <CardDescription className="text-[11px]">
                  Change your account login credentials.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleUpdatePassword}>
                <CardContent className="p-5 pt-0 space-y-4">
                  <Input 
                    label="Current Password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <Input 
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <Input 
                    label="Confirm New Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </CardContent>
                <CardFooter className="p-5 pt-0 border-t border-[var(--color-pk-border)]/50 mt-4 flex justify-end">
                  <Button type="submit" disabled={isLoading} className="h-8 text-xs flex items-center gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    Change Password
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </section>

          {/* Preferences Section */}
          <section id="notifications">
            <Card className="border border-[var(--color-pk-border)] bg-[var(--color-pk-surface)] shadow-sm">
              <CardHeader className="p-5 pb-3">
                <CardTitle className="text-sm font-bold flex items-center gap-1.5">
                  <Bell className="h-4 w-4 text-[var(--color-pk-accent)]" />
                  Alerts & Preferences
                </CardTitle>
                <CardDescription className="text-[11px]">
                  Configure your email updates and notification toggles.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-4">
                
                <div className="flex items-center justify-between py-2 border-b border-[var(--color-pk-border)]/30">
                  <div>
                    <label className="text-xs font-bold text-[var(--color-pk-text-primary)]">Email alerts on Credits</label>
                    <p className="text-[10px] text-[var(--color-pk-text-tertiary)]">Get emails whenever you successfully complete offers.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={emailAlerts} 
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-[var(--color-pk-border)] accent-[var(--color-pk-accent)]"
                  />
                </div>

                <div className="flex items-center justify-between py-2 border-b border-[var(--color-pk-border)]/30">
                  <div>
                    <label className="text-xs font-bold text-[var(--color-pk-text-primary)]">Voucher Delivery Emails</label>
                    <p className="text-[10px] text-[var(--color-pk-text-tertiary)]">Get notified immediately once your gift cards are approved.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={instantPayouts} 
                    onChange={(e) => setInstantPayouts(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-[var(--color-pk-border)] accent-[var(--color-pk-accent)]"
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <label className="text-xs font-bold text-[var(--color-pk-text-primary)]">Marketing & Newsletters</label>
                    <p className="text-[10px] text-[var(--color-pk-text-tertiary)]">Receive weekly high-paying task listings and promotional codes.</p>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={marketingEmails} 
                    onChange={(e) => setMarketingEmails(e.target.checked)}
                    className="h-4.5 w-4.5 rounded border-[var(--color-pk-border)] accent-[var(--color-pk-accent)]"
                  />
                </div>

              </CardContent>
              <CardFooter className="p-5 pt-0 border-t border-[var(--color-pk-border)]/50 mt-4 flex justify-end">
                <Button onClick={handleSavePreferences} disabled={isLoading} className="h-8 text-xs flex items-center gap-1.5">
                  <Save className="h-3.5 w-3.5" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </section>

        </div>

      </div>

    </div>
  );
}
