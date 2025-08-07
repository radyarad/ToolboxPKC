"use client";

import React from "react";
import { ArrowLeft, Eye, Save, RefreshCw } from "lucide-react";

interface AddMeetingHeaderProps {
  onBack?: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const AddMeetingHeader: React.FC<AddMeetingHeaderProps> = ({
  onBack,
  onSave,
  isSaving,
}) => (
  <header className=" border-b border-gray-200 dark:border-gray-200/20 px-4 sm:px-6 py-4 top-0 z-40">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center space-x-4">
        <button
          className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100"
          onClick={onBack}
          type="button"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl font-bold">Buat Meeting Baru</h1>
          <p className="text-sm text-muted-foreground">
            Atur detail meeting dan undang peserta
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-200 border border-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-200/20">
          <Eye className="h-4 w-4" />
          <span className="hidden sm:inline">Preview</span>
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center space-x-2 bg-primary text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <>
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              <span className="hidden sm:inline">Simpan Meeting</span>
            </>
          )}
        </button>
      </div>
    </div>
  </header>
);

export default AddMeetingHeader;
