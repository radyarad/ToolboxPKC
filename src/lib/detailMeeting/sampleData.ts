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
  {
    id: 2,
    title: "Sprint Planning Q3",
    description: "Planning meeting untuk sprint development quarter 3",
    date: "2025-08-05",
    startTime: "13:00",
    endTime: "15:30",
    type: "planning",
    location: "Conference Room B",
    isOnline: true,
    organizer: "Rina Maharani",
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
        name: "Budi Santoso",
        email: "budi.santoso@pkc.com",
        status: "accepted",
      },
      {
        name: "Dewi Lestari",
        email: "dewi.lestari@pkc.com",
        status: "declined",
      },
      {
        name: "Indra Wijaya",
        email: "indra.wijaya@pkc.com",
        status: "pending",
      },
    ],
    agenda: [
      "Review hasil sprint sebelumnya",
      "Prioritas fitur untuk Q3",
      "Estimasi story points",
      "Resource allocation dan timeline",
    ],
    status: "confirmed",
    meetingLink: "https://zoom.us/j/1234567890",
    recurring: "none",
    notes: "Siapkan data velocity tim dari sprint terakhir",
  },
  {
    id: 3,
    title: "Client Presentation - Mobile App Demo",
    description:
      "Presentasi demo aplikasi mobile kepada klien PT. Mitra Sejahtera",
    date: "2025-08-08",
    startTime: "10:00",
    endTime: "11:30",
    type: "presentation",
    location: "Client Office",
    isOnline: false,
    organizer: "Fajar Nugroho",
    participants: [
      {
        name: "Sarah Kusuma",
        email: "sarah.kusuma@pkc.com",
        status: "accepted",
      },
      {
        name: "Dewi Lestari",
        email: "dewi.lestari@pkc.com",
        status: "accepted",
      },
      {
        name: "Rudi Hartono",
        email: "rudi.hartono@pkc.com",
        status: "accepted",
      },
      {
        name: "Lisa Andriani",
        email: "lisa.andriani@pkc.com",
        status: "accepted",
      },
    ],
    agenda: [
      "Opening dan perkenalan tim",
      "Demo fitur utama aplikasi",
      "User experience walkthrough",
      "Q&A session dengan klien",
      "Next steps dan timeline deployment",
    ],
    status: "confirmed",
    meetingLink: "",
    recurring: "none",
    notes:
      "Bawa laptop backup dan pastikan demo data sudah ready. Meeting di lantai 15 gedung klien.",
  },
  {
    id: 4,
    title: "Technical Review - Security Audit",
    description: "Review hasil security audit dan diskusi improvement plan",
    date: "2025-08-12",
    startTime: "14:00",
    endTime: "16:00",
    type: "review",
    location: "Meeting Room C",
    isOnline: true,
    organizer: "Bambang Sutrisno",
    participants: [
      {
        name: "Ahmad Rahman",
        email: "ahmad.rahman@pkc.com",
        status: "accepted",
      },
      {
        name: "Sari Wulandari",
        email: "sari.wulandari@pkc.com",
        status: "accepted",
      },
      {
        name: "Teguh Prasetyo",
        email: "teguh.prasetyo@pkc.com",
        status: "pending",
      },
      {
        name: "Maya Siska",
        email: "maya.siska@pkc.com",
        status: "accepted",
      },
      {
        name: "Doni Setiawan",
        email: "doni.setiawan@pkc.com",
        status: "accepted",
      },
    ],
    agenda: [
      "Presentasi hasil security audit",
      "Identifikasi vulnerability yang ditemukan",
      "Diskusi severity level dan prioritas",
      "Action plan untuk remediation",
      "Timeline implementation security fixes",
    ],
    status: "confirmed",
    meetingLink:
      "https://teams.microsoft.com/l/meetup-join/19%3ameeting_abc123",
    recurring: "none",
    notes:
      "Confidential meeting - pastikan semua dokumentasi security sudah di-encrypt",
  },
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

