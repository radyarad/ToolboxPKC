"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { User, CheckCircle, X } from "lucide-react";
import React from "react";

type Props = {
  attendees: string[];
  absentees: string[];
};

export default function AttendanceSection({ attendees, absentees }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Kehadiran Peserta
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-green-700 mb-2">
            Hadir ({attendees.length})
          </h4>
          <div className="space-y-1">
            {attendees.map((name, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-3 w-3 text-green-500" />
                {name}
              </div>
            ))}
          </div>
        </div>
        {absentees.length > 0 && (
          <div>
            <h4 className="font-medium text-sm text-red-700 mb-2">
              Tidak Hadir ({absentees.length})
            </h4>
            <div className="space-y-1">
              {absentees.map((name, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <X className="h-3 w-3 text-red-500" />
                  {name}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
