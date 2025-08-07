import React, { useState } from "react";
import { Bell, X, Check, AlertCircle, Info, Calendar } from "lucide-react";

// Mock shadcn UI components - dalam implementasi asli, import dari @/components/ui
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  asChild,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const DropdownMenu = ({ children, open, onOpenChange }) => {
  return <div className="relative inline-block text-left">{children}</div>;
};

const DropdownMenuTrigger = ({ children }) => {
  return <div>{children}</div>;
};

const DropdownMenuContent = ({
  children,
  align = "center",
  className = "",
}) => {
  return (
    <div
      className={`absolute z-50 min-w-[320px] overflow-hidden rounded-md border bg-background shadow-lg ${
        align === "end" ? "right-0" : "left-0"
      } mt-2 ${className}`}
    >
      {children}
    </div>
  );
};

// Komponen Notifikasi untuk Navbar
export default function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Pesan baru dari Admin",
      description: "Anda memiliki update penting tentang sistem",
      time: "5 menit yang lalu",
      type: "info",
      isRead: false,
    },
    {
      id: 2,
      title: "Tugas selesai",
      description: "Backup database telah berhasil diselesaikan",
      time: "1 jam yang lalu",
      type: "success",
      isRead: false,
    },
    {
      id: 3,
      title: "Peringatan sistem",
      description: "Penggunaan CPU mencapai 85%",
      time: "2 jam yang lalu",
      type: "warning",
      isRead: true,
    },
    {
      id: 4,
      title: "Meeting reminder",
      description: "Daily standup dalam 15 menit",
      time: "3 jam yang lalu",
      type: "reminder",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, isRead: true }))
    );
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "reminder":
        return <Calendar className="h-4 w-4 text-blue-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          size="icon"
          className="relative p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      {isOpen && (
        <DropdownMenuContent align="end" className="w-80">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-lg text-foreground">
              Notifikasi
            </h3>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs h-7 px-2 text-muted-foreground hover:text-foreground"
              >
                Tandai semua
              </Button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Tidak ada notifikasi</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b last:border-b-0 border-border hover:bg-accent/50 transition-colors ${
                    !notification.isRead ? "bg-accent/30" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium leading-tight ${
                              !notification.isRead
                                ? "font-semibold text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {notification.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {!notification.isRead && (
                            <div className="h-2 w-2 bg-primary rounded-full flex-shrink-0"></div>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                            onClick={() => removeNotification(notification.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-muted-foreground">
                          {notification.time}
                        </p>
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs h-6 px-2 text-primary hover:bg-primary/10"
                          >
                            Tandai dibaca
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-border bg-accent/20">
              <Button
                variant="ghost"
                className="w-full text-sm text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setIsOpen(false);
                  // Di sini Anda bisa navigate ke halaman notifikasi lengkap
                  console.log("Navigate to notifications page");
                }}
              >
                Lihat semua notifikasi
              </Button>
            </div>
          )}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}

// Demo navbar untuk menunjukkan penggunaan
function DemoNavbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-border shadow-sm">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-foreground">My App</h1>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">Hi, John!</span>
        <NotificationButton />
      </div>
    </nav>
  );
}

// Export untuk demo
export { DemoNavbar };
