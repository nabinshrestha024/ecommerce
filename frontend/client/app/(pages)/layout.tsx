import { Navbar } from "@/components/Navbar/Navbar";
import { SidebarProvider } from "@/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div>
        <Navbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
