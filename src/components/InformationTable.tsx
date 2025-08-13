"use client";

import {
  Calendar,
  Clock,
  MoreHorizontal,
  Plus,
  SquareCheck,
  SquarePen,
  Trash,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator";
import recentTasks from "@/lib/RecentTask";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import upcomingMeetings from "@/lib/UpcomingMeetings";

export default function InformationTable() {
  const statusOrder = ["pending", "in-progress", "completed"];
  const priorityOrder = ["high", "medium", "low"];
  const sortedTasks = [...recentTasks].sort((a, b) => {
    const statusDiff =
      statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    if (statusDiff !== 0) return statusDiff;
    return (
      priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
    );
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
      {/* task terbaru */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle>
              <div className="flex items-center justify-between">
                <p className="text-base sm:text-lg">Task Terbaru</p>
                <Link
                  href={"/task/new"}
                  className="flex gap-1 sm:gap-2 items-center text-primary text-sm sm:text-base"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  <p>Tambah Task</p>
                </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="p-3 sm:p-4 lg:p-6">
            {/* data nya */}
            <div className="space-y-3 sm:space-y-4">
              {sortedTasks.map((task) => (
                <Card key={task.id} className="flex items-start p-3 sm:p-4">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-row items-center space-x-2 sm:space-x-4">
                      <div
                        className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      ></div>
                      <div>
                        <h4 className="font-medium text-sm sm:text-base">
                          {task.title}
                        </h4>
                        <div className="flex items-center space-x-1 sm:space-x-2 mt-1">
                          <span
                            className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {task.assignee}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            •
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {task.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" className="p-1" asChild>
                          <MoreHorizontal className="h-7 w-7 sm:h-9 sm:w-9" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>
                          <SquareCheck className="mr-2 h-4 w-4" />
                          Mark as done
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <SquarePen className="mr-2 h-4 w-4" />
                          Edit task
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive">
                          <Trash className="mr-2 h-4 w-4" />
                          Hapus task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Meeting */}
      <div>
        <Card className="max-h-[400px] sm:max-h-[510px]">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg">
              Meeting Hari Ini
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="overflow-y-scroll p-3 sm:p-4 lg:p-6">
            {/* Datanya */}
            <div className="space-y-3 sm:space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="h-8 w-8 sm:h-10 sm:w-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm sm:text-base">
                        {meeting.title}
                      </h4>
                      <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-muted-foreground">
                        <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>{meeting.time}</span>
                        <span>•</span>
                        <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        <span>{meeting.participants} orang</span>
                      </div>
                    </div>
                  </div>
                  {meeting.type === "important" && (
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full"></div>
                  )}
                  {meeting.type === "monthly" && (
                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 sm:mt-6">
              <Link href={"/meetings/scheduler"}>
                <Button
                  variant={"default"}
                  className="w-full transition-colors cursor-pointer text-sm sm:text-base"
                >
                  Lihat Calendar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
