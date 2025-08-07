"use client";

import {
  Bell,
  Moon,
  Scroll,
  Search,
  Settings,
  Shield,
  Sun,
  User,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { SidebarTrigger } from "./ui/sidebar";
import NotificationButton from "./Notificationbutton";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className="fixed top-0 left-0 w-full z-30 h-16 px-4 flex items-center justify-between bg-background shadow">
      {/* Kiri */}
      <div className="flex items-center space-x-4">
        <SidebarTrigger />
        <h1 className="lg:text-2xl font-bold text-lg">Web Toolbox PKC</h1>
        <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Cari task, meeting, atau notulensi..."
            className="bg-transparent border-none outline-none text-sm w-64 dark:text-neutral-700"
          />
        </div>
      </div>
      {/* kanan */}
      <div className="flex items-center gap-4 mr-3">
        {/* notikasi */}
        <NotificationButton />
        {/* Theme Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
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
            <div className="flex items-center space-x-2">
              <Avatar className="cursor-pointer size-10">
                <AvatarImage src="/logo_pkc_light.png" />
                <AvatarFallback>PKC</AvatarFallback>
              </Avatar>
              <p>Admin</p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link href={"/Settings"} className="flex items-center">
                <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
                General
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Scroll className="h-[1.2rem] w-[1.2rem] mr-2" />
              logs
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Teams
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="h-[1.2rem] w-[1.2rem] mr-2" />
              Security
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
