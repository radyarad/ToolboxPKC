"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import React from "react";
import type { ActionItem } from "@/lib/detailMeeting/types";
import { getActionStatusBadge } from "@/lib/detailMeeting/utils";

type Props = {
  actionItems: ActionItem[];
};

export default function ActionItemsSidebar({ actionItems }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Action Items</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actionItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <Badge
                variant={getActionStatusBadge(item.status)}
                className="text-xs"
              >
                {item.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {item.dueDate}
              </span>
            </div>
            <h5 className="font-medium text-sm mb-1">{item.task}</h5>
            <p className="text-xs text-muted-foreground">
              PIC: {item.assignedTo}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
