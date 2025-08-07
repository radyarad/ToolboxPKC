import React from "react";
import { Eye, Edit, Trash2, MapPin } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TeamTable({
  filteredMembers,
  getRoleInfo,
  getStatusColor,
  onViewDetail,
  onEdit,
}) {
  return (
    <div className=" rounded-xl shadow-sm border border-gray-200 dark:border-gray-200/20">
      <div className="p-6 border-b border-gray-200 dark:border-gray-200/20">
        <h3 className="text-lg font-semibold ">Daftar Anggota Tim</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola anggota tim, role, dan permissions
        </p>
      </div>
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Anggota
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Departemen
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Role
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Performance
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className=" divide-y divide-gray-200 dark:divide-gray-200/20">
            {filteredMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-accent">
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                      {member.avatar}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium">{member.name}</div>
                      <div className="text-sm ">{member.email}</div>
                      <div className="text-sm ">{member.position}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm ">{member.department}</div>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    {member.location}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getRoleInfo(member.role)?.icon &&
                      React.createElement(getRoleInfo(member.role).icon, {
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
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap">
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
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="font-medium text-green-600 dark:text-green-400">
                        {member.tasksCompleted}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Selesai
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-blue-600 dark:text-blue-400">
                        {member.tasksInProgress}
                      </div>
                      <div className="text-xs text-muted-foreground">Aktif</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-purple-600 dark:text-purple-400">
                        {member.meetingsAttended}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Meeting
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewDetail(member)}
                      className="text-primary hover:text-primary/90 p-1"
                      title="Lihat Detail"
                      type="button"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(member)}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 p-1"
                      title="Edit"
                      type="button"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {filteredMembers.length === 0 && (
        <div className="text-center py-8">
          <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium  mb-2">
            Tidak ada anggota ditemukan
          </h3>
          <p className="text-muted-foreground ">
            Coba ubah filter atau kata kunci pencarian
          </p>
        </div>
      )}
    </div>
  );
}
