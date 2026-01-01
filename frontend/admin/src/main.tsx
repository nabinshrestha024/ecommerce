import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { SidebarProvider } from "./ui/sidebar.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext.tsx";
import { NuqsAdapter } from "nuqs/adapters/react";

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NuqsAdapter>
              <App />
            </NuqsAdapter>
            <Toaster />
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </SidebarProvider>
  </StrictMode>,
);
