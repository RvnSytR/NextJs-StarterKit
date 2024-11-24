import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";

export const font = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Project Title",
  description: "Project Description",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
