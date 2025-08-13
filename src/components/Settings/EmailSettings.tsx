import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Mail, Bell, Save, RefreshCw } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import type {
  EmailSettingsType,
  SettingsActions,
} from "@/lib/Settings/settings";

interface EmailSettingsProps {
  settings: EmailSettingsType;
  setSettings: (settings: EmailSettingsType) => void;
  actions: SettingsActions;
}

export const EmailSettings = ({
  settings,
  setSettings,
  actions,
}: EmailSettingsProps) => {
  return (
    <div className="space-y-6">
      <SettingsSection
        title="Konfigurasi SMTP"
        description="Pengaturan server email untuk notifikasi"
        icon={<Mail className="w-5 h-5 text-green-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtpHost">SMTP Host</Label>
            <Input
              id="smtpHost"
              value={settings.smtpHost}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpHost: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPort">SMTP Port</Label>
            <Input
              id="smtpPort"
              value={settings.smtpPort}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpPort: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpUser">SMTP Username</Label>
            <Input
              id="smtpUser"
              value={settings.smtpUser}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpUser: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtpPassword">SMTP Password</Label>
            <Input
              id="smtpPassword"
              type="password"
              value={settings.smtpPassword}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  smtpPassword: e.target.value,
                })
              }
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="Email Notifications"
        description="Kontrol notifikasi email yang dikirim sistem"
        icon={<Bell className="w-5 h-5 text-green-600" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Aktifkan notifikasi email sistem
              </p>
            </div>
            <Switch
              checked={settings.enableEmailNotifications}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  enableEmailNotifications: checked,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Task Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Reminder untuk deadline task
              </p>
            </div>
            <Switch
              checked={settings.enableTaskReminders}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  enableTaskReminders: checked,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Meeting Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Reminder untuk jadwal meeting
              </p>
            </div>
            <Switch
              checked={settings.enableMeetingReminders}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  enableMeetingReminders: checked,
                })
              }
            />
          </div>
        </div>
        <Button
          onClick={() => actions.handleSave("email")}
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
