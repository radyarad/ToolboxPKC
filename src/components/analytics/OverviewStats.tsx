"use client";
import StatCard from "./StatCard";
import { Calendar, CheckSquare, FileText, Users } from "lucide-react";

type OverviewStatsProps = {
  meetings: any;
  tasks: any;
  notes: any;
};

export default function OverviewStats({
  meetings,
  tasks,
  notes,
}: OverviewStatsProps) {
  return (
    <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Meeting"
        value={meetings.total}
        description="Meeting bulan ini"
        icon={Calendar}
        trend={true}
        trendValue={12}
      />
      <StatCard
        title="Task Selesai"
        value={tasks.completed}
        description={`dari ${tasks.total} total task`}
        icon={CheckSquare}
        trend={true}
        trendValue={8}
      />
      <StatCard
        title="Notulensi Dibuat"
        value={notes.total}
        description="Dokumen meeting"
        icon={FileText}
        trend={true}
        trendValue={15}
      />
      <StatCard
        title="Tingkat Kehadiran"
        value={`${meetings.attendance_rate}%`}
        description="Rata-rata attendance"
        icon={Users}
        trend={true}
        trendValue={5}
      />
    </div>
  );
}
