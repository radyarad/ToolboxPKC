export const meetingTypes = [
  {
    value: "regular",
    label: "Regular Meeting",
    color: "bg-gray-100 text-gray-700",
  },
  {
    value: "important",
    label: "Important Meeting",
    color: "bg-red-100 text-red-700",
  },
  {
    value: "recurring",
    label: "Recurring Meeting",
    color: "bg-blue-100 text-blue-700",
  },
  {
    value: "technical",
    label: "Technical Meeting",
    color: "bg-purple-100 text-purple-700",
  },
  {
    value: "event",
    label: "Event/Workshop",
    color: "bg-green-100 text-green-700",
  },
  {
    value: "client",
    label: "Client Meeting",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    value: "interview",
    label: "Interview",
    color: "bg-indigo-100 text-indigo-700",
  },
];

export const recurringOptions = [
  { value: "none", label: "Tidak Berulang" },
  { value: "daily", label: "Harian" },
  { value: "weekly", label: "Mingguan" },
  { value: "biweekly", label: "Dua Minggu Sekali" },
  { value: "monthly", label: "Bulanan" },
  { value: "custom", label: "Custom" },
];

export const priorityLevels = [
  { value: "low", label: "Low", color: "bg-gray-100 text-gray-700" },
  { value: "medium", label: "Medium", color: "bg-yellow-100 text-yellow-700" },
  { value: "high", label: "High", color: "bg-orange-100 text-orange-700" },
  { value: "urgent", label: "Urgent", color: "bg-red-100 text-red-700" },
];

export const reminderOptions = [
  { value: "0", label: "Tidak ada reminder" },
  { value: "5", label: "5 menit sebelum" },
  { value: "15", label: "15 menit sebelum" },
  { value: "30", label: "30 menit sebelum" },
  { value: "60", label: "1 jam sebelum" },
  { value: "1440", label: "1 hari sebelum" },
];
