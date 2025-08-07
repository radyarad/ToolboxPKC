"use client";

import React from "react";
import { Copy, FileText, Globe } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MeetingQuickActions: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button variant="outline" className="w-full justify-start">
          <Copy className="h-4 w-4 mr-2" />
          <div className="text-left">
            <div className="text-sm font-medium">Duplikasi dari Template</div>
            <div className="text-xs text-muted-foreground">
              Gunakan template meeting sebelumnya
            </div>
          </div>
        </Button>

        <Button variant="outline" className="w-full justify-start">
          <FileText className="h-4 w-4 mr-2" />
          <div className="text-left">
            <div className="text-sm font-medium">Import dari File</div>
            <div className="text-xs text-muted-foreground">
              Import detail dari file Excel/CSV
            </div>
          </div>
        </Button>

        <Button variant="outline" className="w-full justify-start">
          <Globe className="h-4 w-4 mr-2" />
          <div className="text-left">
            <div className="text-sm font-medium">Sinkron dengan Calendar</div>
            <div className="text-xs text-muted-foreground">
              Otomatis sync ke Google Calendar
            </div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MeetingQuickActions;
