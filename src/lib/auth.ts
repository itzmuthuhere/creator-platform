import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    EmailProvider({
      from: process.env.EMAIL_FROM,
      // Railway blocks outbound SMTP (both 587 and 465) from long-running
      // services — confirmed via [next-auth][error][SIGNIN_EMAIL_ERROR]
      // "Connection timeout" in production logs, even though the exact same
      // credentials work fine from a one-off `railway run` job container.
      // Resend's HTTP API rides port 443, which is never blocked.
      sendVerificationRequest: async ({ identifier: email, url }) => {
        const { host } = new URL(url);
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: `Sign in to ${host}`,
            html: `<p>Sign in to <b>${host}</b></p><p><a href="${url}">Click here to sign in</a></p><p>If you did not request this, you can safely ignore this email.</p>`,
            text: `Sign in to ${host}\n${url}\n\nIf you did not request this, you can safely ignore this email.`,
          }),
        });
        if (!res.ok) {
          throw new Error(`Resend API error ${res.status}: ${await res.text()}`);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const allowed = (process.env.ADMIN_EMAIL || "").split(",").map(e => e.trim());
      if (!allowed.includes(user.email || "")) return false;
      return true;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = (user as any).role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "database",
  },
};
