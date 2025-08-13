"use client";
import { Calendar, FileText, Plus, Users } from "lucide-react";
import Link from "next/link";

export default function QuickAction() {
  return (
    <div className="mb-3 sm:mb-5">
      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Link href="/task">
          <button className="flex w-full items-center space-x-2 sm:space-x-3 p-3 sm:p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 dark:border-gray-100/20 dark:hover:border-blue-400/20 dark:hover:bg-blue-200/20 transition-colors group cursor-pointer">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-blue-100 rounded-lg flex items-center justify-center group cursor-pointer-hover:bg-blue-200">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-sm sm:text-base">
                Buat Task Baru
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Tambah task untuk tim
              </p>
            </div>
          </button>
        </Link>

        <Link href={"/meeting"}>
          <button className="flex w-full items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-100/20 hover:border-purple-200 dark:hover:border-purple-400/20 hover:bg-purple-50 dark:hover:bg-purple-200/20 transition-colors group cursor-pointer">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-sm sm:text-base">
                Jadwalkan Meeting
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Atur meeting baru
              </p>
            </div>
          </button>
        </Link>

        <Link href="/meetings/addMeeting">
          <button className="flex w-full items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-100/20 hover:border-green-200 dark:hover:border-green-400/20 hover:bg-green-50 dark:hover:bg-green-200/20 transition-colors group cursor-pointer">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-sm sm:text-base">
                Buat Notulensi
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Tulis notulensi meeting
              </p>
            </div>
          </button>
        </Link>

        <Link href="/team">
          <button className="flex w-full items-center space-x-2 sm:space-x-3 p-3 sm:p-4 bg-white dark:bg-black rounded-lg border border-gray-100 dark:border-gray-100/20 hover:border-indigo-200 dark:hover:border-indigo-400/20 hover:bg-indigo-50 dark:hover:bg-indigo-200/20 transition-colors group cursor-pointer">
            <div className="h-8 w-8 sm:h-10 sm:w-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-200">
              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
            </div>
            <div className="text-left">
              <h4 className="font-medium text-sm sm:text-base">Kelola Tim</h4>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Assign dan monitor
              </p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}
