import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building, Mail, MapPin, Phone } from "lucide-react";
import React from "react";

interface UserDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: any;
  getRoleInfo: (role: string) => { color: string };
  getStatusColor: (status: string) => string;
}

export default function DialogUserDetail({
  open,
  onOpenChange,
  user,
  getRoleInfo,
  getStatusColor,
}: UserDetailProps) {
  if (!user) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detail Anggota Team</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-4">
          {/* avatar */}
          <div className="h-16 w-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
            {user.avatar}
          </div>
          <div>
            <h4 className="text-lg font-semibold">{user.name}</h4>
            <p className="text-muted-foreground">{user.position}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  getRoleInfo(user.role).color
                }`}
              >
                {user.role}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  user.status
                )}`}
              >
                {user.status}
              </span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h5 className="font-semibold">Informasi Kontak</h5>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 " />
                <span className="text-sm">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{user.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{user.department}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h5 className="font-semibold">Statistik Kerja</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Task Selesai</span>
                <span className="text-sm font-medium">
                  {user.tasksCompleted}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Task Aktif</span>
                <span className="text-sm font-medium">
                  {user.tasksInProgress}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Meeting Dihadiri</span>
                <span className="text-sm font-medium">
                  {user.meetingsAttended}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Bergabung</span>
                <span className="text-sm font-medium">{user.joinDate}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-6">
          <h5 className="font-semibold mb-3">Keahlian</h5>
          <div className="flex flex-wrap gap-2">
            {user.skills?.length ? (
              user.skills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-gray-400 text-sm">-</span>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <Button className="flex-1">Edit Profil</Button>
          <Button variant="destructive">Hapus Anggota</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
