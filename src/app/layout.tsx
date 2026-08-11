import type { Metadata } from "next";
import { GeistPixelGrid } from "geist/font/pixel";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Checkpost | Enterprise WAF for AI Agents",
    template: "%s | Checkpost"
  },
  description: "Enterprise-grade Web Application Firewall (WAF) to monitor, secure, and enforce policies on your autonomous AI agents.",
  keywords: ["AI Agents", "WAF", "Security", "Firewall", "LLM Security", "Agentic Security", "Checkpost"],
  openGraph: {
    title: "Checkpost | Enterprise WAF for AI Agents",
    description: "Monitor your autonomous agent activity and firewall interventions in real-time. Enforce policies and prevent destructive actions.",
    url: "https://checkpost.ai",
    siteName: "Checkpost",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/_assets/static/logo.png",
        width: 800,
        height: 600,
        alt: "Checkpost Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkpost | Enterprise WAF for AI Agents",
    description: "Secure your AI agents with Checkpost. Intercept destructive actions and enforce strict operational policies.",
    images: ["/_assets/static/logo.png"],
  },
  icons: {
    icon: "/_assets/static/logo.png",
    shortcut: "/_assets/static/logo.png",
    apple: "/_assets/static/logo.png",
  },
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
