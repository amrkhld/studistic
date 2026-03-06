import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/shared/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export const metadata: Metadata = {
  title: "Studistic — Student Performance Analytics",
  description: "AI-powered student performance prediction and analytics platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
       <body className="antialiased h-screen flex overflow-hidden" style={{ fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
           {children}
        </main>
      </body>
    </html>
  );
}