// Meeting Minutes untuk ID 2
export const MeetingMinutes2: MeetingMinutes = {
  meetingId: 2,
  attendees: ["Rina Maharani", "Sarah Kusuma", "Ahmad Rahman", "Budi Santoso"],
  absentees: ["Dewi Lestari", "Indra Wijaya"],
  agendaItems: [
    {
      id: 1,
      title: "Review hasil sprint sebelumnya",
      discussed: true,
      completed: true,
      notes:
        "Sprint velocity: 45 story points. 8 dari 10 user stories completed. Performance improvement 25%.",
    },
    {
      id: 2,
      title: "Prioritas fitur untuk Q3",
      discussed: true,
      completed: true,
      notes:
        "Priority: 1) Payment gateway integration, 2) Push notifications, 3) Offline mode support.",
    },
    {
      id: 3,
      title: "Estimasi story points",
      discussed: true,
      completed: false,
      notes:
        "Payment gateway: 21 points, Push notifications: 13 points. Offline mode butuh research lebih lanjut.",
    },
    {
      id: 4,
      title: "Resource allocation dan timeline",
      discussed: false,
      completed: false,
      notes:
        "Ditunda karena Indra belum hadir untuk input dari Infrastructure side.",
    },
  ],
  decisions: [
    {
      id: 1,
      title: "Focus pada Payment Gateway sebagai priority utama",
      description:
        "Tim akan fokus complete payment integration sebelum fitur lain",
      decidedBy: "Rina Maharani",
    },
    {
      id: 2,
      title: "Research spike untuk Offline mode",
      description:
        "Allocated 1 sprint untuk research technical feasibility offline mode",
      decidedBy: "Sarah Kusuma",
    },
  ],
  actionItems: [
    {
      id: 1,
      task: "Research payment gateway options (Midtrans, Xendit)",
      assignedTo: "Ahmad Rahman",
      dueDate: "2025-08-08",
      status: "pending",
    },
    {
      id: 2,
      task: "Design push notification architecture",
      assignedTo: "Budi Santoso",
      dueDate: "2025-08-10",
      status: "pending",
    },
    {
      id: 3,
      task: "Schedule follow-up planning meeting dengan Indra",
      assignedTo: "Rina Maharani",
      dueDate: "2025-08-06",
      status: "pending",
    },
  ],
  nextMeetingDate: "2025-08-07",
  additionalNotes:
    "Perlu konfirmasi budget untuk payment gateway fees dengan Finance team.",
  createdAt: "2025-08-05T15:45:00",
  lastModified: "2025-08-05T16:00:00",
};

// Meeting Minutes untuk ID 3
export const MeetingMinutes3: MeetingMinutes = {
  meetingId: 3,
  attendees: [
    "Fajar Nugroho",
    "Sarah Kusuma",
    "Dewi Lestari",
    "Rudi Hartono",
    "Lisa Andriani",
  ],
  absentees: [],
  agendaItems: [
    {
      id: 1,
      title: "Opening dan perkenalan tim",
      discussed: true,
      completed: true,
      notes:
        "Perkenalan successful. Client impressed dengan portfolio tim dan pengalaman previous projects.",
    },
    {
      id: 2,
      title: "Demo fitur utama aplikasi",
      discussed: true,
      completed: true,
      notes:
        "Demo berjalan lancar. Client sangat tertarik dengan real-time analytics dan reporting features.",
    },
    {
      id: 3,
      title: "User experience walkthrough",
      discussed: true,
      completed: true,
      notes:
        "UX flow mendapat positive feedback. Client request minor UI adjustments untuk branding consistency.",
    },
    {
      id: 4,
      title: "Q&A session dengan klien",
      discussed: true,
      completed: true,
      notes:
        "Pertanyaan fokus pada scalability, security, dan maintenance. Semua concerns berhasil di-address.",
    },
    {
      id: 5,
      title: "Next steps dan timeline deployment",
      discussed: true,
      completed: true,
      notes:
        "Agreed pada soft launch mid-August, full deployment end of August. Training schedule confirmed.",
    },
  ],
  decisions: [
    {
      id: 1,
      title: "Proceed dengan development contract",
      description:
        "Client approve untuk lanjut ke tahap development dengan minor UI changes",
      decidedBy: "Client - Pak Susanto",
    },
    {
      id: 2,
      title: "Training schedule untuk user",
      description:
        "2 sesi training: admin users (Aug 20) dan end users (Aug 25)",
      decidedBy: "Fajar Nugroho",
    },
  ],
  actionItems: [
    {
      id: 1,
      task: "Implement UI branding adjustments",
      assignedTo: "Dewi Lestari",
      dueDate: "2025-08-12",
      status: "pending",
    },
    {
      id: 2,
      task: "Prepare user manual dan training materials",
      assignedTo: "Lisa Andriani",
      dueDate: "2025-08-18",
      status: "pending",
    },
    {
      id: 3,
      task: "Setup production environment",
      assignedTo: "Rudi Hartono",
      dueDate: "2025-08-15",
      status: "pending",
    },
    {
      id: 4,
      task: "Send contract amendment untuk UI changes",
      assignedTo: "Fajar Nugroho",
      dueDate: "2025-08-09",
      status: "pending",
    },
  ],
  nextMeetingDate: "2025-08-15",
  additionalNotes:
    "Client sangat satisfied dengan demo. Potential untuk additional features di fase 2. Maintain good relationship untuk future projects.",
  createdAt: "2025-08-08T11:45:00",
  lastModified: "2025-08-08T12:00:00",
};

