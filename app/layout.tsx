import { Toaster } from "@/components/ui/sonner";
import { title } from "@/lib/content";
import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: title.primary,
  description: title.description,
  keywords: ["web application", "next starter"],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<React.ComponentProps<"div">>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster position="top-center" closeButton richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
