"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ArrowLeft,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
  ExternalLink,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Types
type Participant = {
  name: string;
  email: string;
  status: "accepted" | "pending" | "declined";
};

type ActionItem = {
  id: number;
  task: string;
  assignee: string;
  dueDate: string;
  status: "pending" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
};

type MeetingNotes = {
  id: number;
  timestamp: string;
  content: string;
  author: string;
  type: "note" | "decision" | "action" | "discussion";
};

type Meeting = {
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
  meetingNotes: MeetingNotes[];
  actionItems: ActionItem[];
  isCompleted: boolean;
  hasUnfinishedBusiness: boolean;
  nextSteps: string[];
  decisions: string[];
};

// Sample detailed meeting data
const sampleMeeting: Meeting = {
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
  isCompleted: true,
  hasUnfinishedBusiness: true,
  meetingNotes: [
    {
      id: 1,
      timestamp: "09:05",
      content:
        "Ahmad melaporkan bahwa fitur authentication sudah 80% selesai, masih ada issue dengan password validation yang perlu diperbaiki minggu depan.",
      author: "Sarah Kusuma",
      type: "note",
    },
    {
      id: 2,
      timestamp: "09:12",
      content:
        "Tim sepakat untuk menggunakan library Joi untuk validation, akan diimplementasikan oleh Ahmad dengan deadline Jumat.",
      author: "Sarah Kusuma",
      type: "decision",
    },
    {
      id: 3,
      timestamp: "09:18",
      content:
        "Budi mengalami blocker pada integrasi payment gateway, memerlukan bantuan dari tim backend.",
      author: "Sarah Kusuma",
      type: "discussion",
    },
    {
      id: 4,
      timestamp: "09:25",
      content:
        "Dewi akan membantu Budi dengan payment gateway integration, target selesai Kamis.",
      author: "Sarah Kusuma",
      type: "action",
    },
  ],
  actionItems: [
    {
      id: 1,
      task: "Perbaiki issue password validation pada fitur authentication",
      assignee: "Ahmad Rahman",
      dueDate: "2025-08-08",
      status: "in-progress",
      priority: "high",
    },
    {
      id: 2,
      task: "Implement library Joi untuk validation",
      assignee: "Ahmad Rahman",
      dueDate: "2025-08-09",
      status: "pending",
      priority: "medium",
    },
    {
      id: 3,
      task: "Bantu Budi dengan payment gateway integration",
      assignee: "Dewi Lestari",
      dueDate: "2025-08-07",
      status: "in-progress",
      priority: "high",
    },
  ],
  nextSteps: [
    "Follow up progress authentication module di standup besok",
    "Review payment gateway integration setelah selesai",
    "Siapkan demo untuk client meeting minggu depan",
  ],
  decisions: [
    "Menggunakan library Joi untuk validation",
    "Dewi akan membantu Budi dengan payment gateway",
    "Demo authentication akan ditunda sampai issue selesai",
  ],
};

// Helper functions
function getTypeBadgeVariant(
  type: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (type) {
    case "important":
      return "destructive";
    case "recurring":
      return "default";
    case "technical":
      return "secondary";
    case "event":
      return "outline";
    default:
      return "secondary";
  }
}

function getStatusBadgeVariant(
  status: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "confirmed":
      return "default";
    case "tentative":
      return "outline";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
}

function getPriorityBadgeVariant(
  priority: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "outline";
    case "low":
      return "secondary";
    default:
      return "secondary";
  }
}

function getActionStatusBadgeVariant(
  status: string
): "default" | "destructive" | "outline" | "secondary" {
  switch (status) {
    case "completed":
      return "default";
    case "in-progress":
      return "outline";
    case "pending":
      return "secondary";
    default:
      return "secondary";
  }
}

