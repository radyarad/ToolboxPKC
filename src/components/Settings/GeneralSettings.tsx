import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Clock, Save, RefreshCw } from "lucide-react";
import { SettingsSection } from "./SettingsSection";
import type {
  GeneralSettingsType,
  SettingsActions,
} from "@/lib/Settings/settings";

interface GeneralSettingsProps {
  settings: GeneralSettingsType;
  setSettings: (settings: GeneralSettingsType) => void;
  actions: SettingsActions;
}

const dayTranslations = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
} as const;

export const GeneralSettings = ({
  settings,
  setSettings,
  actions,
}: GeneralSettingsProps) => {
  const handleWorkingDayChange = (day: string, checked: boolean) => {
    const newDays = checked
      ? [...settings.workingDays, day]
      : settings.workingDays.filter((d) => d !== day);
    setSettings({ ...settings, workingDays: newDays });
  };

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Informasi Perusahaan"
        description="Konfigurasi dasar informasi perusahaan"
        icon={<Building2 className="w-5 h-5 text-green-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">Nama Perusahaan</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  companyName: e.target.value,
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <select
              id="timezone"
              className="w-full h-10 px-3 border border-gray-200 rounded-md focus:border-yellow-500 focus:ring-yellow-500 dark:bg-card"
              value={settings.timezone}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  timezone: e.target.value,
                })
              }
            >
              <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
              <option value="Asia/Makassar">Asia/Makassar (WITA)</option>
              <option value="Asia/Jayapura">Asia/Jayapura (WIT)</option>
            </select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyAddress">Alamat Perusahaan</Label>
          <Textarea
            id="companyAddress"
            value={settings.companyAddress}
            onChange={(e) =>
              setSettings({
                ...settings,
                companyAddress: e.target.value,
              })
            }
            rows={2}
          />
        </div>
      </SettingsSection>

      <SettingsSection
        title="Jam Kerja"
        description="Atur hari dan jam kerja perusahaan"
        icon={<Clock className="w-5 h-5 text-green-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Jam Mulai Kerja</Label>
            <Input
              type="time"
              value={settings.workingHours.start}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  workingHours: {
                    ...settings.workingHours,
                    start: e.target.value,
                  },
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Jam Selesai Kerja</Label>
            <Input
              type="time"
              value={settings.workingHours.end}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  workingHours: {
                    ...settings.workingHours,
                    end: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
        <div className="space-y-3">
          <Label>Hari Kerja</Label>
          <div className="flex flex-wrap gap-3">
            {Object.entries(dayTranslations).map(([day, translation]) => (
              <label
                key={day}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={settings.workingDays.includes(day)}
                  onChange={(e) =>
                    handleWorkingDayChange(day, e.target.checked)
                  }
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                />
                <span className="text-sm capitalize">{translation}</span>
              </label>
            ))}
          </div>
        </div>
        <Button
          onClick={() => actions.handleSave("general")}
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
