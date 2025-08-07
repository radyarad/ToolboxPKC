"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

export default function AttendanceDetailCard() {
  const data = [
    {
      color: "green",
      title: "Meeting Operasional",
      time: "Senin, 15:00",
      value: "12/15",
      variant: "default",
    },
    {
      color: "blue",
      title: "Review Produksi",
      time: "Rabu, 09:00",
      value: "8/10",
      variant: "secondary",
    },
    {
      color: "orange",
      title: "Planning Mingguan",
      time: "Jumat, 14:00",
      value: "6/8",
      variant: "outline",
    },
    {
      color: "red",
      title: "Board Meeting",
      time: "Kamis, 10:00",
      value: "5/12",
      variant: "destructive",
    },
  ];
  const colorMap = {
    green: "bg-green-500",
    blue: "bg-blue-500",
    orange: "bg-orange-500",
    red: "bg-red-500",
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Detail Attendance Meeting
        </CardTitle>
        <CardDescription>Rincian kehadiran meeting minggu ini</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {data.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 border rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-2 h-2 ${colorMap[item.color]} rounded-full`}
                ></div>
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.time}
                  </div>
                </div>
              </div>
              <Badge variant={item.variant as any}>{item.value}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
