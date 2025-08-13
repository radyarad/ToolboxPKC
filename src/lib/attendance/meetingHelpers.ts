import type { Participant, Meeting } from "@/lib/attendance/meetingTypes";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const acceptedParticipants = (participants: Participant[]): number => {
  return participants.filter((p) => p.status === "accepted").length;
};

export const generateQRData = (meeting: Meeting): string => {
  return `pkc-attendance:${meeting.id}:${meeting.title}:${meeting.date}:${meeting.startTime}`;
};

export const createShareData = (meeting: Meeting) => {
  return {
    title: `QR Code Absensi - ${meeting.title}`,
    text: `Scan QR code untuk absensi meeting: ${
      meeting.title
    }\nTanggal: ${formatDate(meeting.date)}\nWaktu: ${meeting.startTime} - ${
      meeting.endTime
    }`,
    url: `${window.location.origin}/attendance/qr/${meeting.id}`,
  };
};
