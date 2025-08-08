// src/types/team/type.ts
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  role: string;
  location: string;
  avatar?: string;
  status: string;
  joinDate?: string;
  lastActive?: string;
  tasksCompleted?: number;
  tasksInProgress?: number;
  meetingsAttended?: number;
  skills?: string[];
}
