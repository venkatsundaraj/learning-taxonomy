import type { Metadata } from "next";
import { Inter, Montserrat, Urbanist } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/util";

const inter = Inter({ subsets: ["latin"] });

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const monteserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-paragraph",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Project Tracker",
  ],
  // themeColor: [
  //   { media: "(prefers-color-scheme: light)", color: "white" },
  //   { media: "(prefers-color-scheme: dark)", color: "black" },
  // ],
  creator: "venkat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen  antialiased bg-background font-sans",
          urbanist.variable,
          monteserrat.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
