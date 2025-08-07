"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, Clock, CheckSquare, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import React from "react";

type Props = {
  productivity: any;
};

export default function ProductivityMetrics({ productivity }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Produktivitas Tim
        </CardTitle>
        <CardDescription>
          Metrik performa dan efisiensi kerja tim
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Rata-rata Task Harian</span>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {productivity.daily_average_tasks}
            </div>
            <div className="text-xs text-muted-foreground">
              task per hari per orang
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Weekly Completion Rate
              </span>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {productivity.weekly_completion_rate}%
            </div>
            <Progress
              value={productivity.weekly_completion_rate}
              className="h-2"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">On-Time Delivery</span>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">
              {productivity.on_time_delivery}%
            </div>
            <Progress value={productivity.on_time_delivery} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
