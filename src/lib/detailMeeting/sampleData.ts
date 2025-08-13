// /lib/detailMeeting/sampleData.ts
import type { Meeting, MeetingMinutes } from "./types";

export const DataMeetings: Meeting[] = [
  {
    id: 1,
    title: "Standup Meeting Tim Development",
    description: "Daily standup meeting untuk sync progress tim development",
    date: "2025-08-01",
    startTime: "09:00",
    endTime: "09:30",
    type: "recurring",
    location: "Meeting Room A",
    isOnline: false,
    organizer: "Sarah Kusuma",
    participants: [
      {
        name: "Ahmad Rahman",
        email: "ahmad.rahman@pkc.com",
        status: "accepted",
      },
      {
        name: "Budi Santoso",
        email: "budi.santoso@pkc.com",
        status: "pending",
      },
      {
        name: "Dewi Lestari",
        email: "dewi.lestari@pkc.com",
        status: "accepted",
      },
    ],
    agenda: [
      "Progress update dari setiap anggota tim",
      "Diskusi blocker dan challenge",
      "Planning task untuk hari ini",
    ],
    status: "confirmed",
    meetingLink: "",
    recurring: "daily",
    notes: "Jangan lupa bawa laptop untuk demo",
  },
  // Tambah meeting lain jika perlu
];

export const SampleMeetingMinutes: MeetingMinutes = {
  meetingId: 1,
  attendees: ["Sarah Kusuma", "Ahmad Rahman", "Dewi Lestari"],
  absentees: ["Budi Santoso"],
  agendaItems: [
    {
      id: 1,
      title: "Progress update dari setiap anggota tim",
      discussed: true,
      completed: true,
      notes:
        "Ahmad: Completed authentication module. Dewi: Working on UI components, 80% done. Sarah: Code review pending.",
    },
    {
      id: 2,
      title: "Diskusi blocker dan challenge",
      discussed: true,
      completed: false,
      notes:
        "Database connection issue masih belum resolved. Perlu diskusi dengan Infrastructure team.",
    },
    {
      id: 3,
      title: "Planning task untuk hari ini",
      discussed: true,
      completed: true,
      notes:
        "Task assignments sudah dibagi. Priority pada bug fixing dan testing.",
    },
  ],
  decisions: [
    {
      id: 1,
      title: "Extend deadline untuk authentication module",
      description:
        "Deadline diperpanjang 2 hari karena complexity yang lebih tinggi dari perkiraan",
      decidedBy: "Sarah Kusuma",
    },
    {
      id: 2,
      title: "Meeting dengan Infrastructure team",
      description: "Scheduled meeting untuk resolve database connection issues",
      decidedBy: "Ahmad Rahman",
    },
  ],
  actionItems: [
    {
      id: 1,
      task: "Setup meeting dengan Infrastructure team",
      assignedTo: "Ahmad Rahman",
      dueDate: "2025-08-02",
      status: "pending",
    },
    {
      id: 2,
      task: "Complete UI components testing",
      assignedTo: "Dewi Lestari",
      dueDate: "2025-08-03",
      status: "in-progress",
    },
    {
      id: 3,
      task: "Review dan merge authentication PR",
      assignedTo: "Sarah Kusuma",
      dueDate: "2025-08-02",
      status: "completed",
    },
  ],
  nextMeetingDate: "2025-08-02",
  additionalNotes:
    "Database issue perlu immediate attention. Consider backup plan jika tidak resolved dalam 2 hari.",
  createdAt: "2025-08-01T09:35:00",
  lastModified: "2025-08-01T10:15:00",
};
