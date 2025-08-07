"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import React from "react";

type Props = {
  meetings: any;
};

export default function MeetingAnalyticsCard({ meetings }: Props) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Meeting Analytics
        </CardTitle>
        <CardDescription>Statistik meeting dan kehadiran tim</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Meeting Dihadiri</span>
            <span className="font-medium">
              {meetings.attended}/{meetings.total}
            </span>
          </div>
          <Progress value={meetings.attendance_rate} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">
              {meetings.upcoming}
            </div>
            <div className="text-xs text-blue-600">Meeting Mendatang</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">
              {meetings.attendance_rate}%
            </div>
            <div className="text-xs text-green-600">Attendance Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
