import { Navbar } from "@/components/Navbar/Navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <NuqsAdapter>{children}</NuqsAdapter>
    </div>
  );
}
