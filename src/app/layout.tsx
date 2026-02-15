import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/shared/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const anton = Anton({ weight: "400", subsets: ["latin"], variable: "--font-anton" });

export const metadata: Metadata = {
  title: "Studistic | Urban Editorial Dashboard",
  description: "A premium student productivity platform with high-contrast design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
       <body className="font-sans antialiased bg-background text-foreground h-screen flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
           {children}
        </main>
      </body>
    </html>
  );
}