// Meeting Minutes untuk ID 4
export const MeetingMinutes4: MeetingMinutes = {
  meetingId: 4,
  attendees: [
    "Bambang Sutrisno",
    "Ahmad Rahman",
    "Sari Wulandari",
    "Maya Siska",
    "Doni Setiawan",
  ],
  absentees: ["Teguh Prasetyo"],
  agendaItems: [
    {
      id: 1,
      title: "Presentasi hasil security audit",
      discussed: true,
      completed: true,
      notes:
        "Audit menemukan 12 vulnerabilities: 2 high, 5 medium, 5 low severity. Overall security posture cukup baik.",
    },
    {
      id: 2,
      title: "Identifikasi vulnerability yang ditemukan",
      discussed: true,
      completed: true,
      notes:
        "High: SQL injection potential, Unencrypted API endpoints. Medium: CSRF, XSS, Weak password policy, outdated dependencies.",
    },
    {
      id: 3,
      title: "Diskusi severity level dan prioritas",
      discussed: true,
      completed: true,
      notes:
        "Agreed priority: High severity fixes dalam 1 minggu, Medium dalam 2 minggu, Low dalam 1 bulan.",
    },
    {
      id: 4,
      title: "Action plan untuk remediation",
      discussed: true,
      completed: false,
      notes:
        "Plan dibuat untuk high dan medium severity. Low severity plan butuh input dari Teguh untuk infrastructure impact.",
    },
    {
      id: 5,
      title: "Timeline implementation security fixes",
      discussed: true,
      completed: true,
      notes:
        "Target completion: High (Aug 19), Medium (Aug 26), Low (Sep 12). Security testing scheduled after each phase.",
    },
  ],
  decisions: [
    {
      id: 1,
      title: "Immediate patch untuk SQL injection vulnerability",
      description:
        "Critical fix harus di-deploy dalam 48 jam untuk prevent potential data breach",
      decidedBy: "Bambang Sutrisno",
    },
    {
      id: 2,
      title: "Implement security code review process",
      description:
        "Mandatory security review untuk semua PR starting immediately",
      decidedBy: "Sari Wulandari",
    },
    {
      id: 3,
      title: "Monthly security audit going forward",
      description:
        "Schedule regular security assessment every month untuk maintain security posture",
      decidedBy: "Maya Siska",
    },
  ],
  actionItems: [
    {
      id: 1,
      task: "Fix SQL injection vulnerability di user authentication",
      assignedTo: "Ahmad Rahman",
      dueDate: "2025-08-14",
      status: "pending",
    },
    {
      id: 2,
      task: "Implement HTTPS untuk semua API endpoints",
      assignedTo: "Doni Setiawan",
      dueDate: "2025-08-16",
      status: "pending",
    },
    {
      id: 3,
      task: "Update dependencies yang vulnerable",
      assignedTo: "Sari Wulandari",
      dueDate: "2025-08-20",
      status: "pending",
    },
    {
      id: 4,
      task: "Setup automated security scanning tools",
      assignedTo: "Maya Siska",
      dueDate: "2025-08-25",
      status: "pending",
    },
    {
      id: 5,
      task: "Create security guidelines document",
      assignedTo: "Bambang Sutrisno",
      dueDate: "2025-08-22",
      status: "pending",
    },
  ],
  nextMeetingDate: "2025-08-19",
  additionalNotes:
    "Security adalah top priority. Semua development work di-pause sampai critical vulnerabilities fixed. Inform management tentang potential security risks.",
  createdAt: "2025-08-12T16:15:00",
  lastModified: "2025-08-12T16:30:00",
};
