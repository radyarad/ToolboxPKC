"use client";

import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import type { Meeting, MeetingMinutes } from "@/lib/detailMeeting/types";
import EditNotulensDialog from "@/components/detailMeeting/EditNotulensiDialog";

type Props = {
  meeting: Meeting;
  minutes: MeetingMinutes;
  onExportPDF: () => void;
  onSaveMinutes: (updatedMinutes: MeetingMinutes) => void;
};

export default function MeetingHeader({
  meeting,
  minutes,
  onExportPDF,
  onSaveMinutes,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.history.back()}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{meeting.title}</h1>
          <p className="text-muted-foreground">{meeting.description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <EditNotulensDialog
          meeting={meeting}
          minutes={minutes}
          onSave={onSaveMinutes}
        />
        <Button
          variant="default"
          size="sm"
          onClick={onExportPDF}
          className="gap-2"
        >
          <Download className="h-4 w-4" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}
