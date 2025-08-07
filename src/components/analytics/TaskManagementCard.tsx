"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import React from "react";

type Props = {
  tasks: any;
};

export default function TaskManagementCard({ tasks }: Props) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Task Management
        </CardTitle>
        <CardDescription>Progress dan status task tim</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm">Completed</span>
            <Badge variant="default">{tasks.completed}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">In Progress</span>
            <Badge variant="secondary">{tasks.in_progress}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Pending</span>
            <Badge variant="outline">{tasks.pending}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Overdue</span>
            <Badge variant="destructive">{tasks.overdue}</Badge>
          </div>
        </div>
        <div className="pt-2 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round((tasks.completed / tasks.total) * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Completion Rate</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
