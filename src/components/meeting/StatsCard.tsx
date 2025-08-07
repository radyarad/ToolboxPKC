"use client";

import React from "react";
import { Calendar, Clock, Video, AlertCircle } from "lucide-react";
import { Meeting } from "@/lib/meetings/DataMeeting";
import { Card, CardContent } from "../ui/card";

type MeetingsStatsCardsProps = {
  meetings: Meeting[];
};

const MeetingsStatsCards: React.FC<MeetingsStatsCardsProps> = ({
  meetings,
}) => {
  // Mendapatkan tanggal hari ini dalam format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm ">Meeting Hari Ini</p>
              <p className="text-2xl font-bold ">
                {meetings.filter((m) => m.date === today).length}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-300/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm ">Meeting Minggu Ini</p>
              <p className="text-2xl font-bold">{meetings.length}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-300/20 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm ">Meeting Online</p>
              <p className="text-2xl font-bold">
                {meetings.filter((m) => m.isOnline).length}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-300/20 rounded-lg flex items-center justify-center">
              <Video className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm ">Pending Response</p>
              <p className="text-2xl font-bold">
                {meetings.reduce(
                  (acc, meeting) =>
                    acc +
                    meeting.participants.filter((p) => p.status === "pending")
                      .length,
                  0
                )}
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-100 dark:bg-yellow-300/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingsStatsCards;
