import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";

const fontSans = Instrument_Sans({ variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Scrum Bug",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased bg-background", fontSans.variable)}>
        <Toaster />
        <NextAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
