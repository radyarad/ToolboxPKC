"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import { formatDateTime, formatDate } from "@/lib/detailMeeting/utils";

type Props = {
  createdAt: string;
  lastModified: string;
  nextMeetingDate?: string;
};

export default function MeetingInfoSidebar({
  createdAt,
  lastModified,
  nextMeetingDate,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Informasi Notulensi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div>
          <span className="font-medium">Dibuat:</span>
          <br />
          {formatDateTime(createdAt)}
        </div>
        <div>
          <span className="font-medium">Terakhir diubah:</span>
          <br />
          {formatDateTime(lastModified)}
        </div>
        {nextMeetingDate && (
          <div>
            <span className="font-medium">Meeting selanjutnya:</span>
            <br />
            {formatDate(nextMeetingDate)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
