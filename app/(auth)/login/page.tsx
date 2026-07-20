"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { FloatingPaths } from "@/components/ui/background-paths";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--color-surface-page)] p-4">
      
      {/* Background Trails */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.65] dark:opacity-[0.65] z-0 overflow-hidden" aria-hidden="true">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Navigation Back */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-[var(--font-size-xs)] font-medium text-[var(--color-text-inverse)] hover:text-[var(--color-text-primary)] mb-6 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to home</span>
        </Link>

        {/* Logo/Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)] shadow-md shadow-[var(--color-accent)]/20 mb-3">
            <span className="text-xs font-black text-white">UG</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
            Welcome back
          </h1>
          <p className="text-[var(--font-size-sm)] text-[var(--color-text-inverse)] mt-1.5">
            Access your Upgroo earner dashboard
          </p>
        </div>

        {/* Card Container */}
        <Card className="border border-[var(--color-border)] bg-[var(--color-surface-card)]/80 backdrop-blur-[12px] shadow-[var(--shadow-3)] overflow-hidden">
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4 pt-6">
              {error && (
                <div className="flex items-start space-x-2 rounded-md bg-[var(--color-danger)]/10 p-3 text-sm text-[var(--color-danger)]">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                  <span className="leading-tight">{error}</span>
                </div>
              )}
              <div className="space-y-1">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)]"
                />
              </div>
              <div className="space-y-1">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-[var(--color-surface-page)]/50 focus:bg-[var(--color-surface-card)]"
                />
                <div className="text-right pt-1">
                  <Link href="/reset-password" className="text-xs font-medium text-[var(--color-text-accent)] hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pb-6 pt-2">
              <Button type="submit" className="w-full shadow-lg shadow-[var(--color-accent)]/15" isLoading={isLoading}>
                Sign in
              </Button>
              <div className="text-center text-sm text-[var(--color-text-inverse)]">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-semibold text-[var(--color-text-accent)] hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}
