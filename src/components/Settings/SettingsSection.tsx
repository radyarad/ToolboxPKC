import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { SettingsSectionProps } from "@/lib/Settings/settings";

export const SettingsSection = ({
  title,
  description,
  children,
  icon,
}: SettingsSectionProps) => (
  <Card className="mb-6">
    <CardHeader>
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">{children}</CardContent>
  </Card>
);
