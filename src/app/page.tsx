import EngagementHome from "@/components/EngagementHome";
import InformationTable from "@/components/InformationTable";
import QuickAction from "@/components/QuickAction";
import Image from "next/image";

export default function Home() {
  return (
    <div className="grid pl-2 space-y-6">
      <div className="mt-4">
        <h1 className="text-3xl font-bold space-y-1">
          Selamat Datang di Web Toolbox PKC 🔨
        </h1>
        <p>Mulai meeting, notulensi, dan task disini</p>
      </div>
      {/* Engagement Card */}
      <EngagementHome />
      {/* Informatioan Table */}
      <InformationTable />
      {/* Quick Action */}
      <QuickAction />
    </div>
  );
}
