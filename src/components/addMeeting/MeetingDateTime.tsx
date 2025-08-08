"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import {
//   recurringOptions,
//   reminderOptions,
// } from "@/lib/addMeeting/meetingOptions";

import type { FormData } from "@/types/meeting";
interface MeetingDateTimeProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: string };
  recurringOptions: { label: string; value: string }[]; // tambahkan
  reminderOptions: { label: string; value: string }[]; // tambahkan
}

const MeetingDateTime: React.FC<MeetingDateTimeProps> = ({
  formData,
  setFormData,
  errors,
  recurringOptions,
  reminderOptions,
}) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="date">Tanggal *</Label>
        <Input
          id="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className={errors.date ? "border-red-500" : ""}
        />
        {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="startTime">Waktu Mulai *</Label>
        <Input
          id="startTime"
          type="time"
          value={formData.startTime}
          onChange={(e) =>
            setFormData({ ...formData, startTime: e.target.value })
          }
          className={errors.startTime ? "border-red-500" : ""}
        />
        {errors.startTime && (
          <p className="text-sm text-red-500">{errors.startTime}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="endTime">Waktu Selesai *</Label>
        <Input
          id="endTime"
          type="time"
          value={formData.endTime}
          onChange={(e) =>
            setFormData({ ...formData, endTime: e.target.value })
          }
          className={errors.endTime ? "border-red-500" : ""}
        />
        {errors.endTime && (
          <p className="text-sm text-red-500">{errors.endTime}</p>
        )}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Pengulangan</Label>
        <Select
          value={formData.recurring}
          onValueChange={(value) =>
            setFormData({ ...formData, recurring: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {recurringOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Reminder</Label>
        <Select
          value={formData.reminder}
          onValueChange={(value) =>
            setFormData({ ...formData, reminder: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {reminderOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
);

export default MeetingDateTime;
