"use client";

import React from "react";
import { Users, Plus, X, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Contact {
  name: string;
  email: string;
  department?: string;
}

interface Participant extends Contact {
  status: string;
}

interface ParticipantsSidebarProps {
  participants: Participant[];
  participantInput: string;
  suggestedContacts: Contact[];
  filteredContacts: Contact[];
  showSuggestions: boolean;
  errors: { [key: string]: string };
  onParticipantInputChange: (value: string) => void;
  addParticipant: (contact: Contact) => void;
  removeParticipant: (email: string) => void;
}

const ParticipantsSidebar: React.FC<ParticipantsSidebarProps> = ({
  participants,
  participantInput,
  suggestedContacts,
  filteredContacts,
  showSuggestions,
  errors,
  onParticipantInputChange,
  addParticipant,
  removeParticipant,
}) => (
  <div>
    <h3 className="font-semibold text-lg mb-6">
      Peserta Meeting
      {participants.length > 0 && (
        <Badge variant="outline" className="ml-2">
          {participants.length}
        </Badge>
      )}
    </h3>
    <div className="space-y-4">
      {/* Add Participant */}
      <div className="relative space-y-2">
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <Label>Tambah Peserta *</Label>
        </div>
        <Input
          value={participantInput}
          onChange={(e) => onParticipantInputChange(e.target.value)}
          placeholder="Cari nama atau email peserta..."
          className={errors.participants ? "border-red-500" : ""}
        />

        {/* Suggestions Dropdown */}
        {showSuggestions && filteredContacts.length > 0 && (
          <Card className="absolute z-10 w-full mt-1 max-h-60 overflow-y-auto">
            <CardContent className="p-0">
              {filteredContacts.map((contact, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start p-4 h-auto"
                  onClick={() => addParticipant(contact)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="font-medium text-sm truncate">
                        {contact.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {contact.email}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {contact.department}
                      </div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {errors.participants && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errors.participants}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Participant List */}
      {participants.length > 0 && (
        <div className="space-y-2">
          <Label>Daftar Peserta:</Label>
          {participants.map((participant, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg"
            >
              <div className="flex items-center space-x-3 min-w-0 flex-1">
                <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-sm font-medium flex-shrink-0">
                  {participant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-sm truncate">
                    {participant.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {participant.email}
                  </div>
                  {participant.department && (
                    <div className="text-xs text-muted-foreground">
                      {participant.department}
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeParticipant(participant.email)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Quick Add Common Contacts */}
      <div className="pt-4 border-t">
        <Label className="text-sm">Kontak Sering Digunakan:</Label>
        <div className="space-y-2 mt-3">
          {suggestedContacts.slice(0, 3).map((contact, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start p-2 h-auto"
              onClick={() => addParticipant(contact)}
              disabled={participants.find((p) => p.email === contact.email)}
            >
              <div className="flex items-center space-x-2 w-full">
                <div className="h-6 w-6 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-xs font-medium flex-shrink-0">
                  {contact.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-sm font-medium truncate">
                    {contact.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {contact.department}
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default ParticipantsSidebar;
