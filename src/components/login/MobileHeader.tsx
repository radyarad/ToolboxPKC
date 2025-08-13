import { Building2 } from "lucide-react";

export default function MobileHeader() {
  return (
    <div className="lg:hidden text-center mb-8">
      <Building2 className="w-12 h-12 mx-auto text-yellow-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-900">Web Toolbox PKC</h1>
      <p className="text-gray-600 mt-2">Task Management System</p>
    </div>
  );
}
