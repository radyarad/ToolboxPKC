// components/Settings/WhatsAppSettings.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  MessageSquare,
  Bell,
  AlertTriangle,
  Save,
  RefreshCw,
} from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import type {
  WhatsAppSettingsType,
  SettingsActions,
} from "@/lib/Settings/settings";

interface WhatsAppSettingsProps {
  settings: WhatsAppSettingsType;
  setSettings: (settings: WhatsAppSettingsType) => void;
  actions: SettingsActions;
}

export const WhatsAppSettings = ({
  settings,
  setSettings,
  actions,
}: WhatsAppSettingsProps) => {
  return (
    <div className="space-y-6">
      <SettingsSection
        title="WhatsApp Business API"
        description="Konfigurasi integrasi WhatsApp untuk notifikasi"
        icon={<MessageSquare className="w-5 h-5 text-green-600" />}
      >
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <p className="text-sm text-yellow-800">
              <strong>Perhatian:</strong> Fitur ini memerlukan WhatsApp Business
              API yang valid dan aktif.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiUrl">WhatsApp API URL</Label>
            <Input
              id="apiUrl"
              value={settings.apiUrl}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  apiUrl: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiToken">API Token</Label>
            <Input
              id="apiToken"
              type="password"
              value={settings.apiToken}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  apiToken: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="webhookUrl">Webhook URL</Label>
            <Input
              id="webhookUrl"
              value={settings.webhookUrl}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  webhookUrl: e.target.value,
                })
              }
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="WhatsApp Notifications"
        description="Kontrol notifikasi WhatsApp yang dikirim sistem"
        icon={<Bell className="w-5 h-5 text-green-600" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>WhatsApp Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan notifikasi WhatsApp
              </p>
            </div>
            <Switch
              checked={settings.enableWhatsAppNotifications}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  enableWhatsAppNotifications: checked,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Task Updates</Label>
              <p className="text-sm text-muted-foreground">
                Update progress task via WhatsApp
              </p>
            </div>
            <Switch
              checked={settings.enableTaskUpdates}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  enableTaskUpdates: checked,
                })
              }
            />
          </div>
        </div>
        <Button
          onClick={() => actions.handleSave("whatsapp")}
          disabled={actions.isLoading}
          className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700"
        >
          {actions.isLoading ? (
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Simpan Pengaturan
        </Button>
      </SettingsSection>
    </div>
  );
};
