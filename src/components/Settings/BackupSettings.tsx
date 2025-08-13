// components/Settings/BackupSettings.tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Database,
  CheckCircle,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import type {
  SystemSettingsType,
  SettingsActions,
} from "@/lib/Settings/settings";

interface BackupSettingsProps {
  settings: SystemSettingsType;
  setSettings: (settings: SystemSettingsType) => void;
  actions: SettingsActions;
}

export const BackupSettings = ({
  settings,
  setSettings,
  actions,
}: BackupSettingsProps) => {
  return (
    <div className="space-y-6">
      <SettingsSection
        title="Database Backup"
        description="Backup dan restore data sistem"
        icon={<Database className="w-5 h-5 text-green-600" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto Backup</Label>
              <p className="text-sm text-muted-foreground">
                Backup otomatis database
              </p>
            </div>
            <Switch
              checked={settings.autoBackup}
              onCheckedChange={(checked) =>
                setSettings({
                  ...settings,
                  autoBackup: checked,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="backupFreq">Frekuensi Backup</Label>
            <select
              id="backupFreq"
              className="w-full h-10 px-3 border border-gray-200 rounded-md focus:border-yellow-500 focus:ring-yellow-500 dark:bg-card"
              value={settings.backupFrequency}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  backupFrequency: e.target.value,
                })
              }
            >
              <option value="hourly">Setiap Jam</option>
              <option value="daily">Harian</option>
              <option value="weekly">Mingguan</option>
              <option value="monthly">Bulanan</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <Button
            onClick={actions.handleBackup}
            disabled={actions.isLoading}
            className="bg-gradient-to-r from-green-600 to-yellow-600 hover:from-green-700 hover:to-yellow-700"
          >
            {actions.isLoading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Backup Sekarang
          </Button>
          <Button
            variant="outline"
            onClick={actions.handleRestore}
            disabled={actions.isLoading}
            className="border-yellow-300 text-yellow-700 hover:bg-yellow-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            Restore Database
          </Button>
        </div>
      </SettingsSection>

      <SettingsSection
        title="System Information"
        description="Informasi sistem dan status"
        icon={<CheckCircle className="w-5 h-5 text-green-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-card dark:border dark:border-gray-200/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Database Status</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Connection:</span>
                <span className="text-green-600 font-medium">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Tables:</span>
                <span className="">15</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Backup:</span>
                <span className="">2 hours ago</span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-card dark:border dark:border-gray-200/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Storage Usage</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Database Size:</span>
                <span className="">245 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Files Storage:</span>
                <span className="">1.2 GB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Available Space:</span>
                <span className="text-green-600 font-medium">8.5 GB</span>
              </div>
            </div>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};
