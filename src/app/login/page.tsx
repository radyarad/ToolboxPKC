import LoginBackground from "@/components/login/LoginBackground";
import LoginForm from "@/components/login/LoginForm";
import MobileHeader from "@/components/login/MobileHeader";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      <LoginBackground />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12 bg-gradient-to-br from-green-50 to-yellow-50">
        <div className="w-full max-w-md space-y-6">
          <MobileHeader />
          <LoginForm />
          <div className="text-center text-sm text-gray-600 space-y-2">
            <p>© 2024 PT Pupuk Kujang. All rights reserved.</p>
            <p className="text-xs">
              Powered by Web Toolbox PKC - Task Management System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
