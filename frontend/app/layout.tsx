import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/UI/Providers";
import Navbar from "@/components/nav/Navbar";
import { Toaster } from "@/components/UI/toaster";

export const metadata: Metadata = {
  title: "Chatify",
  description: "Chatiify is a chatting app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Providers>
          <Navbar />
          <main className="container mx-auto max-w-7xl lg:mt-8 p-5">{children}</main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
