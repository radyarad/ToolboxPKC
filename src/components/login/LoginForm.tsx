"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // For demo purposes, always redirect to dashboard
    // In a real app, you would check credentials here
    router.push("/dashboard");

    setIsLoading(false);
    console.log("Login successful, redirecting to dashboard");
  };

  return (
    <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Selamat Datang Kembali
        </CardTitle>
        <CardDescription className="text-gray-600">
          Masuk ke akun Anda untuk mengakses toolbox
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="space-y-2 text-black">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="nama@pupukkujang.com"
                className="pl-10 h-12"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2 text-black">
            <Label htmlFor="password" className="text-black">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 h-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="text-black">Ingat saya</span>
            </label>
            <a href="#" className="text-green-600 hover:text-green-700">
              Lupa password?
            </a>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-green-600 to-yellow-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Memproses...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                Masuk <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Belum punya akun? Hubungi administrator IT
            </p>
            <div className="text-xs text-gray-500">
              Untuk akses baru, silakan menghubungi tim IT internal
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
