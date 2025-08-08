// "use client";

// import React, { useState } from "react";
// import {
//   Calendar,
//   Clock,
//   MapPin,
//   Users,
//   Video,
//   Filter,
//   Search,
//   Plus,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // Types
// type Participant = {
//   name: string;
//   email: string;
//   status: "accepted" | "pending" | "declined";
// };

// type Meeting = {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   startTime: string;
//   endTime: string;
//   type: string;
//   location: string;
//   isOnline: boolean;
//   organizer: string;
//   participants: Participant[];
//   agenda: string[];
//   status: string;
//   meetingLink: string;
//   recurring: string;
//   notes: string;
// };

// // Data
// const DataMeetings: Meeting[] = [
//   {
//     id: 1,
//     title: "Standup Meeting Tim Development",
//     description: "Daily standup meeting untuk sync progress tim development",
//     date: "2025-08-01",
//     startTime: "09:00",
//     endTime: "09:30",
//     type: "recurring",
//     location: "Meeting Room A",
//     isOnline: false,
//     organizer: "Sarah Kusuma",
//     participants: [
//       {
//         name: "Ahmad Rahman",
//         email: "ahmad.rahman@pkc.com",
//         status: "accepted",
//       },
//       {
//         name: "Budi Santoso",
//         email: "budi.santoso@pkc.com",
//         status: "pending",
//       },
//       {
//         name: "Dewi Lestari",
//         email: "dewi.lestari@pkc.com",
//         status: "accepted",
//       },
//     ],
//     agenda: [
//       "Progress update dari setiap anggota tim",
//       "Diskusi blocker dan challenge",
//       "Planning task untuk hari ini",
//     ],
//     status: "confirmed",
//     meetingLink: "",
//     recurring: "daily",
//     notes: "Jangan lupa bawa laptop untuk demo",
//   },
//   {
//     id: 2,
//     title: "Client Presentation - Q3 Report",
//     description: "Presentasi laporan quarterly kepada klien utama",
//     date: "2025-08-01",
//     startTime: "14:00",
//     endTime: "15:30",
//     type: "important",
//     location: "Zoom Meeting",
//     isOnline: true,
//     organizer: "Fitri Maharani",
//     participants: [
//       {
//         name: "Sarah Kusuma",
//         email: "sarah.kusuma@pkc.com",
//         status: "accepted",
//       },
//       {
//         name: "Ahmad Rahman",
//         email: "ahmad.rahman@pkc.com",
//         status: "accepted",
//       },
//       {
//         name: "External Client",
//         email: "client@company.com",
//         status: "pending",
//       },
//     ],
//     agenda: [
//       "Opening dan welcome",
//       "Presentasi hasil Q3",
//       "Q&A session",
//       "Next steps planning",
//     ],
//     status: "confirmed",
//     meetingLink: "https://zoom.us/j/123456789",
//     recurring: "none",
//     notes: "Siapkan slide presentasi dan demo produk",
//   },
//   {
//     id: 3,
//     title: "Team Building Workshop",
//     description: "Workshop team building untuk meningkatkan kolaborasi tim",
//     date: "2025-08-02",
//     startTime: "13:00",
//     endTime: "17:00",
//     type: "event",
//     location: "Aula Lantai 3",
//     isOnline: false,
//     organizer: "HR Team",
//     participants: [
//       { name: "All Team Members", email: "all@pkc.com", status: "pending" },
//     ],
//     agenda: [
//       "Ice breaking activities",
//       "Team collaboration games",
//       "Sharing session",
//       "Closing dan evaluasi",
//     ],
//     status: "tentative",
//     meetingLink: "",
//     recurring: "none",
//     notes: "Dress code: casual, bawa sepatu olahraga",
//   },
//   {
//     id: 4,
//     title: "Code Review Session",
//     description: "Review kode untuk fitur authentication baru",
//     date: "2025-08-05",
//     startTime: "10:00",
//     endTime: "11:00",
//     type: "technical",
//     location: "Meeting Room B",
//     isOnline: false,
//     organizer: "Ahmad Rahman",
//     participants: [
//       {
//         name: "Sarah Kusuma",
//         email: "sarah.kusuma@pkc.com",
//         status: "accepted",
//       },
//       {
//         name: "Budi Santoso",
//         email: "budi.santoso@pkc.com",
//         status: "accepted",
//       },
//       {
//         name: "Eko Prasetyo",
//         email: "eko.prasetyo@pkc.com",
//         status: "pending",
//       },
//     ],
//     agenda: [
//       "Review authentication module",
//       "Security check",
//       "Performance optimization",
//       "Testing strategy",
//     ],
//     status: "confirmed",
//     meetingLink: "",
//     recurring: "weekly",
//     notes: "Prepare local development environment",
//   },
// ];

