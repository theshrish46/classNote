import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/site-components/Navbar";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "classnote",
  description: "A place where you can create and share your blogs",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(inter.className, "font-sans")}>
          <main className="relative flex flex-col min-h-screen">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              storageKey="blog-theme"
              enableSystem={false}
            >
              <Navbar />
              {children}
            </ThemeProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
}
