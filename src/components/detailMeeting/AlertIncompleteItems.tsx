"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React from "react";

type Props = {
  uncompletedAgendaCount: number;
  pendingActionsCount: number;
};

export default function AlertIncompleteItems({
  uncompletedAgendaCount,
  pendingActionsCount,
}: Props) {
  if (uncompletedAgendaCount === 0 && pendingActionsCount === 0) return null;
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription className="text-red-600 dark:text-red-500">
        Meeting sudah selesai namun masih ada {uncompletedAgendaCount} agenda
        yang belum selesai dan {pendingActionsCount} action item yang pending.
      </AlertDescription>
    </Alert>
  );
}
