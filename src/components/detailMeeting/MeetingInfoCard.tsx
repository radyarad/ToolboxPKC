"use client";

import { Calendar, Clock, MapPin, Video, Users } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import React from "react";
import type { Meeting } from "@/lib/detailMeeting/types";
import {
  getTypeBadgeVariant,
  getStatusBadgeVariant,
  formatDate,
  formatTime,
} from "@/lib/detailMeeting/utils";

type Props = {
  meeting: Meeting;
};

export default function MeetingInfoCard({ meeting }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Informasi Meeting</CardTitle>
          <div className="flex gap-2">
            <Badge variant={getTypeBadgeVariant(meeting.type)}>
              {meeting.type}
            </Badge>
            <Badge variant={getStatusBadgeVariant(meeting.status)}>
              {meeting.status}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">{formatDate(meeting.date)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {meeting.isOnline ? (
              <Video className="h-4 w-4 text-muted-foreground" />
            ) : (
              <MapPin className="h-4 w-4 text-muted-foreground" />
            )}
            <div>{meeting.location}</div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>{meeting.participants.length} peserta</div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between text-sm">
          <span>
            <strong>Organizer:</strong> {meeting.organizer}
          </span>
          {meeting.recurring !== "none" && (
            <Badge variant="outline">{meeting.recurring}</Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
