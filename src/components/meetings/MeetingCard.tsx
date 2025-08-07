"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Video, Users } from "lucide-react";
import { Meeting } from "@/lib/meeting/data";

// Helper function (boleh tambah di file ini, karena dipakai di komponen card)
function getTypeBadgeVariant(
  type: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (type) {
    case "important":
      return "destructive";
    case "recurring":
      return "default";
    case "technical":
      return "secondary";
    case "event":
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusBadgeVariant(
  status: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "confirmed":
      return "default";
    case "tentative":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

interface MeetingCardProps {
  meeting: Meeting;
  onClick?: (meeting: Meeting) => void;
}

export default function MeetingCard({ meeting, onClick }: MeetingCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
      onClick={() => onClick && onClick(meeting)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-xl">{meeting.title}</CardTitle>
              <Badge variant={getTypeBadgeVariant(meeting.type)}>
                {meeting.type}
              </Badge>
              <Badge variant={getStatusBadgeVariant(meeting.status)}>
                {meeting.status}
              </Badge>
            </div>
            <CardDescription className="text-base">
              {meeting.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Meeting Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <div className="font-medium">{formatDate(meeting.date)}</div>
            </div>
          </div>
          {/* Time */}
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <div>
                {formatTime(meeting.startTime)} - {formatTime(meeting.endTime)}
              </div>
            </div>
          </div>
          {/* Location */}
          <div className="flex items-center gap-2 text-sm">
            {meeting.isOnline ? (
              <Video className="h-4 w-4 text-muted-foreground" />
            ) : (
              <MapPin className="h-4 w-4 text-muted-foreground" />
            )}
            <div className="truncate">{meeting.location}</div>
          </div>
          {/* Participants */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>{meeting.participants.length} peserta</div>
          </div>
        </div>

        {/* Organizer and Recurring Info */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Organizer:</span> {meeting.organizer}
          </div>
          {meeting.recurring !== "none" && (
            <Badge variant="outline" className="text-xs">
              {meeting.recurring}
            </Badge>
          )}
        </div>

        {/* Agenda Preview */}
        {meeting.agenda.length > 0 && (
          <div className="pt-4 border-t space-y-2">
            <div className="text-sm font-medium">Agenda:</div>
            <div className="space-y-1">
              {meeting.agenda.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-primary mt-1">•</span>
                  <span>{item}</span>
                </div>
              ))}
              {meeting.agenda.length > 2 && (
                <div className="text-xs text-primary">
                  +{meeting.agenda.length - 2} agenda lainnya
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
