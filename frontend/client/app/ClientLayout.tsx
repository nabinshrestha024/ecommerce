"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const isAuth = Boolean(storedToken);

    if (isAuth && pathname === "/login") {
      router.push("/home");
      return;
    }
    if (!isAuth && pathname === "/wishlist") {
      router.push("/home");
      return;
    }
  }, [pathname, router]);

  return <AuthProvider>{children}</AuthProvider>;
}
