"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";

interface BottomActionBarProps {
  formData: any;
  isSaving: boolean;
  handleSave: () => void;
}

const BottomActionBar: React.FC<BottomActionBarProps> = ({
  formData,
  isSaving,
  handleSave,
}) => {
  return (
    <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-4 mt-8 -mx-4 sm:-mx-6 lg:-mx-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 sm:block hidden"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-gray-900 truncate">
                {formData.title || "Meeting Baru"}
              </div>
              <div className="text-xs text-gray-500">
                {formData.participants.length} peserta •{" "}
                {formData.agenda.filter((item: string) => item.trim()).length}{" "}
                agenda
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors order-2 sm:order-1"
            >
              <span className="sm:hidden">Template</span>
              <span className="hidden sm:inline">Simpan sebagai Template</span>
            </button>
            <button
              type="button"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors order-3 sm:order-2"
            >
              Preview
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-1 sm:order-3"
            >
              {isSaving ? "Menyimpan..." : "Buat Meeting"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomActionBar;
