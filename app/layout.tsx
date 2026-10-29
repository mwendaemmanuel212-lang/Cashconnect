
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cash Connect",
  description: "Your money, connected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
