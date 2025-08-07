"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  FolderCheck,
  NotepadText,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
export default function EngagementHome() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Total Task</p>
                <p className="text-2xl font-bold">47</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FolderCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 dark:text-green-300">
                +12% dari minggu lalu
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Task Selesai</p>
                <p className="text-2xl font-bold">32</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="mt-6">
              <Progress value={68} />
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Pending Task</p>
                <p className="text-2xl font-bold">15</p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="mt-4 flex items-center">
              <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-300 mr-1" />
              <span className="text-sm text-red-600 dark:text-red-400">
                5 task urgent
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Meeting</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="mt-4 flex items-center">
              <TriangleAlert className="h-4 w-4 text-yellow-500 dark:text-yellow-300 mr-1" />
              <span className="text-sm text-yellow-600 dark:text-yellow-400">
                3 hari ini
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium">Notulensi</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <NotepadText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardTitle>
          <CardDescription>
            <div className="mt-4 flex items-center">
              <span className="text-sm text-secondary-foreground">
                Bulan ini
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
