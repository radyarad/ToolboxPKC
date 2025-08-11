// /components/addMeeting/MeetingDateTime.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormData } from "@/types/meeting";

interface MeetingDateTimeProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: string };
  recurringOptions: { label: string; value: string }[];
  reminderOptions: { label: string; value: string }[];
}

const MeetingDateTime: React.FC<MeetingDateTimeProps> = ({
  formData,
  setFormData,
  errors,
  recurringOptions,
  reminderOptions,
}) => {
  // Helper function to check if selected date is valid (not in the past)
  const isDateValid = (dateString: string) => {
    if (!dateString) return true;
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setFormData({ ...formData, date: newDate });
  };

  const handleTimeChange = (field: "startTime" | "endTime", value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Tanggal *</Label>
          <Input
            id="date"
            type="date"
            value={formData.date}
            min={new Date().toISOString().split("T")[0]}
            onChange={handleDateChange}
            className={errors.date ? "border-red-500" : ""}
          />
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
          {formData.date && !errors.date && (
            <div className="flex items-center space-x-2 text-xs text-green-600">
              <CheckCircle2 className="h-3 w-3" />
              <span>Tanggal meeting valid</span>
            </div>
          )}
          <p className="text-xs text-muted-foreground">
            Tanggal meeting tidak boleh di masa lalu
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="startTime">Waktu Mulai *</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => handleTimeChange("startTime", e.target.value)}
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
            onChange={(e) => handleTimeChange("endTime", e.target.value)}
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
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tidak berulang" />
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
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih reminder" />
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
};

export default MeetingDateTime;
