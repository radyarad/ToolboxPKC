"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: boolean;
  trendValue?: number;
};

export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className="flex items-center mt-2">
            <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-green-500">
              +{trendValue}% dari bulan lalu
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
