// lib/hooks/useSettings.ts
import { useState } from "react";
import type {
  GeneralSettingsType,
  EmailSettingsType,
  WhatsAppSettingsType,
  SystemSettingsType,
  SettingsActions,
} from "@/lib/Settings/settings";

export const useSettings = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Settings States
  const [generalSettings, setGeneralSettings] = useState<GeneralSettingsType>({
    companyName: "PT Pupuk Kujang",
    companyAddress: "Cikampek, Karawang, Jawa Barat",
    timezone: "Asia/Jakarta",
    language: "id",
    dateFormat: "DD/MM/YYYY",
    workingDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    workingHours: { start: "08:00", end: "17:00" },
  });

  const [emailSettings, setEmailSettings] = useState<EmailSettingsType>({
    smtpHost: "smtp.pupukkujang.com",
    smtpPort: "587",
    smtpUser: "noreply@pupukkujang.com",
    smtpPassword: "••••••••",
    fromEmail: "toolbox@pupukkujang.com",
    fromName: "Web Toolbox PKC",
    enableEmailNotifications: true,
    enableTaskReminders: true,
    enableMeetingReminders: true,
  });

  const [whatsappSettings, setWhatsappSettings] =
    useState<WhatsAppSettingsType>({
      apiUrl: "https://api.whatsapp.business/v1",
      apiToken: "••••••••••••••••",
      webhookUrl: "https://toolbox.pupukkujang.com/webhook/whatsapp",
      enableWhatsAppNotifications: true,
      enableTaskUpdates: true,
      enableMeetingReminders: true,
    });

  const [systemSettings, setSystemSettings] = useState<SystemSettingsType>({
    maxFileUploadSize: "10", // MB
    allowedFileTypes: ".pdf,.doc,.docx,.jpg,.png,.xlsx",
    autoBackup: true,
    backupFrequency: "daily",
    maintenanceMode: false,
    debugMode: false,
    logLevel: "info",
  });

  // Actions
  const handleSave = async (section: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would make actual API call based on section
      switch (section) {
        case "general":
          // await saveGeneralSettings(generalSettings);
          break;
        case "email":
          // await saveEmailSettings(emailSettings);
          break;
        case "whatsapp":
          // await saveWhatsAppSettings(whatsappSettings);
          break;
        case "system":
          // await saveSystemSettings(systemSettings);
          break;
        default:
          break;
      }

      console.log(`${section} settings saved`);
    } catch (error) {
      console.error(`Error saving ${section} settings:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackup = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // await backupDatabase();
      console.log("Database backup created");
    } catch (error) {
      console.error("Error creating backup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      // await restoreDatabase();
      console.log("Database restored");
    } catch (error) {
      console.error("Error restoring database:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const actions: SettingsActions = {
    handleSave,
    handleBackup,
    handleRestore,
    isLoading,
  };

  return {
    // Settings State
    generalSettings,
    setGeneralSettings,
    emailSettings,
    setEmailSettings,
    whatsappSettings,
    setWhatsappSettings,
    systemSettings,
    setSystemSettings,

    // Actions
    ...actions,
  };
};
