// components/Settings/SystemSettings.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, Shield, Save, RefreshCw } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import type {
  SystemSettingsType,
  SettingsActions,
} from "@/lib/Settings/settings";

interface SystemSettingsProps {
  settings: SystemSettingsType;
  setSettings: (settings: SystemSettingsType) => void;
  actions: SettingsActions;
}

export const SystemSettings = ({
  settings,
  setSettings,
  actions,
}: SystemSettingsProps) => {
  return (
    <div className="space-y-6">
      <SettingsSection
        title="File Upload"
        description="Konfigurasi upload file dan attachment"
        icon={<Upload className="w-5 h-5 text-green-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maxFileSize">Maksimal File Size (MB)</Label>
            <Input
              id="maxFileSize"
              type="number"
              value={settings.maxFileUploadSize}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  maxFileUploadSize: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="allowedTypes">File Types yang Diizinkan</Label>
            <Input
              id="allowedTypes"
              value={settings.allowedFileTypes}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  allowedFileTypes: e.target.value,
                })
              }
              placeholder=".pdf,.doc,.jpg,.png"
            />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        title="System Control"
        description="Kontrol sistem dan maintenance"
        icon={<Shield className="w-5 h-5 text-green-600" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Maintenance Mode</Label>
              <p className="text-sm text-muted-foreground">
                Matikan sementara akses user
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  maintenanceMode: checked,
                })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Debug Mode</Label>
              <p className="text-sm text-muted-foreground">
                Tampilkan informasi debug
              </p>
            </div>
            <Switch
              checked={settings.debugMode}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  debugMode: checked,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="logLevel">Log Level</Label>
            <select
              id="logLevel"
              className="w-full h-10 px-3 border border-gray-200 rounded-md focus:border-yellow-500 focus:ring-yellow-500 dark:bg-card"
              value={settings.logLevel}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  logLevel: e.target.value,
                })
              }
            >
              <option value="error">Error Only</option>
              <option value="warn">Warning & Error</option>
              <option value="info">Info, Warning & Error</option>
              <option value="debug">All (Debug Mode)</option>
            </select>
          </div>
        </div>
        <Button
          onClick={() => actions.handleSave("system")}
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
