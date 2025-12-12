import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { SidebarProvider } from "./ui/sidebar.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </SidebarProvider>
  </StrictMode>,
);
