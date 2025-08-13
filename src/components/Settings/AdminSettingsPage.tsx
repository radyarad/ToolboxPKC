// components/Settings/AdminSettingsPage.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Database,
  Mail,
  MessageSquare,
  Shield,
  Building2,
  RefreshCw,
} from "lucide-react";
import { useSettings } from "@/lib/Settings/useSettings";
import { GeneralSettings } from "./GeneralSettings";
import { EmailSettings } from "./EmailSettings";
import { WhatsAppSettings } from "./WeA";
import { SystemSettings } from "./SystemSettings";
import { BackupSettings } from "./BackupSettings";
import type { SettingsTab } from "@/lib/Settings/settings";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const {
    generalSettings,
    setGeneralSettings,
    emailSettings,
    setEmailSettings,
    whatsappSettings,
    setWhatsappSettings,
    systemSettings,
    setSystemSettings,
    handleSave,
    handleBackup,
    handleRestore,
    isLoading,
  } = useSettings();

  const actions = {
    handleSave,
    handleBackup,
    handleRestore,
    isLoading,
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="shadow-sm border-b">
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-to-r from-green-600 to-yellow-600 rounded-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Admin Settings</h1>
                <p className="text-muted-foreground">
                  Konfigurasi sistem Web Toolbox PKC
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as SettingsTab)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">General</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Email</span>
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">System</span>
            </TabsTrigger>
            <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">Backup</span>
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general">
            <GeneralSettings
              settings={generalSettings}
              setSettings={setGeneralSettings}
              actions={actions}
            />
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email">
            <EmailSettings
              settings={emailSettings}
              setSettings={setEmailSettings}
              actions={actions}
            />
          </TabsContent>

          {/* WhatsApp Settings */}
          <TabsContent value="whatsapp">
            <WhatsAppSettings
              settings={whatsappSettings}
              setSettings={setWhatsappSettings}
              actions={actions}
            />
          </TabsContent>

          {/* System Settings */}
          <TabsContent value="system">
            <SystemSettings
              settings={systemSettings}
              setSettings={setSystemSettings}
              actions={actions}
            />
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup">
            <BackupSettings
              settings={systemSettings}
              setSettings={setSystemSettings}
              actions={actions}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
