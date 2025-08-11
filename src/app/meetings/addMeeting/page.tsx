"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, Eye, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import MeetingBasicInfo from "@/components/addMeeting/MeetingBasicInfo";
import MeetingDateTime from "@/components/addMeeting/MeetingDateTime";
import MeetingLocation from "@/components/addMeeting/MeetingLocation";
import MeetingAdvanced from "@/components/addMeeting/MeetingAdvanced";
import MeetingAgenda from "@/components/addMeeting/MeetingAgenda";
import MeetingNotes from "@/components/addMeeting/MeetingNotes";
import ParticipantsSidebar from "@/components/addMeeting/ParticipantsSidebar";
import MeetingSummary from "@/components/addMeeting/MeetingSummary";
import MeetingQuickActions from "@/components/addMeeting/MeetingQuickActions";
import {
  meetingTypes,
  recurringOptions,
  priorityLevels,
  reminderOptions,
} from "@/lib/addMeeting/meetingOptions";
import type { Participant, FormData, Contact } from "@/types/meeting";

// --- Default Data
const defaultFormData: FormData = {
  title: "",
  description: "",
  date: new Date().toISOString().split("T")[0],
  startTime: "09:00",
  endTime: "10:00",
  type: "regular",
  location: "",
  isOnline: false,
  meetingLink: "",
  recurring: "none",
  notes: "",
  agenda: [""],
  participants: [],
  priority: "medium",
  reminder: "15",
  isPrivate: false,
  allowRecording: true,
  requirePassword: false,
  meetingPassword: "",
  waitingRoom: true,
};

const suggestedContactsData: Contact[] = [
  {
    name: "Sarah Kusuma",
    email: "sarah.kusuma@pkc.com",
    department: "Development",
  },
  {
    name: "Ahmad Rahman",
    email: "ahmad.rahman@pkc.com",
    department: "Development",
  },
  {
    name: "Budi Santoso",
    email: "budi.santoso@pkc.com",
    department: "Development",
  },
  { name: "Dewi Lestari", email: "dewi.lestari@pkc.com", department: "Design" },
  { name: "Eko Prasetyo", email: "eko.prasetyo@pkc.com", department: "QA" },
  {
    name: "Fitri Maharani",
    email: "fitri.maharani@pkc.com",
    department: "Product",
  },
  {
    name: "Gilang Ramadhan",
    email: "gilang.ramadhan@pkc.com",
    department: "Marketing",
  },
  { name: "Hana Wijaya", email: "hana.wijaya@pkc.com", department: "HR" },
];

