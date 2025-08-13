"use client";

import React from "react";
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  RefreshCw,
  Video,
  MapPin,
  Edit,
  Trash2,
  Copy,
  Send,
} from "lucide-react";
import { Meeting } from "@/lib/scheduler/DataMeeting";
import { getTypeColor, getStatusColor } from "@/lib/scheduler/DataMeeting";

type MeetingDetailModalProps = {
  show: boolean;
  meeting: Meeting | null;
  onClose: () => void;
  onEdit: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
};

const MeetingDetailModal: React.FC<MeetingDetailModalProps> = ({
  show,
  meeting,
  onClose,
  onEdit,
  onDuplicate,
  onDelete,
}) => {
  if (!show || !meeting) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Detail Meeting
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {meeting.title}
            </h4>
            <p className="text-gray-600">{meeting.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">
                  Informasi Waktu
                </h5>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span>
                      {new Date(meeting.date).toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>
                      {meeting.startTime} - {meeting.endTime} WIB
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-gray-500" />
                    <span>
                      {meeting.recurring === "none"
                        ? "Tidak berulang"
                        : meeting.recurring}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Lokasi</h5>
                <div className="flex items-center space-x-2 text-sm">
                  {meeting.isOnline ? (
                    <>
                      <Video className="h-4 w-4 text-gray-500" />
                      <a
                        href={meeting.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        {meeting.meetingLink || "Online Meeting"}
                      </a>
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{meeting.location}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-900 mb-2">
                  Status & Tipe
                </h5>
                <div className="space-y-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      meeting.status
                    )}`}
                  >
                    {meeting.status}
                  </span>
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ml-2 ${getTypeColor(
                      meeting.type
                    )}`}
                  >
                    {meeting.type}
                  </span>
                </div>
              </div>

              <div>
                <h5 className="font-medium text-gray-900 mb-2">Organizer</h5>
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {meeting.organizer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <span className="text-sm">{meeting.organizer}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Peserta */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">
              Peserta ({meeting.participants.length})
            </h5>
            <div className="space-y-2">
              {meeting.participants.map((participant, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {participant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <span className="text-sm font-medium">
                        {participant.name}
                      </span>
                      <div className="text-xs text-gray-500">
                        {participant.email}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      participant.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : participant.status === "declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {participant.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div>
            <h5 className="font-medium text-gray-900 mb-3">Agenda Meeting</h5>
            <ul className="space-y-2">
              {meeting.agenda.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="flex-shrink-0 h-5 w-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          {meeting.notes && (
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Catatan</h5>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                {meeting.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-8">
          <button
            onClick={onEdit}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Edit Meeting</span>
          </button>
          <button
            onClick={onDuplicate}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>Duplikasi</span>
          </button>
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            // TODO: tambahkan logic kirim jika perlu
          >
            <Send className="h-4 w-4" />
            <span>Kirim</span>
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailModal;
