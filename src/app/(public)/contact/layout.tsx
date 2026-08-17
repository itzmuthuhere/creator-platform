import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/utils";

export const metadata: Metadata = {
  alternates: { canonical: `${getBaseUrl()}/contact` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
