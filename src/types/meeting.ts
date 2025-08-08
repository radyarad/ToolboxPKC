// src/types/meeting.ts

export interface Contact {
  name: string;
  email: string;
  department?: string;
}

export interface Participant extends Contact {
  status?: string; // status boleh kosong
}

export interface FormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  type: string;
  location: string;
  isOnline: boolean;
  meetingLink: string;
  recurring: string;
  notes: string;
  agenda: string[];
  participants: Participant[];
  priority: string;
  reminder: string;
  timezone: string;
  isPrivate: boolean;
  allowRecording: boolean;
  requirePassword: boolean;
  meetingPassword: string;
  waitingRoom: boolean;
}
