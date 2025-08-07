export type Participant = {
  name: string;
  email: string;
  status: "accepted" | "pending" | "declined";
};

export type Meeting = {
  id: number;
  title: string;
  description: string;
  date: string; // ISO format
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  isOnline: boolean;
  organizer: string;
  participants: Participant[];
  agenda: string[];
  status: string;
  meetingLink: string;
  recurring: string;
  notes: string;
};

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
  {
    id: 2,
    title: "Client Presentation - Q3 Report",
    description: "Presentasi laporan quarterly kepada klien utama",
    date: "2025-08-01",
    startTime: "14:00",
    endTime: "15:30",
    type: "important",
    location: "Zoom Meeting",
    isOnline: true,
    organizer: "Fitri Maharani",
    participants: [
      {
        name: "Sarah Kusuma",
        email: "sarah.kusuma@pkc.com",
        status: "accepted",
      },
      {
        name: "Ahmad Rahman",
        email: "ahmad.rahman@pkc.com",
        status: "accepted",
      },
      {
        name: "External Client",
        email: "client@company.com",
        status: "pending",
      },
    ],
    agenda: [
      "Opening dan welcome",
      "Presentasi hasil Q3",
      "Q&A session",
      "Next steps planning",
    ],
    status: "confirmed",
    meetingLink: "https://zoom.us/j/123456789",
    recurring: "none",
    notes: "Siapkan slide presentasi dan demo produk",
  },
  {
    id: 3,
    title: "Team Building Workshop",
    description: "Workshop team building untuk meningkatkan kolaborasi tim",
    date: "2025-08-02",
    startTime: "13:00",
    endTime: "17:00",
    type: "event",
    location: "Aula Lantai 3",
    isOnline: false,
    organizer: "HR Team",
    participants: [
      { name: "All Team Members", email: "all@pkc.com", status: "pending" },
    ],
    agenda: [
      "Ice breaking activities",
      "Team collaboration games",
      "Sharing session",
      "Closing dan evaluasi",
    ],
    status: "tentative",
    meetingLink: "",
    recurring: "none",
    notes: "Dress code: casual, bawa sepatu olahraga",
  },
  {
    id: 4,
    title: "Code Review Session",
    description: "Review kode untuk fitur authentication baru",
    date: "2025-08-05",
    startTime: "10:00",
    endTime: "11:00",
    type: "technical",
    location: "Meeting Room B",
    isOnline: false,
    organizer: "Ahmad Rahman",
    participants: [
      {
        name: "Sarah Kusuma",
        email: "sarah.kusuma@pkc.com",
        status: "accepted",
      },
      {
        name: "Budi Santoso",
        email: "budi.santoso@pkc.com",
        status: "accepted",
      },
      {
        name: "Eko Prasetyo",
        email: "eko.prasetyo@pkc.com",
        status: "pending",
      },
    ],
    agenda: [
      "Review authentication module",
      "Security check",
      "Performance optimization",
      "Testing strategy",
    ],
    status: "confirmed",
    meetingLink: "",
    recurring: "weekly",
    notes: "Prepare local development environment",
  },
];

// Helper
export function getDaysInMonth(date: Date): (Date | null)[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day));
  }
  return days;
}

export function getTypeColor(type: string) {
  switch (type) {
    case "important":
      return "bg-red-100 dark:bg-red-400/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-400/20";
    case "recurring":
      return "bg-blue-100 dark:bg-blue-400/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-400/20";
    case "technical":
      return "bg-purple-100 dark:bg-purple-400/20 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-400/20";
    case "event":
      return "bg-green-100 dark:bg-green-400/20 text-green-700 dark:text-green-400 border-green-200 dark:border-green-400/20";
    default:
      return "bg-gray-100 dark:bg-gray-400/20 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-gray-400/20";
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-700";
    case "tentative":
      return "bg-yellow-100 text-yellow-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}
