"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { FormData } from "@/types/meeting";

interface MeetingNotesProps {
  notes: string;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const MeetingNotes: React.FC<MeetingNotesProps> = ({ notes, setFormData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Catatan Tambahan</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          value={notes}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, notes: e.target.value }))
          }
          rows={4}
          placeholder="Tambahkan catatan khusus, instruksi persiapan, atau informasi penting lainnya untuk peserta meeting..."
        />
      </CardContent>
    </Card>
  );
};

export default MeetingNotes;
