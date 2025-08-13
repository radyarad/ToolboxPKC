import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  QrCode,
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  CheckCircle,
} from "lucide-react";
import type { Meeting } from "@/lib/attendance/meetingTypes";
import { StatusBadge, TypeBadge, OnlineBadge } from "./meetingBadges";
import { QRCodeDisplay } from "./QrCodeDisplay";
import {
  formatDate,
  acceptedParticipants,
  createShareData,
} from "@/lib/attendance/meetingHelpers";

interface MeetingCardProps {
  meeting: Meeting;
}

export const MeetingCard = ({ meeting }: MeetingCardProps) => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleShareQR = async (meeting: Meeting) => {
    const shareData = createShareData(meeting);

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        setCopiedId(meeting.id);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-primary">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold mb-2">
              {meeting.title}
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground line-clamp-2">
              {meeting.description}
            </CardDescription>
          </div>
          <StatusBadge status={meeting.status} />
        </div>
        <div className="flex items-center gap-2 mt-3">
          <TypeBadge type={meeting.type} />
          {meeting.isOnline && <OnlineBadge />}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Meeting Details */}
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar size={16} className="mr-2 text-blue-500" />
            <span>{formatDate(meeting.date)}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Clock size={16} className="mr-2 text-blue-500" />
            <span>
              {meeting.startTime} - {meeting.endTime}
            </span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin size={16} className="mr-2 text-blue-500" />
            <span className="truncate">{meeting.location}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Users size={16} className="mr-2 text-blue-500" />
            <span>
              {acceptedParticipants(meeting.participants)} peserta terkonfirmasi
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="flex-1">
                <QrCode size={16} className="mr-2" />
                Generate QR
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-center">
                  QR Code Absensi
                </DialogTitle>
                <DialogDescription className="text-center">
                  {meeting.title}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <QRCodeDisplay meeting={meeting} />

                <div className="text-center space-y-2">
                  <div className="text-sm text-muted-foreground">
                    <p>
                      <strong>Tanggal:</strong> {formatDate(meeting.date)}
                    </p>
                    <p>
                      <strong>Waktu:</strong> {meeting.startTime} -{" "}
                      {meeting.endTime}
                    </p>
                    <p>
                      <strong>Lokasi:</strong> {meeting.location}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => handleShareQR(meeting)}
                  >
                    {copiedId === meeting.id ? (
                      <>
                        <CheckCircle
                          size={16}
                          className="mr-2 text-green-600"
                        />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Share2 size={16} className="mr-2" />
                        Share QR Code
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShareQR(meeting)}
          >
            <Share2 size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
