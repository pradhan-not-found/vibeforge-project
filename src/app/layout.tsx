import type { Metadata } from "next";
import { GeistPixelGrid } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: "Checkpost",
  description: "Web Application Firewall for Autonomous AI Agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased __variable_d1bf66 __variable_e942f7 __variable_ab318e __variable_1018ec ${GeistPixelGrid.variable}`}>
      <body className="min-h-full flex flex-col bg-[#FDFDFB]">
        {children}
        <script src="/animations.js"></script>
      </body>
    </html>
  );
}
