"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
import type { Decision } from "@/lib/detailMeeting/types";

type Props = {
  decisions: Decision[];
};

export default function DecisionsList({ decisions }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Keputusan Rapat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {decisions.map((decision) => (
          <div key={decision.id} className="border rounded-lg p-4">
            <h4 className="font-medium mb-2">{decision.title}</h4>
            <p className="text-sm text-muted-foreground mb-2">
              {decision.description}
            </p>
            <div className="text-xs text-muted-foreground">
              Diputuskan oleh: <strong>{decision.decidedBy}</strong>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
