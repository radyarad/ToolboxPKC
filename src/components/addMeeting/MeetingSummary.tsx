// /components/addMeeting/MeetingSummary.tsx
"use client";

import React from "react";
import {
  Calendar,
  Users,
  MapPin,
  Video,
  RefreshCw,
  FileText,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { FormData } from "@/types/meeting";

interface MeetingSummaryProps {
  formData: FormData;
  recurringOptions: { value: string; label: string }[];
}

const MeetingSummary: React.FC<MeetingSummaryProps> = ({
  formData,
  recurringOptions,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ringkasan Meeting</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start space-x-3">
          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">
              {formData.date
                ? new Date(formData.date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "Tanggal belum dipilih"}
            </div>
            <div className="text-xs text-muted-foreground">
              {formData.startTime && formData.endTime
                ? `${formData.startTime} - ${formData.endTime}`
                : "Waktu belum ditentukan"}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          {formData.isOnline ? (
            <Video className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          ) : (
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          )}
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">
              {formData.isOnline ? "Meeting Online" : "Meeting Offline"}
            </div>
            <div className="text-xs text-muted-foreground break-all">
              {formData.isOnline
                ? formData.meetingLink || "Link belum diatur"
                : formData.location || "Lokasi belum ditentukan"}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Users className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">
              {formData.participants.length} Peserta
            </div>
            <div className="text-xs text-muted-foreground">
              {formData.participants.length > 0
                ? formData.participants
                    .slice(0, 2)
                    .map((p) => p.name)
                    .join(", ") +
                  (formData.participants.length > 2
                    ? ` +${formData.participants.length - 2} lainnya`
                    : "")
                : "Belum ada peserta"}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <RefreshCw className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium">
              {
                recurringOptions.find((opt) => opt.value === formData.recurring)
                  ?.label
              }
            </div>
            <div className="text-xs text-muted-foreground">
              Pengaturan pengulangan meeting
            </div>
          </div>
        </div>

        {formData.agenda.filter((item) => item.trim()).length > 0 && (
          <div className="flex items-start space-x-3">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">
                {formData.agenda.filter((item) => item.trim()).length} Agenda
                Item
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                {formData.agenda
                  .filter((item) => item.trim())
                  .slice(0, 2)
                  .map((item, index) => (
                    <div key={index} className="truncate">
                      • {item}
                    </div>
                  ))}
                {formData.agenda.filter((item) => item.trim()).length > 2 && (
                  <div>
                    • +
                    {formData.agenda.filter((item) => item.trim()).length - 2}{" "}
                    lainnya
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MeetingSummary;
