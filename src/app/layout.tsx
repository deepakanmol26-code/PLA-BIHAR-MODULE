import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "PLA Bihar Module",
  description: "सहभागी सीख एवं क्रियान्वयन"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <body>
        <Providers>
          {children}
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
