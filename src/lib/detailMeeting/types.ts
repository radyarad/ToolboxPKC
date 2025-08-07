export type Participant = {
  name: string;
  email: string;
  status: "accepted" | "pending" | "declined";
};

export type Meeting = {
  id: number;
  title: string;
  description: string;
  date: string;
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

export type AgendaItem = {
  id: number;
  title: string;
  discussed: boolean;
  completed: boolean;
  notes: string;
};

export type Decision = {
  id: number;
  title: string;
  description: string;
  decidedBy: string;
};

export type ActionItem = {
  id: number;
  task: string;
  assignedTo: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
};

export type MeetingMinutes = {
  meetingId: number;
  attendees: string[];
  absentees: string[];
  agendaItems: AgendaItem[];
  decisions: Decision[];
  actionItems: ActionItem[];
  nextMeetingDate: string;
  additionalNotes: string;
  createdAt: string;
  lastModified: string;
};