const AddMeetingPage = () => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [participantInput, setParticipantInput] = useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [isSaving, setIsSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [suggestedContacts] = useState<Contact[]>(suggestedContactsData);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ...fungsi2 handleForm...

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = "Judul meeting wajib diisi";
    if (!formData.date) newErrors.date = "Tanggal meeting wajib diisi";

    // Validate that the selected date and time is not in the past
    if (formData.date && formData.startTime) {
      const selectedDateTime = new Date(
        `${formData.date}T${formData.startTime}`
      );
      const now = new Date();

      if (selectedDateTime <= now) {
        newErrors.date = "Tanggal dan waktu meeting tidak boleh di masa lalu";
      }
    } else if (formData.date) {
      // If only date is selected, check if it's today or in the future
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Tanggal meeting tidak boleh di masa lalu";
      }
    }

    if (!formData.startTime) newErrors.startTime = "Waktu mulai wajib diisi";
    if (!formData.endTime) newErrors.endTime = "Waktu selesai wajib diisi";
    if (
      formData.startTime &&
      formData.endTime &&
      formData.startTime >= formData.endTime
    )
      newErrors.endTime = "Waktu selesai harus setelah waktu mulai";
    if (formData.isOnline && !formData.meetingLink.trim())
      newErrors.meetingLink = "Link meeting wajib diisi untuk meeting online";
    if (!formData.isOnline && !formData.location.trim())
      newErrors.location = "Lokasi meeting wajib diisi";
    if (formData.participants.length === 0)
      newErrors.participants = "Minimal harus ada 1 peserta";
    if (formData.requirePassword && !formData.meetingPassword.trim())
      newErrors.meetingPassword = "Password meeting wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Meeting berhasil dibuat!");
    } catch (error) {
      alert("Gagal membuat meeting. Silakan coba lagi.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleParticipantInputChange = (value: string) => {
    setParticipantInput(value);
    if (value.trim()) {
      const filtered = suggestedContacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(value.toLowerCase()) ||
          contact.email.toLowerCase().includes(value.toLowerCase()) ||
          (contact.department &&
            contact.department.toLowerCase().includes(value.toLowerCase()))
      );
      setFilteredContacts(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredContacts([]);
      setShowSuggestions(false);
    }
  };

  const addParticipant = (contact: Contact) => {
    if (!formData.participants.find((p) => p.email === contact.email)) {
      setFormData({
        ...formData,
        participants: [
          ...formData.participants,
          { ...contact, status: "pending" },
        ],
      });
    }
    setParticipantInput("");
    setShowSuggestions(false);
    setFilteredContacts([]);
  };

  const removeParticipant = (email: string) => {
    setFormData({
      ...formData,
      participants: formData.participants.filter((p) => p.email !== email),
    });
  };

  const addAgendaItem = () => {
    setFormData({ ...formData, agenda: [...formData.agenda, ""] });
  };

  const updateAgendaItem = (index: number, value: string) => {
    const newAgenda = [...formData.agenda];
    newAgenda[index] = value;
    setFormData({ ...formData, agenda: newAgenda });
  };

  const removeAgendaItem = (index: number) => {
    if (formData.agenda.length > 1) {
      const newAgenda = formData.agenda.filter((_, i) => i !== index);
      setFormData({ ...formData, agenda: newAgenda });
    }
  };

  const generateMeetingLink = () => {
    const randomId = Math.random().toString(36).substring(2, 15);
    setFormData({
      ...formData,
      meetingLink: `https://meet.google.com/${randomId}`,
    });
  };

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData({ ...formData, meetingPassword: password });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <header className="bg-background border-b top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Buat Meeting Baru</h1>
                <p className="text-sm text-muted-foreground">
                  Atur detail meeting dan undang peserta
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Meeting
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* FORM MAIN (3 columns) */}
          <div className="xl:col-span-3 space-y-6">
            <MeetingBasicInfo
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              meetingTypes={meetingTypes}
              priorityLevels={priorityLevels}
            />
            <MeetingDateTime
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              recurringOptions={recurringOptions}
              reminderOptions={reminderOptions}
            />
            <MeetingLocation
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              generateMeetingLink={generateMeetingLink}
            />
            <MeetingAdvanced
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              showAdvanced={showAdvanced}
              setShowAdvanced={setShowAdvanced}
              generatePassword={generatePassword}
            />
            <MeetingAgenda
              agenda={formData.agenda}
              addAgendaItem={addAgendaItem}
              updateAgendaItem={updateAgendaItem}
              removeAgendaItem={removeAgendaItem}
            />
            {/* <MeetingNotes notes={formData.notes} setFormData={setFormData} /> */}
          </div>

          {/* SIDEBAR (1 column) */}
          <div className="xl:col-span-1 space-y-6">
            <ParticipantsSidebar
              participants={formData.participants}
              participantInput={participantInput}
              suggestedContacts={suggestedContacts}
              filteredContacts={filteredContacts}
              showSuggestions={showSuggestions}
              errors={errors}
              onParticipantInputChange={handleParticipantInputChange}
              addParticipant={addParticipant}
              removeParticipant={removeParticipant}
            />
            <MeetingSummary
              formData={formData}
              recurringOptions={recurringOptions}
            />
            <MeetingQuickActions />
          </div>
        </div>

        {/* BOTTOM ACTION BAR (mobile) */}
        <div className="sticky bottom-0 bg-background border-t px-4 py-4 mt-8 -mx-4">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium truncate">
                    {formData.title || "Meeting Baru"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formData.participants.length} peserta •{" "}
                    {formData.agenda.filter((item) => item.trim()).length}{" "}
                    agenda
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button variant="outline" size="sm">
                  <span className="sm:hidden">Template</span>
                  <span className="hidden sm:inline">
                    Simpan sebagai Template
                  </span>
                </Button>
                <Button variant="outline" size="sm">
                  Preview
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? "Menyimpan..." : "Buat Meeting"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMeetingPage;
