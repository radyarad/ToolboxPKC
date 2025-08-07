"use client";

import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { DialogCreateTask } from "./DialogCreateTask";

export default function HeaderTask() {
  const [activeView, setActiveView] = useState("kanban");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="border-b border-gray-200 dark:border-gray-200/20 py-3.5 px-2 mr-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 lg:hidden">
            <div className="h-6 w-6 bg-blue-500 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
          </button>
          <h1 className="text-xl font-bold">Task Management</h1>
          {/* 3 Button */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveView("kanban")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeView === "kanban"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              Kanban
            </button>
            <button
              onClick={() => setActiveView("list")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeView === "list"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setActiveView("calendar")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeView === "calendar"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              Calendar
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 text-muted-foreground">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari task..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          <Button className="flex items-center space-x-2 px-3 py-2 border text-foreground bg-background hover:bg-accent border-gray-300 rounded-lg cursor-pointer">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter</span>
          </Button>

          {/* dialog */}
          <DialogCreateTask />
        </div>
      </div>
    </div>
  );
}
