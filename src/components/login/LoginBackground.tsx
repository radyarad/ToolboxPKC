"use client";

import { useEffect, useState } from "react";
import { Building2, CheckCircle } from "lucide-react";
import { backgroundImages } from "@/lib/images";

export default function LoginBackground() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ganti background setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {backgroundImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(34, 197, 94, 0.85), rgba(234, 179, 8, 0.85)), url(${image})`,
          }}
        />
      ))}

      {/* Overlay Text */}
      <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
        <div className="text-center space-y-6 max-w-md">
          <Building2 className="w-16 h-16 mx-auto text-white" />
          <h1 className="text-4xl font-bold">Web Toolbox PKC</h1>
          <p className="text-xl opacity-90">
            Aplikasi Task Management untuk PT Pupuk Kujang
          </p>
          <div className="space-y-3 text-left">
            {[
              "Manajemen Task yang Efisien",
              "Reminder Meeting Otomatis",
              "Notulensi Digital & Export PDF",
              "Integrasi WhatsApp & Email",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentImageIndex
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