// // Helper functions
// function getTypeBadgeVariant(
//   type: string
// ): "default" | "destructive" | "outline" | "secondary" {
//   switch (type) {
//     case "important":
//       return "destructive";
//     case "recurring":
//       return "default";
//     case "technical":
//       return "secondary";
//     case "event":
//       return "outline";
//     default:
//       return "secondary";
//   }
// }

// function getStatusBadgeVariant(
//   status: string
// ): "default" | "destructive" | "outline" | "secondary" {
//   switch (status) {
//     case "confirmed":
//       return "default";
//     case "tentative":
//       return "outline";
//     case "cancelled":
//       return "destructive";
//     default:
//       return "secondary";
//   }
// }

// function formatDate(dateString: string) {
//   const date = new Date(dateString);
//   return date.toLocaleDateString("id-ID", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// function formatTime(time: string) {
//   return time.slice(0, 5);
// }

// // Main component
// export default function MeetingListPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState("all");
//   const [filterStatus, setFilterStatus] = useState("all");

//   // Filter meetings based on search and filters
//   const filteredMeetings = DataMeetings.filter((meeting) => {
//     const matchesSearch =
//       meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesType = filterType === "all" || meeting.type === filterType;
//     const matchesStatus =
//       filterStatus === "all" || meeting.status === filterStatus;

//     return matchesSearch && matchesType && matchesStatus;
//   });

//   const handleMeetingClick = (meeting: Meeting) => {
//     // In a real Next.js app, you would use router.push(`/meetings/${meeting.id}`)
//     alert(
//       `Navigating to meeting detail: ${meeting.title}\n\nIn a real app, this would navigate to /meetings/${meeting.id}`
//     );
//   };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-7xl mx-auto space-y-8">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="space-y-2">
//             <h1 className="text-3xl font-bold tracking-tight">Meeting List</h1>
//             <p className="text-muted-foreground">
//               Kelola dan lihat semua meeting yang dijadwalkan
//             </p>
//           </div>
//           <Button className="gap-2">
//             <Plus className="h-4 w-4" />
//             New Meeting
//           </Button>
//         </div>

//         {/* Search and Filters */}
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               {/* Search */}
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                 <Input
//                   placeholder="Cari meeting..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               {/* Type Filter */}
//               <Select value={filterType} onValueChange={setFilterType}>
//                 <SelectTrigger className="w-full md:w-[180px]">
//                   <SelectValue placeholder="Semua Tipe" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Semua Tipe</SelectItem>
//                   <SelectItem value="important">Important</SelectItem>
//                   <SelectItem value="recurring">Recurring</SelectItem>
//                   <SelectItem value="technical">Technical</SelectItem>
//                   <SelectItem value="event">Event</SelectItem>
//                 </SelectContent>
//               </Select>

//               {/* Status Filter */}
//               <Select value={filterStatus} onValueChange={setFilterStatus}>
//                 <SelectTrigger className="w-full md:w-[180px]">
//                   <SelectValue placeholder="Semua Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Semua Status</SelectItem>
//                   <SelectItem value="confirmed">Confirmed</SelectItem>
//                   <SelectItem value="tentative">Tentative</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Results Count */}
//             <div className="text-sm text-muted-foreground mt-4">
//               Menampilkan {filteredMeetings.length} dari {DataMeetings.length}{" "}
//               meeting
//             </div>
//           </CardContent>
//         </Card>

