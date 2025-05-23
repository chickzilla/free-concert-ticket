import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/alert/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-screen flex overflow-hidden bg-gray-50">
      <aside className="h-full sticky top-0">
        <Navbar />
      </aside>
      <div className="m-6 bg-white h-full w-full rounded-2xl overflow-y-auto">
        {children}
      </div>
      <Toaster />
    </div>
  );
}
