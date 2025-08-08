"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Settings } from "lucide-react";
import type { FormData } from "@/types/meeting";

interface MeetingAdvancedProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  errors: { [key: string]: string };
  showAdvanced: boolean;
  setShowAdvanced: (open: boolean) => void;
  generatePassword: () => void;
}

const MeetingAdvanced: React.FC<MeetingAdvancedProps> = ({
  formData,
  setFormData,
  errors,
  showAdvanced,
  setShowAdvanced,
  generatePassword,
}) => (
  <div>
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-lg">Pengaturan Lanjutan</h3>
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            {showAdvanced ? "Sembunyikan" : "Tampilkan"}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPrivate"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isPrivate: Boolean(checked) })
                  }
                />
                <Label htmlFor="isPrivate">Meeting Pribadi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="allowRecording"
                  checked={formData.allowRecording}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      allowRecording: Boolean(checked),
                    })
                  }
                />
                <Label htmlFor="allowRecording">Izinkan Recording</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="waitingRoom"
                  checked={formData.waitingRoom}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, waitingRoom: Boolean(checked) })
                  }
                />
                <Label htmlFor="waitingRoom">Aktifkan Waiting Room</Label>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requirePassword"
                  checked={formData.requirePassword}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      requirePassword: Boolean(checked),
                    })
                  }
                />
                <Label htmlFor="requirePassword">Butuh Password</Label>
              </div>
              {formData.requirePassword && (
                <div className="space-y-2">
                  <Label htmlFor="meetingPassword">Password Meeting</Label>
                  <div className="flex gap-2">
                    <Input
                      id="meetingPassword"
                      value={formData.meetingPassword}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          meetingPassword: e.target.value,
                        })
                      }
                      placeholder="Masukkan password"
                      className={errors.meetingPassword ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generatePassword}
                    >
                      Generate
                    </Button>
                  </div>
                  {errors.meetingPassword && (
                    <p className="text-sm text-red-500">
                      {errors.meetingPassword}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  </div>
);

export default MeetingAdvanced;
