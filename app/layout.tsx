import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "seams(1) — find where your environments disagree",
  description:
    "seams is a fictional CLI that diffs configuration between environments: env vars, feature flags, infra parameters. One command, one report.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${mono.variable} antialiased`}>{children}</body>
    </html>
  );
}
