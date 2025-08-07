"use client";

import React, { useState } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  Users,
  FileText,
  Plus,
  Bell,
  Search,
  MoreHorizontal,
  TrendingUp,
  AlertCircle,
  User,
} from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  // Data dummy untuk dashboard
  const stats = {
    totalTasks: 47,
    completedTasks: 32,
    pendingTasks: 15,
    meetings: 8,
    notes: 23,
  };

  const recentTasks = [
    {
      id: 1,
      title: "Review proposal marketing Q3",
      status: "completed",
      priority: "high",
      assignee: "Sarah K",
      dueDate: "2024-07-28",
    },
    {
      id: 2,
      title: "Persiapan meeting dengan klien",
      status: "in-progress",
      priority: "high",
      assignee: "Ahmad R",
      dueDate: "2024-07-29",
    },
    {
      id: 3,
      title: "Update dokumentasi proyek",
      status: "pending",
      priority: "medium",
      assignee: "Budi S",
      dueDate: "2024-07-30",
    },
    {
      id: 4,
      title: "Analisis data penjualan",
      status: "pending",
      priority: "low",
      assignee: "Siti M",
      dueDate: "2024-08-01",
    },
  ];

  const upcomingMeetings = [
    {
      id: 1,
      title: "Standup Meeting",
      time: "09:00",
      participants: 5,
      type: "daily",
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "14:00",
      participants: 8,
      type: "important",
    },
    {
      id: 3,
      title: "Team Review",
      time: "16:30",
      participants: 6,
      type: "weekly",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}

      <div className="p-6 pt-24">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang di Dashboard PKC
          </h2>
          <p className="text-gray-600">
            Kelola task, meeting, dan notulensi perusahaan dengan mudah
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Task</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalTasks}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                +12% dari minggu lalu
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Selesai</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completedTasks}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{
                    width: `${
                      (stats.completedTasks / stats.totalTasks) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pendingTasks}
                </p>
              </div>
              <div className="h-12 w-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm text-yellow-600">5 task urgent</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Meeting</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.meetings}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">3 hari ini</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Notulensi</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.notes}
                </p>
              </div>
              <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Bulan ini</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tasks */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Task Terbaru
                </h3>
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm font-medium">Tambah Task</span>
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`h-3 w-3 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      ></div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {task.title}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              task.status
                            )}`}
                          >
                            {task.status}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">
                            {task.assignee}
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">
                            {task.dueDate}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Lihat Semua Task
                </button>
              </div>
            </div>
          </div>

          {/* Upcoming Meetings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Meeting Hari Ini
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {meeting.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{meeting.time}</span>
                          <span>•</span>
                          <Users className="h-3 w-3" />
                          <span>{meeting.participants} orang</span>
                        </div>
                      </div>
                    </div>
                    {meeting.type === "important" && (
                      <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Lihat Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-colors group">
              <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200">
                <Plus className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Buat Task Baru</h4>
                <p className="text-sm text-gray-500">Tambah task untuk tim</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50 transition-colors group">
              <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Jadwalkan Meeting</h4>
                <p className="text-sm text-gray-500">Atur meeting baru</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-colors group">
              <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Buat Notulensi</h4>
                <p className="text-sm text-gray-500">Tulis notulensi meeting</p>
              </div>
            </button>

            <button className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-colors group">
              <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200">
                <Users className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <h4 className="font-medium text-gray-900">Kelola Tim</h4>
                <p className="text-sm text-gray-500">Assign dan monitor</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
