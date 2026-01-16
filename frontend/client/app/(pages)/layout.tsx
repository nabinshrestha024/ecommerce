"use client";
import Chatbot from "@/components/Chatbox/Chatbox";
import { Navbar } from "@/components/Navbar/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAuth = useAuth();
  return (
    <div>
      <Navbar />
      <NuqsAdapter>{children}</NuqsAdapter>
      {isAuth && <Chatbot />}
    </div>
  );
}
