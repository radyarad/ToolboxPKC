"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { FileText } from "lucide-react";
import React from "react";

type Props = {
  notes: any;
};

export default function NotesExportCard({ notes }: Props) {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Notulensi & Export
        </CardTitle>
        <CardDescription>Dokumentasi dan sharing meeting</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
            <div>
              <div className="font-medium text-sm">Export PDF</div>
              <div className="text-xs text-muted-foreground">
                Dokumen formal
              </div>
            </div>
            <div className="text-lg font-bold text-red-600">
              {notes.exported_pdf}
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div>
              <div className="font-medium text-sm">Share WhatsApp</div>
              <div className="text-xs text-muted-foreground">
                Komunikasi cepat
              </div>
            </div>
            <div className="text-lg font-bold text-green-600">
              {notes.shared_whatsapp}
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div>
              <div className="font-medium text-sm">Share Email</div>
              <div className="text-xs text-muted-foreground">
                Distribusi resmi
              </div>
            </div>
            <div className="text-lg font-bold text-blue-600">
              {notes.shared_email}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