function getNoteTypeIcon(type: string) {
  switch (type) {
    case "decision":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "action":
      return <AlertCircle className="h-4 w-4 text-orange-500" />;
    case "discussion":
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    default:
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(time: string) {
  return time.slice(0, 5);
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Main component
export default function MeetingDetailPage() {
  const [meeting] = useState<Meeting>(sampleMeeting);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [editingActionId, setEditingActionId] = useState<number | null>(null);

  const handleBackClick = () => {
    alert(
      "Navigating back to meeting list\n\nIn a real app, this would use router.back() or router.push('/meetings')"
    );
  };

  const handleSaveNote = () => {
    if (newNote.trim()) {
      // In real app, this would save to backend
      alert(`Note saved: ${newNote}`);
      setNewNote("");
      setIsEditingNotes(false);
    }
  };

  const handleActionStatusUpdate = (actionId: number, newStatus: string) => {
    // In real app, this would update the backend
    alert(`Action item ${actionId} status updated to: ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h1 className="text-3xl font-bold tracking-tight">
                {meeting.title}
              </h1>
              <Badge variant={getTypeBadgeVariant(meeting.type)}>
                {meeting.type}
              </Badge>
              <Badge variant={getStatusBadgeVariant(meeting.status)}>
                {meeting.status}
              </Badge>
              {meeting.isCompleted && (
                <Badge
                  variant="default"
                  className="bg-green-100 text-green-800"
                >
                  Completed
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{meeting.description}</p>
          </div>
        </div>

        {/* Unfinished Business Alert */}
        {meeting.hasUnfinishedBusiness && meeting.isCompleted && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <div className="font-medium text-orange-800">
                    Pembahasan Belum Selesai
                  </div>
                  <div className="text-sm text-orange-700 mt-1">
                    Meeting ini telah selesai, tetapi masih ada beberapa hal
                    yang perlu ditindaklanjuti. Silakan lihat action items dan
                    next steps di bawah.
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Meeting Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Informasi Meeting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Tanggal</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(meeting.date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Waktu</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(meeting.startTime)} -{" "}
                        {formatTime(meeting.endTime)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {meeting.isOnline ? (
                      <Video className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div>
                      <div className="text-sm font-medium">Lokasi</div>
                      <div className="text-sm text-muted-foreground">
                        {meeting.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Organizer</div>
                      <div className="text-sm text-muted-foreground">
                        {meeting.organizer}
                      </div>
                    </div>
                  </div>
                </div>

                {meeting.meetingLink && (
                  <div className="flex items-center gap-3 pt-2 border-t">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Meeting Link</div>
                      <a
                        href={meeting.meetingLink}
                        className="text-sm text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {meeting.meetingLink}
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Meeting Notes - Main Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Notulensi Meeting
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingNotes(!isEditingNotes)}
                  >
                    {isEditingNotes ? (
                      <>
                        <X className="h-4 w-4 mr-2" />
                        Batal
                      </>
                    ) : (
                      <>
                        <Edit className="h-4 w-4 mr-2" />
                        Tambah Catatan
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add Note Form */}
                {isEditingNotes && (
                  <div className="space-y-3 p-4 border rounded-lg bg-muted/50">
                    <Textarea
                      placeholder="Tulis catatan meeting..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={3}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleSaveNote}>
                        <Save className="h-4 w-4 mr-2" />
                        Simpan
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditingNotes(false)}
                      >
                        Batal
                      </Button>
                    </div>
                  </div>
                )}

                {/* Meeting Notes List */}
                <div className="space-y-4">
                  {meeting.meetingNotes.map((note) => (
                    <div
                      key={note.id}
                      className="flex gap-3 p-4 border rounded-lg"
                    >
                      <div className="flex-shrink-0">
                        {getNoteTypeIcon(note.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-medium">
                            {note.timestamp}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {note.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            by {note.author}
                          </span>
                        </div>
                        <p className="text-sm">{note.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Action Items
                </CardTitle>
                <CardDescription>
                  Tugas-tugas yang harus diselesaikan setelah meeting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meeting.actionItems.map((action) => (
                    <div
                      key={action.id}
                      className="flex items-start gap-3 p-3 border rounded-lg"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium">{action.task}</p>
                          <div className="flex gap-1 flex-shrink-0">
                            <Badge
                              variant={getPriorityBadgeVariant(action.priority)}
                              className="text-xs"
                            >
                              {action.priority}
                            </Badge>
                            <Badge
                              variant={getActionStatusBadgeVariant(
                                action.status
                              )}
                              className="text-xs"
                            >
                              {action.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Assignee: {action.assignee}</span>
                          <span>Due: {formatDate(action.dueDate)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Decisions */}
            {meeting.decisions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Keputusan Meeting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {meeting.decisions.map((decision, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{decision}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            {meeting.nextSteps.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowLeft className="h-5 w-5 rotate-180" />
                    Next Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {meeting.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <p className="text-sm">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Participants */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Peserta ({meeting.participants.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {meeting.participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(participant.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">
                          {participant.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {participant.email}
                        </div>
                      </div>
                      <Badge
                        variant={
                          participant.status === "accepted"
                            ? "default"
                            : participant.status === "declined"
                            ? "destructive"
                            : "outline"
                        }
                        className="text-xs"
                      >
                        {participant.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Agenda */}
            <Card>
              <CardHeader>
                <CardTitle>Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {meeting.agenda.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <span className="text-sm font-medium text-primary mt-1">
                        {index + 1}.
                      </span>
                      <p className="text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Meeting
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Notes
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Summary
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
