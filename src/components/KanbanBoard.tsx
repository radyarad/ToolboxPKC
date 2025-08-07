"use client";

import TaskKanban from "@/lib/TaskKanban";
import { Plus } from "lucide-react";
import { useState } from "react";
import TaskKanbanCard from "./TaskKanbanCard";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  assignee: { name: string; avatar: string };
  dueDate: string;
  tags: string[];
  comments: number;
  attachments: number;
}

interface TaskKanbanType {
  todo: Task[];
  inprogress: Task[];
  done: Task[];
}

export default function KanbanBoard() {
  const [tasks, setTasks] = useState<TaskKanbanType>(TaskKanban[0]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* To Do Column */}
      <div className="bg-gray-100 dark:bg-gray-300/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-gray-500 rounded-full"></div>
            <h3 className="font-semibold ">To Do</h3>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
              {tasks.todo.length}
            </span>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {tasks.todo.map((task) => (
            <TaskKanbanCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* In Progress Column */}
      <div className="bg-blue-50 dark:bg-blue-300/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
            <h3 className="font-semibold">In Progress</h3>
            <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-medium">
              {tasks.inprogress.length}
            </span>
          </div>
          <button className="text-blue-500 hover:text-blue-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {tasks.inprogress.map((task) => (
            <TaskKanbanCard key={task.id} task={task} />
          ))}
        </div>
      </div>

      {/* Done Column */}
      <div className="bg-green-50 dark:bg-green-300/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            <h3 className="font-semibold ">Done</h3>
            <span className="bg-green-200 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
              {tasks.done.length}
            </span>
          </div>
          <button className="text-green-500 hover:text-green-700">
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-3">
          {tasks.done.map((task) => (
            <TaskKanbanCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
