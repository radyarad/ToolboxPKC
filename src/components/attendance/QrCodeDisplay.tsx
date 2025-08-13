import { QrCode } from "lucide-react";
import type { Meeting } from "@/lib/attendance/meetingTypes";
import { generateQRData } from "@/lib/attendance/meetingHelpers";

interface QRCodeDisplayProps {
  meeting: Meeting;
}

export const QRCodeDisplay = ({ meeting }: QRCodeDisplayProps) => {
  const qrData = generateQRData(meeting);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
      <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
        <div className="text-center">
          <QrCode size={80} className="mx-auto mb-2 text-blue-600" />
          <div className="text-xs text-muted-foreground font-mono bg-gray-100 p-2 rounded">
            QR Code
            <br />
            Meeting ID: {meeting.id}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Scan QR code untuk absensi meeting
      </p>
    </div>
  );
};
