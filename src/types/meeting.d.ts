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
