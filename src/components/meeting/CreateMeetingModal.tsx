"use client";

import React from "react";
import { X } from "lucide-react";
import { Meeting } from "@/lib/meetings/DataMeeting";

type CreateMeetingModalProps = {
  show: boolean;
  newMeeting: any;
  setNewMeeting: (v: any) => void;
  onClose: () => void;
  onCreate: () => void;
};

const CreateMeetingModal: React.FC<CreateMeetingModalProps> = ({
  show,
  newMeeting,
  setNewMeeting,
  onClose,
  onCreate,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">
            Buat Meeting Baru
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Judul */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Meeting
            </label>
            <input
              type="text"
              value={newMeeting.title}
              onChange={(e) =>
                setNewMeeting({ ...newMeeting, title: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Masukkan judul meeting..."
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              value={newMeeting.description}
              onChange={(e) =>
                setNewMeeting({ ...newMeeting, description: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Deskripsi meeting..."
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
                value={newMeeting.date}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, date: e.target.value })
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
                value={newMeeting.startTime}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, startTime: e.target.value })
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
                value={newMeeting.endTime}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, endTime: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tipe Meeting & Recurring */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipe Meeting
              </label>
              <select
                value={newMeeting.type}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, type: e.target.value })
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
                Recurring
              </label>
              <select
                value={newMeeting.recurring}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, recurring: e.target.value })
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
                id="isOnline"
                checked={newMeeting.isOnline}
                onChange={(e) =>
                  setNewMeeting({ ...newMeeting, isOnline: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label
                htmlFor="isOnline"
                className="text-sm font-medium text-gray-700"
              >
                Meeting Online
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {newMeeting.isOnline ? "Meeting Link" : "Lokasi"}
                </label>
                <input
                  type="text"
                  value={
                    newMeeting.isOnline
                      ? newMeeting.meetingLink
                      : newMeeting.location
                  }
                  onChange={(e) =>
                    setNewMeeting({
                      ...newMeeting,
                      [newMeeting.isOnline ? "meetingLink" : "location"]:
                        e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={
                    newMeeting.isOnline
                      ? "https://zoom.us/j/..."
                      : "Meeting Room A"
                  }
                />
              </div>
            </div>
          </div>

          {/* Peserta */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Peserta (email, pisahkan dengan koma)
            </label>
            <textarea
              onChange={(e) =>
                setNewMeeting({
                  ...newMeeting,
                  participants: e.target.value
                    .split(",")
                    .map((email: string) => email.trim())
                    .filter((email: string) => email),
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={2}
              placeholder="sarah@pkc.com, ahmad@pkc.com, budi@pkc.com"
            />
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agenda Meeting
            </label>
            <div className="space-y-2">
              {newMeeting.agenda.map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newAgenda = [...newMeeting.agenda];
                      newAgenda[index] = e.target.value;
                      setNewMeeting({ ...newMeeting, agenda: newAgenda });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Agenda item ${index + 1}...`}
                  />
                  {newMeeting.agenda.length > 1 && (
                    <button
                      onClick={() => {
                        const newAgenda = newMeeting.agenda.filter(
                          (_: string, i: number) => i !== index
                        );
                        setNewMeeting({ ...newMeeting, agenda: newAgenda });
                      }}
                      className="text-red-600 hover:text-red-700 p-1"
                      type="button"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  setNewMeeting({
                    ...newMeeting,
                    agenda: [...newMeeting.agenda, ""],
                  })
                }
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                type="button"
              >
                + Tambah Agenda
              </button>
            </div>
          </div>

          {/* Catatan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan Tambahan
            </label>
            <textarea
              value={newMeeting.notes}
              onChange={(e) =>
                setNewMeeting({ ...newMeeting, notes: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Catatan atau instruksi khusus untuk meeting..."
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-8">
          <button
            onClick={onCreate}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Buat Meeting
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

export default CreateMeetingModal;
