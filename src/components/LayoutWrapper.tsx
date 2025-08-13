"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import Navbar from "./Navbar";

interface LayoutWrapperProps {
  children: React.ReactNode;
  defaultOpen: boolean;
}

export default function LayoutWrapper({
  children,
  defaultOpen,
}: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  // Handle body class for login page
  useEffect(() => {
    const body = document.body;
    if (isLoginPage) {
      body.classList.remove("flex");
    } else {
      body.classList.add("flex");
    }

    // Cleanup function
    return () => {
      if (isLoginPage) {
        body.classList.add("flex");
      }
    };
  }, [isLoginPage]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="w-full">
        <Navbar />
        <div className="px-3 sm:px-6 pt-14 sm:pt-16">{children}</div>
      </div>
    </SidebarProvider>
  );
}
