"use client";

import React from "react";
import { Plus, Search, Filter } from "lucide-react";
import Link from "next/link";

type MeetingsHeaderProps = {
  activeView: string;
  setActiveView: (view: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateMeeting: () => void;
};

const MeetingsHeader: React.FC<MeetingsHeaderProps> = ({
  activeView,
  setActiveView,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold ">Meeting Scheduler</h1>
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveView("month")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeView === "month"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setActiveView("week")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeView === "week"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setActiveView("day")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeView === "day"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setActiveView("agenda")}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                activeView === "agenda"
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-50"
              }`}
            >
              Agenda
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 text-muted-foreground">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari meeting..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-48 text-black"
            />
          </div>
          <button className="flex items-center space-x-2 px-3 py-2 hover:text-gray-900 dark:hover:text-white/90 border border-gray-300 rounded-lg">
            <Filter className="h-4 w-4" />
            <span className="text-sm">Filter</span>
          </button>
          <Link href={"/meetings/addMeeting"}>
            <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <Plus className="h-4 w-4" />
              <span className="text-sm font-medium">Meeting Baru</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MeetingsHeader;
