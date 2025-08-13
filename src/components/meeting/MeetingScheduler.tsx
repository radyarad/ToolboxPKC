"use client";

import React, { useState } from "react";
import {
  DataMeetings,
  Meeting,
  getDaysInMonth,
  getTypeColor,
  getStatusColor,
} from "@/lib/scheduler/DataMeeting";

import MeetingsHeader from "./HeaderMeeting";
import MeetingsStatsCards from "./StatsCard";
import MeetingsCalendar from "./MeetingCalendar";
import MeetingsOfSelectedDate from "./MeetingsOfSelectedDate";
import UpcomingMeetings from "./UpcomingMeetings";
import CreateMeetingModal from "./CreateMeetingModal";
import EditMeetingModal from "./EditMeetingModal";
import MeetingDetailModal from "./MeetingDetailModal";
import { Plus } from "lucide-react";

const MeetingScheduler = () => {
  // States utama
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCreateMeeting, setShowCreateMeeting] = useState(false);
  const [showMeetingDetail, setShowMeetingDetail] = useState(false);
  const [showEditMeeting, setShowEditMeeting] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [editMeeting, setEditMeeting] = useState<any>(null);
  const [activeView, setActiveView] = useState("month");
  const [searchQuery, setSearchQuery] = useState("");

  // Meetings state (dummy bisa diganti fetch API nanti)
  const [meetings, setMeetings] = useState<Meeting[]>(DataMeetings);

  // State meeting baru (reset setiap selesai create)
  const [newMeeting, setNewMeeting] = useState<any>({
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endTime: "10:00",
    type: "regular",
    location: "",
    isOnline: false,
    participants: [],
    agenda: [""],
    recurring: "none",
    meetingLink: "",
    notes: "",
  });

  // Helpers
  const handleCreateMeeting = () => {
    if (newMeeting.title.trim()) {
      const meeting: Meeting = {
        ...newMeeting,
        id: Date.now(),
        organizer: "Current User",
        participants: newMeeting.participants.map((email: string) => ({
          name: email.split("@")[0],
          email: email,
          status: "pending",
        })),
        status: "confirmed",
      };
      setMeetings((prev) => [...prev, meeting]);
      setNewMeeting({
        title: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
        startTime: "09:00",
        endTime: "10:00",
        type: "regular",
        location: "",
        isOnline: false,
        participants: [],
        agenda: [""],
        recurring: "none",
        meetingLink: "",
        notes: "",
      });
      setShowCreateMeeting(false);
    }
  };

  const handleEditMeeting = () => {
    if (editMeeting && editMeeting.title.trim()) {
      setMeetings((prev) =>
        prev.map((meeting) =>
          meeting.id === editMeeting.id ? editMeeting : meeting
        )
      );
      setShowEditMeeting(false);
      setShowMeetingDetail(false);
      setEditMeeting(null);
    }
  };

  const handleDeleteMeeting = (meetingId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus meeting ini?")) {
      setMeetings((prev) => prev.filter((meeting) => meeting.id !== meetingId));
      setShowMeetingDetail(false);
      setSelectedMeeting(null);
    }
  };

  const duplicateMeeting = (meeting: Meeting) => {
    const duplicated: Meeting = {
      ...meeting,
      id: Date.now(),
      title: `Copy of ${meeting.title}`,
      status: "tentative",
      participants: meeting.participants.map((p) => ({
        ...p,
        status: "pending",
      })),
    };
    setMeetings((prev) => [...prev, duplicated]);
  };

  // Filter meetings dengan search
  const filteredMeetings = meetings.filter(
    (meeting) =>
      meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <MeetingsHeader
        activeView={activeView}
        setActiveView={setActiveView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCreateMeeting={() => setShowCreateMeeting(true)}
      />

      {/* Main Content */}
      <div className="flex">
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <MeetingsStatsCards meetings={meetings} />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Calendar */}
            <MeetingsCalendar
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              meetings={meetings}
              onSelectMeeting={(meeting) => {
                setSelectedMeeting(meeting);
                setShowMeetingDetail(true);
              }}
            />

            {/* Meeting List by Selected Date */}
            <MeetingsOfSelectedDate
              selectedDate={selectedDate}
              meetings={meetings}
              onShowDetail={(meeting) => {
                setSelectedMeeting(meeting);
                setShowMeetingDetail(true);
              }}
              onEditMeeting={(meeting) => {
                setEditMeeting({ ...meeting });
                setShowEditMeeting(true);
              }}
              onCreateMeeting={() => setShowCreateMeeting(true)}
            />
          </div>

          {/* Upcoming Meetings */}
          <UpcomingMeetings
            meetings={filteredMeetings}
            onShowDetail={(meeting) => {
              setSelectedMeeting(meeting);
              setShowMeetingDetail(true);
            }}
            onEditMeeting={(meeting) => {
              setEditMeeting({ ...meeting });
              setShowEditMeeting(true);
            }}
            onCreateMeeting={() => setShowCreateMeeting(true)}
          />
        </main>
      </div>

      {/* Modals */}
      <CreateMeetingModal
        show={showCreateMeeting}
        newMeeting={newMeeting}
        setNewMeeting={setNewMeeting}
        onClose={() => setShowCreateMeeting(false)}
        onCreate={handleCreateMeeting}
      />

      <EditMeetingModal
        show={showEditMeeting}
        editMeeting={editMeeting}
        setEditMeeting={setEditMeeting}
        onClose={() => setShowEditMeeting(false)}
        onSave={handleEditMeeting}
      />

      <MeetingDetailModal
        show={showMeetingDetail}
        meeting={selectedMeeting}
        onClose={() => setShowMeetingDetail(false)}
        onEdit={() => {
          setEditMeeting({ ...selectedMeeting });
          setShowEditMeeting(true);
        }}
        onDuplicate={() => selectedMeeting && duplicateMeeting(selectedMeeting)}
        onDelete={() =>
          selectedMeeting && handleDeleteMeeting(selectedMeeting.id)
        }
      />

      {/* Quick Actions */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => setShowCreateMeeting(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors hover:shadow-xl"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MeetingScheduler;
