"use client";

import React, { useState } from "react";
import {
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  User,
  Users,
  Shield,
  Mail,
  Phone,
  MapPin,
  X,
  Eye,
  CheckCircle,
  UserPlus,
  Building,
  Crown,
  Star,
} from "lucide-react";

const TeamManagement = () => {
  const [activeTab, setActiveTab] = useState("members");
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUserDetail, setShowUserDetail] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Data dummy untuk team members
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Sarah Kusuma",
      email: "sarah.kusuma@pkc.com",
      phone: "+62 812-3456-7890",
      position: "Frontend Developer",
      department: "IT Development",
      role: "Admin",
      status: "active",
      avatar: "SK",
      joinDate: "2023-01-15",
      lastActive: "2024-07-30 14:30",
      tasksCompleted: 42,
      tasksInProgress: 3,
      meetingsAttended: 18,
      location: "Jakarta",
      skills: ["React", "TypeScript", "UI/UX Design"],
    },
    {
      id: 2,
      name: "Ahmad Rahman",
      email: "ahmad.rahman@pkc.com",
      phone: "+62 813-4567-8901",
      position: "Backend Developer",
      department: "IT Development",
      role: "Manager",
      status: "active",
      avatar: "AR",
      joinDate: "2022-08-20",
      lastActive: "2024-07-30 16:45",
      tasksCompleted: 38,
      tasksInProgress: 5,
      meetingsAttended: 22,
      location: "Bandung",
      skills: ["Node.js", "PostgreSQL", "API Design"],
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi.santoso@pkc.com",
      phone: "+62 814-5678-9012",
      position: "DevOps Engineer",
      department: "IT Infrastructure",
      role: "Employee",
      status: "active",
      avatar: "BS",
      joinDate: "2023-05-10",
      lastActive: "2024-07-30 13:20",
      tasksCompleted: 29,
      tasksInProgress: 2,
      meetingsAttended: 14,
      location: "Jakarta",
      skills: ["Docker", "Kubernetes", "AWS"],
    },
    {
      id: 4,
      name: "Dewi Lestari",
      email: "dewi.lestari@pkc.com",
      phone: "+62 815-6789-0123",
      position: "Security Specialist",
      department: "IT Security",
      role: "Manager",
      status: "active",
      avatar: "DL",
      joinDate: "2022-03-01",
      lastActive: "2024-07-30 15:10",
      tasksCompleted: 35,
      tasksInProgress: 4,
      meetingsAttended: 20,
      location: "Surabaya",
      skills: ["Cybersecurity", "Penetration Testing", "SIEM"],
    },
    {
      id: 5,
      name: "Eko Prasetyo",
      email: "eko.prasetyo@pkc.com",
      phone: "+62 816-7890-1234",
      position: "Database Administrator",
      department: "IT Infrastructure",
      role: "Employee",
      status: "inactive",
      avatar: "EP",
      joinDate: "2023-09-15",
      lastActive: "2024-07-28 09:30",
      tasksCompleted: 18,
      tasksInProgress: 1,
      meetingsAttended: 8,
      location: "Jakarta",
      skills: ["MySQL", "MongoDB", "Data Analytics"],
    },
    {
      id: 6,
      name: "Fitri Maharani",
      email: "fitri.maharani@pkc.com",
      phone: "+62 817-8901-2345",
      position: "Project Manager",
      department: "Project Management",
      role: "Manager",
      status: "active",
      avatar: "FM",
      joinDate: "2021-11-05",
      lastActive: "2024-07-30 17:00",
      tasksCompleted: 56,
      tasksInProgress: 8,
      meetingsAttended: 45,
      location: "Jakarta",
      skills: ["Agile", "Scrum", "Leadership"],
    },
  ]);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    role: "Employee",
    location: "",
  });

  const departments = [
    "IT Development",
    "IT Infrastructure",
    "IT Security",
    "Project Management",
    "Human Resources",
    "Finance",
    "Marketing",
  ];

  const roles = [
    { name: "Admin", color: "bg-red-100 text-red-700", icon: Crown },
    { name: "Manager", color: "bg-blue-100 text-blue-700", icon: Star },
    { name: "Employee", color: "bg-green-100 text-green-700", icon: User },
  ];

  const getRoleInfo = (role) => {
    return roles.find((r) => r.name === role) || roles[2];
  };

  const getStatusColor = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-700";
  };

  const handleAddUser = () => {
    if (newUser.name.trim() && newUser.email.trim()) {
      const user = {
        ...newUser,
        id: Date.now(),
        avatar: newUser.name
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
      };

      setTeamMembers((prev) => [...prev, user]);
      setNewUser({
        name: "",
        email: "",
        phone: "",
        position: "",
        department: "",
        role: "Employee",
        location: "",
      });
      setShowAddUser(false);
    }
  };

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.position.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || member.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Tambah Anggota Tim
          </h3>
          <button
            onClick={() => setShowAddUser(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nama lengkap..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="nama@pkc.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                No. Telepon
              </label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+62 812-3456-7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lokasi
              </label>
              <input
                type="text"
                value={newUser.location}
                onChange={(e) =>
                  setNewUser({ ...newUser, location: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Jakarta"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Posisi
            </label>
            <input
              type="text"
              value={newUser.position}
              onChange={(e) =>
                setNewUser({ ...newUser, position: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Frontend Developer"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Departemen
              </label>
              <select
                value={newUser.department}
                onChange={(e) =>
                  setNewUser({ ...newUser, department: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Pilih Departemen</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {roles.map((role) => (
                  <option key={role.name} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={handleAddUser}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Tambah Anggota
          </button>
          <button
            onClick={() => setShowAddUser(false)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );

  const UserDetailModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">
              Detail Anggota Tim
            </h3>
            <button
              onClick={() => setShowUserDetail(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {selectedUser.avatar}
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                {selectedUser.name}
              </h4>
              <p className="text-gray-600">{selectedUser.position}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    getRoleInfo(selectedUser.role).color
                  }`}
                >
                  {selectedUser.role}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    selectedUser.status
                  )}`}
                >
                  {selectedUser.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900">Informasi Kontak</h5>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {selectedUser.email}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {selectedUser.phone}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {selectedUser.location}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {selectedUser.department}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900">Statistik Kerja</h5>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Task Selesai</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser.tasksCompleted}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Task Aktif</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser.tasksInProgress}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Meeting Dihadiri
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser.meetingsAttended}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Bergabung</span>
                  <span className="text-sm font-medium text-gray-900">
                    {selectedUser.joinDate}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">Keahlian</h5>
            <div className="flex flex-wrap gap-2">
              {selectedUser.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Edit Profil
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Reset Password
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-900">Team Management</h1>
            <nav className="hidden lg:flex items-center space-x-1">
              <button
                onClick={() => setActiveTab("members")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "members"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Team Members
              </button>
              <button
                onClick={() => setActiveTab("departments")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "departments"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Departments
              </button>
              <button
                onClick={() => setActiveTab("roles")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === "roles"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Roles & Permissions
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Cari anggota tim..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Semua Departemen</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowAddUser(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span className="text-sm font-medium">Tambah Anggota</span>
            </button>
          </div>
        </div>
      </header>
      {/* Sidebar Navigation */}
      <div className="flex">
        {/* <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-blue-600 bg-blue-50 rounded-lg"
            >
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            >
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Task Management</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            >
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Meeting</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            >
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">Notulensi</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-lg"
            >
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Team</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
            >
              <Settings className="h-4 w-4" />
              <span className="text-sm font-medium">Settings</span>
            </a>
          </nav>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Anggota</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.length}
                  </p>
                </div>
                <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Aktif</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter((m) => m.status === "active").length}
                  </p>
                </div>
                <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Departemen</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {departments.length}
                  </p>
                </div>
                <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Admin</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {teamMembers.filter((m) => m.role === "Admin").length}
                  </p>
                </div>
                <div className="h-10 w-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Team Members Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Daftar Anggota Tim
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Kelola anggota tim, role, dan permissions
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Anggota
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Departemen
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Performance
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {member.avatar}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              {member.position}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {member.department}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {member.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {React.createElement(getRoleInfo(member.role).icon, {
                            className: "h-4 w-4 mr-2 text-gray-400",
                          })}
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              getRoleInfo(member.role).color
                            }`}
                          >
                            {member.role}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            member.status
                          )}`}
                        >
                          {member.status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Last active:{" "}
                          {new Date(member.lastActive).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="font-medium text-green-600">
                              {member.tasksCompleted}
                            </div>
                            <div className="text-xs text-gray-500">Selesai</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-blue-600">
                              {member.tasksInProgress}
                            </div>
                            <div className="text-xs text-gray-500">Aktif</div>
                          </div>
                          <div className="text-center">
                            <div className="font-medium text-purple-600">
                              {member.meetingsAttended}
                            </div>
                            <div className="text-xs text-gray-500">Meeting</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedUser(member);
                              setShowUserDetail(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-1"
                            title="Lihat Detail"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="text-gray-600 hover:text-gray-900 p-1"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Hapus"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600 p-1">
                            <MoreHorizontal className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Tidak ada anggota ditemukan
                </h3>
                <p className="text-gray-600">
                  Coba ubah filter atau kata kunci pencarian
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Add User Modal */}
      {showAddUser && <AddUserModal />}
      {/* User Detail Modal */}
      {showUserDetail && <UserDetailModal />}
    </div>
  );
};

export default TeamManagement;
