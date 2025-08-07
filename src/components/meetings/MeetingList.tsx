"use client";

import { Meeting } from "@/lib/meeting/data";
import MeetingCard from "./MeetingCard";

interface MeetingListProps {
  meetings: Meeting[];
  onMeetingClick?: (meeting: Meeting) => void;
}

export default function MeetingList({
  meetings,
  onMeetingClick,
}: MeetingListProps) {
  return (
    <div className="space-y-4">
      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
          onClick={onMeetingClick}
        />
      ))}
    </div>
  );
}
