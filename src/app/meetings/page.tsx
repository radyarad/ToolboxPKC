"use client";

import React, { useState } from "react";
import { Filter, Search, Plus, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MeetingList from "@/components/meetings/MeetingList";
import { DataMeetings, Meeting } from "@/lib/meeting/data";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Helper function
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

export default function MeetingListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();

  // Filter meetings based on search and filters
  const filteredMeetings = DataMeetings.filter((meeting) => {
    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || meeting.type === filterType;
    const matchesStatus =
      filterStatus === "all" || meeting.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleMeetingClick = (meeting: Meeting) => {
    router.push(`/meetings/${meeting.id}`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Meeting List</h1>
            <p className="text-muted-foreground">
              Kelola dan lihat semua meeting yang dijadwalkan
            </p>
          </div>
          <Link href="/meetings/addMeeting">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Meeting
            </Button>
          </Link>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Cari meeting..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Type Filter */}
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Semua Tipe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Tipe</SelectItem>
                  <SelectItem value="important">Important</SelectItem>
                  <SelectItem value="recurring">Recurring</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Semua Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="tentative">Tentative</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="text-sm text-muted-foreground mt-4">
              Menampilkan {filteredMeetings.length} dari {DataMeetings.length}{" "}
              meeting
            </div>
          </CardContent>
        </Card>

        {/* Meeting Cards */}
        {filteredMeetings.length > 0 && (
          <MeetingList
            meetings={filteredMeetings}
            onMeetingClick={handleMeetingClick}
          />
        )}

        {/* Empty State */}
        {filteredMeetings.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
              <CardTitle className="mb-2">
                Tidak ada meeting ditemukan
              </CardTitle>
              <CardDescription className="text-center mb-6">
                Coba ubah filter atau kata kunci pencarian Anda
              </CardDescription>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Buat Meeting Baru
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
