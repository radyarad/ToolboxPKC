"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, CheckCircle, Circle, Badge } from "lucide-react";
import React from "react";
import type { AgendaItem } from "@/lib/detailMeeting/types";
import { Badge as UIBadge } from "@/components/ui/badge";

type Props = {
  agendaItems: AgendaItem[];
};

export default function AgendaList({ agendaItems }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Agenda yang Dibahas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agendaItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                {item.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <Circle className="h-5 w-5 text-orange-500 mt-0.5" />
                )}
                <div>
                  <h4 className="font-medium">{item.title}</h4>
                  <UIBadge
                    variant={item.completed ? "default" : "outline"}
                    className="text-xs mt-1"
                  >
                    {item.completed ? "Selesai" : "Belum Selesai"}
                  </UIBadge>
                </div>
              </div>
            </div>
            <div className="ml-7">
              <p className="text-sm text-muted-foreground">{item.notes}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
