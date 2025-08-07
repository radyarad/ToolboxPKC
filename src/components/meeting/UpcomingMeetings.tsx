"use client";

import React from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  MapPin,
  Users,
  Eye,
  Edit,
  MoreHorizontal,
} from "lucide-react";
import { Meeting } from "@/lib/meetings/DataMeeting";
import { getTypeColor, getStatusColor } from "@/lib/meetings/DataMeeting";

type UpcomingMeetingsProps = {
  meetings: Meeting[];
  onShowDetail: (meeting: Meeting) => void;
  onEditMeeting: (meeting: Meeting) => void;
  onCreateMeeting: () => void;
};

const UpcomingMeetings: React.FC<UpcomingMeetingsProps> = ({
  meetings,
  onShowDetail,
  onEditMeeting,
  onCreateMeeting,
}) => {
  // Filter only future meetings
  const now = new Date();
  const upcomingMeetings = meetings
    .filter(
      (meeting) => new Date(meeting.date + "T" + meeting.startTime) >= now
    )
    .sort(
      (a, b) =>
        new Date(a.date + "T" + a.startTime).getTime() -
        new Date(b.date + "T" + b.startTime).getTime()
    )
    .slice(0, 5);

  return (
    <div className="mt-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-300/30">
      <div className="p-6 border-b border-gray-200 dark:border-gray-300/30">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Meeting Mendatang</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Daftar semua meeting yang akan datang
            </p>
          </div>
          <button className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm font-medium">
            Lihat Semua
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {upcomingMeetings.length > 0 ? (
            upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-200/20 transition-colors cursor-pointer"
                onClick={() => onShowDetail(meeting)}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`h-12 w-12 rounded-lg flex items-center justify-center ${getTypeColor(
                      meeting.type
                    )}`}
                  >
                    {meeting.isOnline ? (
                      <Video className="h-5 w-5" />
                    ) : (
                      <MapPin className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{meeting.title}</h4>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          meeting.status
                        )}`}
                      >
                        {meeting.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {meeting.description}
                    </p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="h-3 w-3" />
                        <span>
                          {new Date(meeting.date).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {meeting.startTime} - {meeting.endTime}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{meeting.participants.length} peserta</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onShowDetail(meeting);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditMeeting(meeting);
                    }}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <CalendarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Tidak ada meeting mendatang
              </h4>
              <p className="text-gray-600 mb-4">
                Buat meeting baru untuk memulai kolaborasi tim
              </p>
              <button
                onClick={onCreateMeeting}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buat Meeting Pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeetings;
