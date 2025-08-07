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
import { meetingTypes, priorityLevels } from "@/lib/addMeeting/meetingOptions";

interface MeetingBasicInfoProps {
  formData: any;
  setFormData: (data: any) => void;
  errors: { [key: string]: string };
}

const MeetingBasicInfo: React.FC<MeetingBasicInfoProps> = ({
  formData,
  setFormData,
  errors,
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

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label>Tipe Meeting</Label>
        <Select
          value={formData.type}
          onValueChange={(value) => setFormData({ ...formData, type: value })}
        >
          <SelectTrigger>
            <SelectValue />
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
          <SelectTrigger>
            <SelectValue />
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

      <div className="space-y-2">
        <Label>Timezone</Label>
        <Select
          value={formData.timezone}
          onValueChange={(value) =>
            setFormData({ ...formData, timezone: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="WIB">WIB (UTC+7)</SelectItem>
            <SelectItem value="WITA">WITA (UTC+8)</SelectItem>
            <SelectItem value="WIT">WIT (UTC+9)</SelectItem>
            <SelectItem value="UTC">UTC (UTC+0)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

export default MeetingBasicInfo;
