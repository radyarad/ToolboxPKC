"use client";

import React from "react";
import { X } from "lucide-react";

type EditMeetingModalProps = {
  show: boolean;
  editMeeting: any;
  setEditMeeting: (v: any) => void;
  onClose: () => void;
  onSave: () => void;
};

const EditMeetingModal: React.FC<EditMeetingModalProps> = ({
  show,
  editMeeting,
  setEditMeeting,
  onClose,
  onSave,
}) => {
  if (!show || !editMeeting) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Edit Meeting</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Judul Meeting */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Meeting
            </label>
            <input
              type="text"
              value={editMeeting.title}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={editMeeting.description}
              onChange={(e) =>
                setEditMeeting({
                  ...editMeeting,
                  description: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          {/* Tanggal, Mulai, Selesai */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tanggal
              </label>
              <input
                type="date"
                value={editMeeting.date}
                onChange={(e) =>
                  setEditMeeting({ ...editMeeting, date: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mulai
              </label>
              <input
                type="time"
                value={editMeeting.startTime}
                onChange={(e) =>
                  setEditMeeting({
                    ...editMeeting,
                    startTime: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selesai
              </label>
              <input
                type="time"
                value={editMeeting.endTime}
                onChange={(e) =>
                  setEditMeeting({ ...editMeeting, endTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tipe Meeting, Status, Recurring */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Meeting
              </label>
              <select
                value={editMeeting.type}
                onChange={(e) =>
                  setEditMeeting({ ...editMeeting, type: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="regular">Regular</option>
                <option value="important">Important</option>
                <option value="recurring">Recurring</option>
                <option value="technical">Technical</option>
                <option value="event">Event</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={editMeeting.status}
                onChange={(e) =>
                  setEditMeeting({ ...editMeeting, status: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="confirmed">Confirmed</option>
                <option value="tentative">Tentative</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recurring
              </label>
              <select
                value={editMeeting.recurring}
                onChange={(e) =>
                  setEditMeeting({
                    ...editMeeting,
                    recurring: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="none">Tidak Berulang</option>
                <option value="daily">Harian</option>
                <option value="weekly">Mingguan</option>
                <option value="monthly">Bulanan</option>
              </select>
            </div>
          </div>

          {/* Online/Offline & Lokasi/Link */}
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <input
                type="checkbox"
                id="editIsOnline"
                checked={editMeeting.isOnline}
                onChange={(e) =>
                  setEditMeeting({
                    ...editMeeting,
                    isOnline: e.target.checked,
                  })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="editIsOnline"
                className="text-sm font-medium text-gray-700"
              >
                Meeting Online
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {editMeeting.isOnline ? "Meeting Link" : "Lokasi"}
              </label>
              <input
                type="text"
                value={
                  editMeeting.isOnline
                    ? editMeeting.meetingLink
                    : editMeeting.location
                }
                onChange={(e) =>
                  setEditMeeting({
                    ...editMeeting,
                    [editMeeting.isOnline ? "meetingLink" : "location"]:
                      e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan Tambahan
            </label>
            <textarea
              value={editMeeting.notes || ""}
              onChange={(e) =>
                setEditMeeting({ ...editMeeting, notes: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Catatan atau instruksi khusus untuk meeting..."
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            onClick={onSave}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Simpan Perubahan
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMeetingModal;
