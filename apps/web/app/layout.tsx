import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
        {children}
      </body>
    </html>
  );
}
