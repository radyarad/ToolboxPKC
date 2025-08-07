"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

type Props = {
  additionalNotes: string;
};

export default function MeetingNotesSection({ additionalNotes }: Props) {
  if (!additionalNotes) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Catatan Tambahan</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{additionalNotes}</p>
      </CardContent>
    </Card>
  );
}
