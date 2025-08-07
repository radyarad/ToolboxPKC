"use client";
import React, { useState } from "react";
import TeamHeader from "./TeamHeader";
import TeamStats from "./TeamStats";
import TeamTable from "./TeamTable";
import departments from "@/lib/team/departements";
import roles from "@/lib/team/roles";
import defaultMembers from "@/lib/team/members";
import DialogUserDetail from "./DialogUserDetail";
import DialogAddTeam from "./DialogAddTeam"; // Ubah ke default export

function getRoleInfo(role) {
  return roles.find((r) => r.name === role) || roles[2];
}
function getStatusColor(status) {
  return status === "active"
    ? "bg-green-100 text-green-700"
    : "bg-gray-100 text-gray-700";
}

export default function TeamManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [teamMembers, setTeamMembers] = useState(defaultMembers);

  const [userDialog, setUserDialog] = useState({ open: false, user: null });
  const [addDialog, setAddDialog] = useState({
    open: false,
    mode: "add", // "add" or "edit"
    user: null,
  });

  // Filtering logic
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Handler for saving add/edit
  function handleSave(user, mode) {
    if (mode === "edit" && user?.id) {
      // Update
      setTeamMembers((prev) =>
        prev.map((m) => (m.id === user.id ? { ...m, ...user } : m))
      );
    } else if (mode === "add") {
      // Add new
      setTeamMembers((prev) => [
        ...prev,
        {
          ...user,
          id: Date.now(),
          avatar: user.name
            .split(" ")
            .map((n) => n[0])
            .join(""),
          status: "active",
          joinDate: new Date().toISOString().split("T")[0],
          lastActive: new Date().toISOString(),
          tasksCompleted: 0,
          tasksInProgress: 0,
          meetingsAttended: 0,
          skills: [],
        },
      ]);
    }
    setAddDialog({ open: false, mode: "add", user: null });
  }

  return (
    <div className="min-h-screen">
      <TeamHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedDepartment={selectedDepartment}
        setSelectedDepartment={setSelectedDepartment}
        departments={departments}
        onAdd={() => setAddDialog({ open: true, mode: "add", user: null })}
      />
      <div className="flex">
        <main className="flex-1 p-6">
          <TeamStats teamMembers={filteredMembers} departments={departments} />
          <TeamTable
            filteredMembers={filteredMembers}
            getRoleInfo={getRoleInfo}
            getStatusColor={getStatusColor}
            onViewDetail={(user) => setUserDialog({ open: true, user })}
            onEdit={(user) => setAddDialog({ open: true, mode: "edit", user })}
          />
          <DialogUserDetail
            open={userDialog.open}
            onOpenChange={(open) =>
              setUserDialog((prev) => ({ ...prev, open }))
            }
            user={userDialog.user}
            getRoleInfo={getRoleInfo}
            getStatusColor={getStatusColor}
          />
          <DialogAddTeam
            open={addDialog.open}
            mode={addDialog.mode}
            user={addDialog.user}
            onClose={() =>
              setAddDialog({ open: false, mode: "add", user: null })
            }
            onSave={handleSave}
            departments={departments}
            roles={roles}
          />
        </main>
      </div>
    </div>
  );
}
