"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import type { FormData } from "@/types/meeting";

interface MeetingLocationProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: string };
  generateMeetingLink: () => void;
}

const MeetingLocation: React.FC<MeetingLocationProps> = ({
  formData,
  setFormData,
  errors,
  generateMeetingLink,
}) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-2">
      <Checkbox
        id="isOnline"
        checked={formData.isOnline}
        onCheckedChange={(checked) =>
          setFormData({ ...formData, isOnline: Boolean(checked) })
        }
      />
      <Label htmlFor="isOnline">Meeting Online</Label>
    </div>

    {formData.isOnline ? (
      <div className="space-y-2">
        <Label htmlFor="meetingLink">Link Meeting *</Label>
        <div className="flex gap-2">
          <Input
            id="meetingLink"
            type="url"
            value={formData.meetingLink}
            onChange={(e) =>
              setFormData({ ...formData, meetingLink: e.target.value })
            }
            placeholder="https://meet.google.com/xxx-xxx-xxx"
            className={errors.meetingLink ? "border-red-500" : ""}
          />
          <Button type="button" variant="outline" onClick={generateMeetingLink}>
            Generate
          </Button>
        </div>
        {errors.meetingLink && (
          <p className="text-sm text-red-500">{errors.meetingLink}</p>
        )}
      </div>
    ) : (
      <div className="space-y-2">
        <Label htmlFor="location">Lokasi Meeting *</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="Meeting Room A, Lantai 2"
          className={errors.location ? "border-red-500" : ""}
        />
        {errors.location && (
          <p className="text-sm text-red-500">{errors.location}</p>
        )}
      </div>
    )}
  </div>
);

export default MeetingLocation;
