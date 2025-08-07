"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import React from "react";

export default function PerformanceTrendsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Trend Performa Bulanan
        </CardTitle>
        <CardDescription>
          Perbandingan performa 3 bulan terakhir
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Task Completion</span>
              <span className="text-sm font-medium">89/156 (57%)</span>
            </div>
            <Progress value={57} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">
              +12% dari bulan lalu
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Meeting Attendance</span>
              <span className="text-sm font-medium">84%</span>
            </div>
            <Progress value={84} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">
              +5% dari bulan lalu
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">Notes Documentation</span>
              <span className="text-sm font-medium">67 dokumen</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">
              +18% dari bulan lalu
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm">On-time Delivery</span>
              <span className="text-sm font-medium">82%</span>
            </div>
            <Progress value={82} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">
              +3% dari bulan lalu
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
