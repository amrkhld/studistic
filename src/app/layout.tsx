import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/shared/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Studistic — Student Performance Analytics",
  description: "AI-powered student performance monitoring & early-warning system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased h-screen flex overflow-hidden" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        {/* Aurora animated background */}
        <div className="aurora-bg" aria-hidden="true" />

        {/* App shell */}
        <div className="relative z-10 flex w-full h-full">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
