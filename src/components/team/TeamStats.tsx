import { Users, CheckCircle, Building, Shield } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { User } from "@/types/team/type";

interface TeamStatsProps {
  teamMembers: User[];
  departments: string[];
}

export default function TeamStats({
  teamMembers,
  departments,
}: TeamStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Total Anggota</p>
              <p className="text-2xl font-bold ">{teamMembers.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 dark:bg-blue-300/20 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Aktif</p>
              <p className="text-2xl font-bold">
                {teamMembers.filter((m) => m.status === "active").length}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 dark:bg-green-300/20 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Departemen</p>
              <p className="text-2xl font-bold ">{departments.length}</p>
            </div>
            <div className="h-12 w-12 bg-purple-100 dark:bg-purple-300/20 rounded-lg flex items-center justify-center">
              <Building className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">Admin</p>
              <p className="text-2xl font-bold ">
                {teamMembers.filter((m) => m.role === "Admin").length}
              </p>
            </div>
            <div className="h-12 w-12 bg-red-100 dark:bg-red-300/20 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
