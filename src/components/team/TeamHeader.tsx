"use client";
import { Search, UserPlus } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TeamHeader({
  searchQuery,
  setSearchQuery,
  selectedDepartment,
  setSelectedDepartment,
  departments,
  onAdd,
}) {
  return (
    <header className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Team Management</h1>
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              className="px-3 py-1 rounded-lg text-sm font-medium bg-green-100 text-green-700"
              disabled
            >
              Team Members
            </button>
            <button
              className="px-3 py-1 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-200"
              disabled
            >
              Departments
            </button>
            <button
              className="px-3 py-1 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-200"
              disabled
            >
              Roles & Permissions
            </button>
          </nav>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-gray-100 text-muted-foreground rounded-lg px-3 py-2">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Cari anggota tim..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-48"
            />
          </div>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Departement" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Departement</SelectLabel>
                <SelectItem value="all">Semua Departemen</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <button
            onClick={onAdd}
            className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 cursor-pointer transition-colors"
            type="button"
          >
            <UserPlus className="h-4 w-4" />
            <span className="text-sm font-medium">Tambah Anggota</span>
          </button>
        </div>
      </div>
    </header>
  );
}
