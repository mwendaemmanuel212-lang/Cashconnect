import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cash Connect | Deposits and account dashboard",
  description: "Cash Connect customer portal.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
