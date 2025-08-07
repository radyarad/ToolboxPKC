"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";

interface MeetingAgendaProps {
  agenda: string[];
  addAgendaItem: () => void;
  updateAgendaItem: (index: number, value: string) => void;
  removeAgendaItem: (index: number) => void;
}

const MeetingAgenda: React.FC<MeetingAgendaProps> = ({
  agenda,
  addAgendaItem,
  updateAgendaItem,
  removeAgendaItem,
}) => (
  <div>
    <h3 className="font-semibold text-lg mb-6">Agenda Meeting</h3>
    <div className="space-y-4">
      {agenda.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <Badge
            variant="secondary"
            className="w-6 h-6 rounded-full p-0 flex items-center justify-center"
          >
            {index + 1}
          </Badge>
          <Input
            value={item}
            onChange={(e) => updateAgendaItem(index, e.target.value)}
            placeholder={`Agenda item ${index + 1}...`}
            className="flex-1"
          />
          {agenda.length > 1 && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeAgendaItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addAgendaItem}>
        <Plus className="h-4 w-4 mr-2" />
        Tambah Agenda
      </Button>
    </div>
  </div>
);

export default MeetingAgenda;
