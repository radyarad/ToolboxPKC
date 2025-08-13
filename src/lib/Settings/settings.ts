// lib/types/settings.ts
export interface GeneralSettingsType {
  companyName: string;
  companyAddress: string;
  timezone: string;
  language: string;
  dateFormat: string;
  workingDays: string[];
  workingHours: {
    start: string;
    end: string;
  };
}

export interface EmailSettingsType {
  smtpHost: string;
  smtpPort: string;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName: string;
  enableEmailNotifications: boolean;
  enableTaskReminders: boolean;
  enableMeetingReminders: boolean;
}

export interface WhatsAppSettingsType {
  apiUrl: string;
  apiToken: string;
  webhookUrl: string;
  enableWhatsAppNotifications: boolean;
  enableTaskUpdates: boolean;
  enableMeetingReminders: boolean;
}

export interface SystemSettingsType {
  maxFileUploadSize: string;
  allowedFileTypes: string;
  autoBackup: boolean;
  backupFrequency: string;
  maintenanceMode: boolean;
  debugMode: boolean;
  logLevel: string;
}

export interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: React.ReactNode;
}

export type SettingsTab =
  | "general"
  | "email"
  | "whatsapp"
  | "system"
  | "backup";

export interface SettingsActions {
  handleSave: (section: string) => Promise<void>;
  handleBackup: () => Promise<void>;
  handleRestore: () => Promise<void>;
  isLoading: boolean;
}
