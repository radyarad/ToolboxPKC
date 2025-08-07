"use client";

import HeaderTask from "@/components/HeaderTask";
import KanbanBoard from "@/components/KanbanBoard";
import TaskCard from "@/components/TaskCard";

export default function TaskPage() {
  return (
    <div className="grid space-y-6">
      <HeaderTask />
      <TaskCard />
      <KanbanBoard />
    </div>
  );
}
