"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { DataMeetings } from "@/lib/attendance/meetingData";
import { MeetingCard } from "@/components/attendance/MeetingCard";

const AttendancePage = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Meeting Attendance</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Generate QR codes untuk absensi meeting dan kelola kehadiran
                  peserta
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-300/20 dark:border-blue-500/20 dark:text-blue-500"
                >
                  {DataMeetings.length} Meetings
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {DataMeetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>

        {/* Empty State */}
        {DataMeetings.length === 0 && (
          <div className="text-center py-12">
            <Calendar size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Tidak ada meeting</h3>
            <p className="text-muted-foreground">
              Belum ada meeting yang tersedia untuk generate QR code absensi.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;
