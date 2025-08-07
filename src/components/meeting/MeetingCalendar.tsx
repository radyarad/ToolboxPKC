"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Video,
  MapPin,
} from "lucide-react";
import { Meeting } from "@/lib/meetings/DataMeeting";
import { getDaysInMonth, getTypeColor } from "@/lib/meetings/DataMeeting";

type MeetingsCalendarProps = {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  meetings: Meeting[];
  onSelectMeeting: (meeting: Meeting) => void;
};

const MeetingsCalendar: React.FC<MeetingsCalendarProps> = ({
  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  meetings,
  onSelectMeeting,
}) => {
  // Helper untuk ambil meetings di tanggal tertentu
  const getMeetingsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return meetings.filter((meeting) => meeting.date === dateStr);
  };

  return (
    <div className="lg:col-span-3  rounded-xl shadow-sm border border-gray-200 dark:border-gray-300/30">
      <div className="p-6 border-b border-gray-200 dark:border-gray-300/30">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {currentDate.toLocaleDateString("id-ID", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1
                  )
                )
              }
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-200/20 rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-sm font-medium text-green-600 hover:text-green-700"
            >
              Today
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1
                  )
                )
              }
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-200 dark:hover:bg-gray-200/20 rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((day) => (
            <div
              key={day}
              className="p-2 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentDate).map((day, index) => {
            if (!day) {
              return <div key={index} className="p-2 h-28"></div>;
            }

            const dayMeetings = getMeetingsForDate(day);
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected =
              day.toDateString() === selectedDate.toDateString();

            return (
              <div
                key={index}
                onClick={() => setSelectedDate(day)}
                className={`p-2 h-28 border border-gray-200 dark:border-gray-800 rounded-lg cursor-pointer hover:bg-blue-200/20 transition-colors ${
                  isToday
                    ? "bg-blue-100 dark:bg-blue-200/20 border-blue-300 dark:border-blue-400/20"
                    : ""
                } ${
                  isSelected ? "ring-2 ring-blue-500 dark:ring-blue-500/80" : ""
                }`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    isToday ? "text-blue-700 dark:text-blue-400" : ""
                  }`}
                >
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayMeetings.slice(0, 3).map((meeting) => (
                    <div
                      key={meeting.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectMeeting(meeting);
                      }}
                      className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${getTypeColor(
                        meeting.type
                      )}`}
                      title={`${meeting.startTime} - ${meeting.title}`}
                    >
                      <div className="flex items-center space-x-1">
                        {meeting.isOnline ? (
                          <Video className="h-2 w-2 flex-shrink-0" />
                        ) : (
                          <MapPin className="h-2 w-2 flex-shrink-0" />
                        )}
                        <span className="truncate">
                          {meeting.startTime} {meeting.title}
                        </span>
                      </div>
                    </div>
                  ))}
                  {dayMeetings.length > 3 && (
                    <div className="text-xs text-muted-foreground px-1 font-medium">
                      +{dayMeetings.length - 3} lainnya
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MeetingsCalendar;
