"use client";
import React from "react";

// Import data analytics dari lib
import analyticsData from "@/lib/analytics/data";

// Import komponen analytics
import OverviewStats from "@/components/analytics/OverviewStats";
import MeetingAnalyticsCard from "@/components/analytics/MeetingAnalyticsCard";
import TaskManagementCard from "@/components/analytics/TaskManagementCard";
import NotesExportCard from "@/components/analytics/NotesExportCard";
import ProductivityMetrics from "@/components/analytics/ProductivityMetrics";
import AttendanceDetailCard from "@/components/analytics/AttendanceDetailCard";
import PerformanceTrendsCard from "@/components/analytics/PerformanceTrendsCard";

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen py-4 pl-2">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Web Toolbox PKC - Monitor performa tim dan aktivitas perusahaan
          </p>
        </div>

        {/* Overview Stats */}
        <OverviewStats
          meetings={analyticsData.meetings}
          tasks={analyticsData.tasks}
          notes={analyticsData.notes}
        />

        {/* Main Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <MeetingAnalyticsCard meetings={analyticsData.meetings} />
          <TaskManagementCard tasks={analyticsData.tasks} />
          <NotesExportCard notes={analyticsData.notes} />
        </div>

        {/* Productivity */}
        <ProductivityMetrics productivity={analyticsData.productivity} />

        {/* Detail Section */}
        <div className="grid gap-6 md:grid-cols-2">
          <AttendanceDetailCard />
          <PerformanceTrendsCard />
        </div>
      </div>
    </div>
  );
}
