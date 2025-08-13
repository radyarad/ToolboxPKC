import EngagementHome from "@/components/EngagementHome";
import InformationTable from "@/components/InformationTable";
import QuickAction from "@/components/QuickAction";

export default function Dashboard() {
  return (
    <div className="grid pl-2 sm:pl-4 lg:pl-6 space-y-4 sm:space-y-6">
      <div className="mt-2 sm:mt-4">
        <h1 className="text-2xl sm:text-3xl font-bold space-y-1">
          Selamat Datang di Web Toolbox PKC 🔨
        </h1>
        <p className="text-sm sm:text-base">
          Mulai meeting, notulensi, dan task disini
        </p>
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
