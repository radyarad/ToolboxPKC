"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Users,
  FileText,
  Edit,
} from "lucide-react";
import { Meeting } from "@/lib/scheduler/DataMeeting";
import { getTypeColor, getStatusColor } from "@/lib/scheduler/DataMeeting";
import Link from "next/link";

type MeetingsOfSelectedDateProps = {
  selectedDate: Date;
  meetings: Meeting[];
  onShowDetail: (meeting: Meeting) => void;
  onEditMeeting: (meeting: Meeting) => void;
  onCreateMeeting: () => void;
};

const MeetingsOfSelectedDate: React.FC<MeetingsOfSelectedDateProps> = ({
  selectedDate,
  meetings,
  onShowDetail,
  onEditMeeting,
}) => {
  // Ambil meetings di tanggal terpilih
  const dateStr = selectedDate.toISOString().split("T")[0];
  const meetingsForDate = meetings.filter((m) => m.date === dateStr);

  return (
    <div className="rounded-xl shadow-sm border border-gray-200 dark:border-gray-300/30">
      <div className="p-4 border-b border-gray-200 dark:border-gray-300/30">
        <h3 className="text-lg font-semibold ">
          {selectedDate.toDateString() === new Date().toDateString()
            ? "Meeting Hari Ini"
            : selectedDate.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
        </h3>
        <p className="text-sm text-muted-foreground">
          {meetingsForDate.length} meeting dijadwalkan
        </p>
      </div>

      <div className="p-4">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {meetingsForDate.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="h-8 w-8 text-gray-400 dark:text-gray-5 00 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Tidak ada meeting</p>
            </div>
          ) : (
            meetingsForDate.map((meeting) => (
              <div
                key={meeting.id}
                onClick={() => onShowDetail(meeting)}
                className={`p-3 rounded-lg border cursor-pointer hover:shadow-md transition-all ${getTypeColor(
                  meeting.type
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm mb-1 truncate">
                      {meeting.title}
                    </h4>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 flex-shrink-0" />
                        <span>
                          {meeting.startTime} - {meeting.endTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        {meeting.isOnline ? (
                          <Video className="h-3 w-3 flex-shrink-0" />
                        ) : (
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                        )}
                        <span className="truncate">{meeting.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <Users className="h-3 w-3 flex-shrink-0" />
                        <span>{meeting.participants.length} peserta</span>
                      </div>
                      {meeting.notes && (
                        <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                          <FileText className="h-3 w-3 flex-shrink-0 mt-0.5" />
                          <span className="truncate">{meeting.notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-1 ml-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        meeting.status
                      )}`}
                    >
                      {meeting.status}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditMeeting(meeting);
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <Edit className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <Link href={"/meetings/addMeeting"}>
          <button className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/80 transition-colors text-sm font-medium">
            Tambah Meeting
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MeetingsOfSelectedDate;
