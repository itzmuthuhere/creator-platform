"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { Zap, Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("email", { email, redirect: false, callbackUrl: "/admin/dashboard" });
    setLoading(false);
    if (res?.error) {
      setError("Access denied. Only the admin email is allowed.");
    } else {
      setSent(true);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-950 via-violet-900 to-indigo-900 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-8 backdrop-blur">
          <div className="mb-8 text-center">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600">
              <Zap className="h-7 w-7 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Access</h1>
            <p className="mt-2 text-sm text-violet-300">Sign in to manage your content platform</p>
          </div>

          {sent ? (
            <div className="text-center">
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-400" />
              <h2 className="text-lg font-semibold text-white">Check your email</h2>
              <p className="mt-2 text-sm text-violet-300">
                We sent a magic link to <strong className="text-white">{email}</strong>.
                Click the link to sign in.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-violet-200">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rajamuthu107@gmail.com"
                    required
                    className="w-full rounded-lg border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white placeholder:text-violet-300 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400"
                  />
                </div>
              </div>
              {error && (
                <p className="rounded-lg bg-red-500/20 p-3 text-sm text-red-300">{error}</p>
              )}
              <Button type="submit" disabled={loading} className="w-full bg-white text-violet-900 hover:bg-violet-50 font-semibold">
                {loading ? "Sending…" : <><span>Send magic link</span> <ArrowRight className="h-4 w-4" /></>}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
