import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cofounder",
  description: "Clone of cofounder.co",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased __variable_d1bf66 __variable_e942f7 __variable_ab318e __variable_1018ec">
      <body className="min-h-full flex flex-col bg-[#FDFDFB]">
        {children}
        <script src="/animations.js"></script>
      </body>
    </html>
  );
}
