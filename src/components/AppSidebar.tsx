"use client";

import {
  Calendar,
  Calendar1,
  CalendarDays,
  ChartColumnIncreasing,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  File,
  FolderKanban,
  Home,
  Plus,
  PlusCircle,
  ScanQrCode,
  Speech,
  User2,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

import { useSidebar } from "./ui/sidebar";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Manage Task",
    url: "/task",
    icon: FolderKanban,
  },
  {
    title: "Teams",
    url: "/team",
    icon: Users,
  },
];
export default function AppSidebar() {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" className="pt-16">
      <SidebarHeader className="pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center">
              <SidebarMenuButton className="w-12 h-12" asChild>
                <Link href="/dashboard">
                  <Image
                    src="/logo_pkc_light.png"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </Link>
              </SidebarMenuButton>
              {state === "expanded" && (
                <p className="transition-opacity duration-300 text-lg">Admin</p>
              )}
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Collapsible className="group/collapsible">
              <SidebarMenu>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <Calendar />
                      <span>Meetings</span>
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu>
                      {state === "expanded" ? (
                        <SidebarMenuItem className="ml-3">
                          <SidebarMenuButton asChild>
                            <Link href="/meetings/addMeeting">
                              <PlusCircle />
                              Add Meeting
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ) : (
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/meetings/addMeeting">
                              <PlusCircle />
                              Add Meeting
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenu>
                    <SidebarMenu>
                      {state === "expanded" ? (
                        <SidebarMenuItem className="ml-3">
                          <SidebarMenuButton asChild>
                            <Link href="/meetings">
                              <Calendar1 />
                              List Meeting
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ) : (
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/meetings">
                              <Calendar1 />
                              List Meeting
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenu>
                    <SidebarMenu>
                      {state === "expanded" ? (
                        <SidebarMenuItem className="ml-3">
                          <SidebarMenuButton asChild>
                            <Link href="/meetings/scheduler">
                              <CalendarDays />
                              Meeting Calendar
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ) : (
                        <SidebarMenuItem>
                          <SidebarMenuButton asChild>
                            <Link href="/meetings/scheduler">
                              <CalendarDays />
                              Meeting Calendar
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      )}
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </SidebarMenu>
            </Collapsible>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/attendance">
                    <ScanQrCode />
                    <span>Attendance</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/analytics">
                    <ChartColumnIncreasing />
                    <span>Analytics</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Admin <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href={"/Settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/Profile"}>Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Exit</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
