import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/lib/react-query-provider";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });
import UseAuth from "./middleware/auth-middleware";

export const metadata: Metadata = {
  title: "TWC Contacts Portal",
  description: "Easily save and manage your contacts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <UseAuth />
        <body className={inter.className}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
