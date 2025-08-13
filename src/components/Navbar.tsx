"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Search, Sun, Moon, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import NotificationButton from "./Notificationbutton";

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 w-full z-30 h-14 sm:h-16 px-2 sm:px-4 flex items-center justify-between bg-background shadow">
      {/* Kiri */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <SidebarTrigger />
        <h1 className="text-sm sm:text-md lg:text-2xl font-bold text-md">
          Web Toolbox PKC
        </h1>
        <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
          <Search className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Cari task, meeting, atau notulensi..."
            className="bg-transparent border-none outline-none text-xs sm:text-sm w-48 sm:w-64 dark:text-neutral-700"
          />
        </div>
      </div>
      {/* kanan */}
      <div className="flex items-center gap-2 sm:gap-4 mr-2 sm:mr-3">
        {/* notikasi */}
        <NotificationButton />
        {/* Theme Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <Sun className="h-[1rem] sm:h-[1.2rem] w-[1rem] sm:w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1rem] sm:h-[1.2rem] w-[1rem] sm:w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="h-8 w-8 sm:h-10 sm:w-10 p-0">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