//         {/* Meeting Cards */}
//         <div className="space-y-4">
//           {filteredMeetings.map((meeting) => (
//             <Card
//               key={meeting.id}
//               className="cursor-pointer hover:shadow-md transition-all duration-200 hover:border-primary/50"
//               onClick={() => handleMeetingClick(meeting)}
//             >
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <div className="space-y-2 flex-1">
//                     <div className="flex items-center gap-2 flex-wrap">
//                       <CardTitle className="text-xl">{meeting.title}</CardTitle>
//                       <Badge variant={getTypeBadgeVariant(meeting.type)}>
//                         {meeting.type}
//                       </Badge>
//                       <Badge variant={getStatusBadgeVariant(meeting.status)}>
//                         {meeting.status}
//                       </Badge>
//                     </div>
//                     <CardDescription className="text-base">
//                       {meeting.description}
//                     </CardDescription>
//                   </div>
//                 </div>
//               </CardHeader>

//               <CardContent className="space-y-6">
//                 {/* Meeting Info Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                   {/* Date */}
//                   <div className="flex items-center gap-2 text-sm">
//                     <Calendar className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <div className="font-medium">
//                         {formatDate(meeting.date)}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Time */}
//                   <div className="flex items-center gap-2 text-sm">
//                     <Clock className="h-4 w-4 text-muted-foreground" />
//                     <div>
//                       <div>
//                         {formatTime(meeting.startTime)} -{" "}
//                         {formatTime(meeting.endTime)}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Location */}
//                   <div className="flex items-center gap-2 text-sm">
//                     {meeting.isOnline ? (
//                       <Video className="h-4 w-4 text-muted-foreground" />
//                     ) : (
//                       <MapPin className="h-4 w-4 text-muted-foreground" />
//                     )}
//                     <div className="truncate">{meeting.location}</div>
//                   </div>

//                   {/* Participants */}
//                   <div className="flex items-center gap-2 text-sm">
//                     <Users className="h-4 w-4 text-muted-foreground" />
//                     <div>{meeting.participants.length} peserta</div>
//                   </div>
//                 </div>

//                 {/* Organizer and Recurring Info */}
//                 <div className="flex items-center justify-between pt-4 border-t">
//                   <div className="text-sm text-muted-foreground">
//                     <span className="font-medium">Organizer:</span>{" "}
//                     {meeting.organizer}
//                   </div>
//                   {meeting.recurring !== "none" && (
//                     <Badge variant="outline" className="text-xs">
//                       {meeting.recurring}
//                     </Badge>
//                   )}
//                 </div>

//                 {/* Agenda Preview */}
//                 {meeting.agenda.length > 0 && (
//                   <div className="pt-4 border-t space-y-2">
//                     <div className="text-sm font-medium">Agenda:</div>
//                     <div className="space-y-1">
//                       {meeting.agenda.slice(0, 2).map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-start gap-2 text-sm text-muted-foreground"
//                         >
//                           <span className="text-primary mt-1">•</span>
//                           <span>{item}</span>
//                         </div>
//                       ))}
//                       {meeting.agenda.length > 2 && (
//                         <div className="text-xs text-primary">
//                           +{meeting.agenda.length - 2} agenda lainnya
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredMeetings.length === 0 && (
//           <Card>
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <Calendar className="h-16 w-16 text-muted-foreground mb-4" />
//               <CardTitle className="mb-2">
//                 Tidak ada meeting ditemukan
//               </CardTitle>
//               <CardDescription className="text-center mb-6">
//                 Coba ubah filter atau kata kunci pencarian Anda
//               </CardDescription>
//               <Button className="gap-2">
//                 <Plus className="h-4 w-4" />
//                 Buat Meeting Baru
//               </Button>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
export default function page() {
  return (
    <div>
      <h1>Meeting page</h1>
    </div>
  );
}
