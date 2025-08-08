"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  Plus,
  Trash2,
  Save,
  X,
  Users,
  ClipboardList,
  CheckSquare,
  FileText,
  Calendar,
} from "lucide-react";

// Import types dari file yang sudah ada
import type {
  Meeting,
  MeetingMinutes,
  AgendaItem,
  Decision,
  ActionItem,
} from "@/lib/detailMeeting/types";

interface EditNotulensDialogProps {
  meeting: Meeting;
  minutes: MeetingMinutes;
  onSave: (updatedMinutes: MeetingMinutes) => void;
}

export default function EditNotulensDialog({
  meeting,
  minutes: initialMinutes,
  onSave,
}: EditNotulensDialogProps) {
  const [open, setOpen] = useState(false);
  const [minutes, setMinutes] = useState<MeetingMinutes>(initialMinutes);
  const [newAttendee, setNewAttendee] = useState("");
  const [newAbsentee, setNewAbsentee] = useState("");

  // Handler untuk reset form ketika dialog dibuka
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setMinutes(initialMinutes);
      setNewAttendee("");
      setNewAbsentee("");
    }
  };

  // Handlers untuk kehadiran
  const addAttendee = () => {
    if (newAttendee.trim() && !minutes.attendees.includes(newAttendee.trim())) {
      setMinutes((prev) => ({
        ...prev,
        attendees: [...prev.attendees, newAttendee.trim()],
      }));
      setNewAttendee("");
    }
  };

  const removeAttendee = (name: string) => {
    setMinutes((prev) => ({
      ...prev,
      attendees: prev.attendees.filter((a) => a !== name),
    }));
  };

  const addAbsentee = () => {
    if (newAbsentee.trim() && !minutes.absentees.includes(newAbsentee.trim())) {
      setMinutes((prev) => ({
        ...prev,
        absentees: [...prev.absentees, newAbsentee.trim()],
      }));
      setNewAbsentee("");
    }
  };

  const removeAbsentee = (name: string) => {
    setMinutes((prev) => ({
      ...prev,
      absentees: prev.absentees.filter((a) => a !== name),
    }));
  };

  // Handlers untuk agenda items
  const updateAgendaItem = (
    id: number,
    field: keyof AgendaItem,
    value: any
  ) => {
    setMinutes((prev) => ({
      ...prev,
      agendaItems: prev.agendaItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Handlers untuk decisions
  const addDecision = () => {
    const newId = Math.max(...minutes.decisions.map((d) => d.id), 0) + 1;
    setMinutes((prev) => ({
      ...prev,
      decisions: [
        ...prev.decisions,
        {
          id: newId,
          title: "",
          description: "",
          decidedBy: "",
        },
      ],
    }));
  };

  const updateDecision = (id: number, field: keyof Decision, value: string) => {
    setMinutes((prev) => ({
      ...prev,
      decisions: prev.decisions.map((decision) =>
        decision.id === id ? { ...decision, [field]: value } : decision
      ),
    }));
  };

  const removeDecision = (id: number) => {
    setMinutes((prev) => ({
      ...prev,
      decisions: prev.decisions.filter((d) => d.id !== id),
    }));
  };

  // Handlers untuk action items
  const addActionItem = () => {
    const newId = Math.max(...minutes.actionItems.map((a) => a.id), 0) + 1;
    setMinutes((prev) => ({
      ...prev,
      actionItems: [
        ...prev.actionItems,
        {
          id: newId,
          task: "",
          assignedTo: "",
          dueDate: "",
          status: "pending",
        },
      ],
    }));
  };

  const updateActionItem = (
    id: number,
    field: keyof ActionItem,
    value: any
  ) => {
    setMinutes((prev) => ({
      ...prev,
      actionItems: prev.actionItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const removeActionItem = (id: number) => {
    setMinutes((prev) => ({
      ...prev,
      actionItems: prev.actionItems.filter((a) => a.id !== id),
    }));
  };

  const handleSave = () => {
    // Update lastModified timestamp
    const updatedMinutes: MeetingMinutes = {
      ...minutes,
      lastModified: new Date().toISOString(),
    };

    onSave(updatedMinutes);
    setOpen(false);
  };

  const getStatusBadgeVariant = (
    status: ActionItem["status"]
  ): "default" | "secondary" | "outline" => {
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
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Notulensi
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[80%] max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Notulensi - {meeting.title}
          </DialogTitle>
          <DialogDescription>
            Edit dan kelola notulensi meeting. Klik simpan untuk menyimpan
            perubahan.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="attendance" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="attendance" className="gap-2 text-xs">
              <Users className="h-4 w-4" />
              Kehadiran
            </TabsTrigger>
            <TabsTrigger value="agenda" className="gap-2 text-xs">
              <ClipboardList className="h-4 w-4" />
              Agenda
            </TabsTrigger>
            <TabsTrigger value="decisions" className="gap-2 text-xs">
              <FileText className="h-4 w-4" />
              Keputusan
            </TabsTrigger>
            <TabsTrigger value="actions" className="gap-2 text-xs">
              <CheckSquare className="h-4 w-4" />
              Action Items
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2 text-xs">
              <FileText className="h-4 w-4" />
              Catatan
            </TabsTrigger>
          </TabsList>

          {/* Tab Kehadiran */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Attendees */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-green-700">
                    Peserta Hadir ({minutes.attendees.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tambah peserta hadir..."
                      value={newAttendee}
                      onChange={(e) => setNewAttendee(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addAttendee()}
                    />
                    <Button onClick={addAttendee} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {minutes.attendees.map((name, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-lg"
                      >
                        <span className="text-sm">{name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttendee(name)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Absentees */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-red-700">
                    Tidak Hadir ({minutes.absentees.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Tambah yang tidak hadir..."
                      value={newAbsentee}
                      onChange={(e) => setNewAbsentee(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addAbsentee()}
                    />
                    <Button onClick={addAbsentee} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {minutes.absentees.map((name, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 border rounded-lg"
                      >
                        <span className="text-sm">{name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAbsentee(name)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Agenda */}
          <TabsContent value="agenda" className="space-y-4">
            <div className="space-y-4">
              {minutes.agendaItems.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{item.title}</CardTitle>
                      <Badge variant={item.completed ? "default" : "outline"}>
                        {item.completed ? "Selesai" : "Belum Selesai"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-6">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`discussed-${item.id}`}
                          checked={item.discussed}
                          onCheckedChange={(checked) =>
                            updateAgendaItem(item.id, "discussed", checked)
                          }
                        />
                        <Label
                          htmlFor={`discussed-${item.id}`}
                          className="text-sm"
                        >
                          Sudah dibahas
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`completed-${item.id}`}
                          checked={item.completed}
                          onCheckedChange={(checked) =>
                            updateAgendaItem(item.id, "completed", checked)
                          }
                        />
                        <Label
                          htmlFor={`completed-${item.id}`}
                          className="text-sm"
                        >
                          Selesai
                        </Label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`notes-${item.id}`}
                        className="text-sm font-medium"
                      >
                        Catatan Agenda
                      </Label>
                      <Textarea
                        id={`notes-${item.id}`}
                        value={item.notes}
                        onChange={(e) =>
                          updateAgendaItem(item.id, "notes", e.target.value)
                        }
                        placeholder="Tambahkan catatan untuk agenda ini..."
                        className="min-h-[80px]"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Keputusan */}
          <TabsContent value="decisions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Keputusan Rapat</h3>
              <Button onClick={addDecision} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Keputusan
              </Button>
            </div>

            <div className="space-y-4">
              {minutes.decisions.map((decision) => (
                <Card key={decision.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-end mb-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDecision(decision.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`decision-title-${decision.id}`}>
                          Judul Keputusan
                        </Label>
                        <Input
                          id={`decision-title-${decision.id}`}
                          value={decision.title}
                          onChange={(e) =>
                            updateDecision(decision.id, "title", e.target.value)
                          }
                          placeholder="Masukkan judul keputusan..."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`decision-desc-${decision.id}`}>
                          Deskripsi
                        </Label>
                        <Textarea
                          id={`decision-desc-${decision.id}`}
                          value={decision.description}
                          onChange={(e) =>
                            updateDecision(
                              decision.id,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Jelaskan detail keputusan..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`decision-by-${decision.id}`}>
                          Diputuskan Oleh
                        </Label>
                        <Input
                          id={`decision-by-${decision.id}`}
                          value={decision.decidedBy}
                          onChange={(e) =>
                            updateDecision(
                              decision.id,
                              "decidedBy",
                              e.target.value
                            )
                          }
                          placeholder="Nama pengambil keputusan..."
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Action Items */}
          <TabsContent value="actions" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Action Items</h3>
              <Button onClick={addActionItem} size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Tambah Action Item
              </Button>
            </div>

            <div className="space-y-4">
              {minutes.actionItems.map((action) => (
                <Card key={action.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <Badge
                        variant={getStatusBadgeVariant(action.status)}
                        className="text-xs"
                      >
                        {action.status}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeActionItem(action.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`action-task-${action.id}`}>Task</Label>
                        <Textarea
                          id={`action-task-${action.id}`}
                          value={action.task}
                          onChange={(e) =>
                            updateActionItem(action.id, "task", e.target.value)
                          }
                          placeholder="Deskripsi task yang harus dikerjakan..."
                          className="min-h-[80px]"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`action-assigned-${action.id}`}>
                            PIC
                          </Label>
                          <Input
                            id={`action-assigned-${action.id}`}
                            value={action.assignedTo}
                            onChange={(e) =>
                              updateActionItem(
                                action.id,
                                "assignedTo",
                                e.target.value
                              )
                            }
                            placeholder="Nama PIC..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`action-due-${action.id}`}>
                            Due Date
                          </Label>
                          <Input
                            id={`action-due-${action.id}`}
                            type="date"
                            value={action.dueDate}
                            onChange={(e) =>
                              updateActionItem(
                                action.id,
                                "dueDate",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`action-status-${action.id}`}>
                            Status
                          </Label>
                          <Select
                            value={action.status}
                            onValueChange={(value: ActionItem["status"]) =>
                              updateActionItem(action.id, "status", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in-progress">
                                In Progress
                              </SelectItem>
                              <SelectItem value="completed">
                                Completed
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab Catatan */}
          <TabsContent value="notes" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Catatan Tambahan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="additional-notes">Catatan Meeting</Label>
                  <Textarea
                    id="additional-notes"
                    value={minutes.additionalNotes}
                    onChange={(e) =>
                      setMinutes((prev) => ({
                        ...prev,
                        additionalNotes: e.target.value,
                      }))
                    }
                    placeholder="Tambahkan catatan penting atau informasi tambahan lainnya..."
                    rows={5}
                  />
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="next-meeting">
                    Tanggal Meeting Selanjutnya
                  </Label>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="next-meeting"
                      type="date"
                      value={minutes.nextMeetingDate}
                      onChange={(e) =>
                        setMinutes((prev) => ({
                          ...prev,
                          nextMeetingDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Batal
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Save className="h-4 w-4" />
            Simpan Perubahan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
