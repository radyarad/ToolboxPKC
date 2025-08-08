// /components/addMeeting/MeetingBasicInfo.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormData } from "@/types/meeting";

interface MeetingBasicInfoProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: string };
  meetingTypes: { label: string; value: string }[];
  priorityLevels: { label: string; value: string }[];
}

const MeetingBasicInfo: React.FC<MeetingBasicInfoProps> = ({
  formData,
  setFormData,
  errors,
  meetingTypes,
  priorityLevels,
}) => (
  <div className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="title">Judul Meeting *</Label>
      <Input
        id="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Masukkan judul meeting yang jelas dan deskriptif"
        className={errors.title ? "border-red-500" : ""}
      />
      {errors.title && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.title}</AlertDescription>
        </Alert>
      )}
    </div>

    <div className="space-y-2">
      <Label htmlFor="description">Deskripsi</Label>
      <Textarea
        id="description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Jelaskan tujuan dan topik yang akan dibahas dalam meeting..."
        rows={4}
      />
    </div>

    {/* Grid 2 kolom (Timezone dihapus) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Tipe Meeting</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih tipe meeting" />
          </SelectTrigger>
          <SelectContent>
            {meetingTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Prioritas</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) =>
            setFormData({ ...formData, priority: value })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pilih prioritas" />
          </SelectTrigger>
          <SelectContent>
            {priorityLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

export default MeetingBasicInfo;
