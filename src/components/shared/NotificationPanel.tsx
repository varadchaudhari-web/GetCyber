import { useRef, useEffect } from "react";
import { X, Bell, Check, AlertTriangle, Info, CheckCircle, AlertCircle, Trash2 } from "lucide-react";
import { useNotificationStore } from "@/stores/notificationStore";
import { formatDate, cn } from "@/lib/utils";
import type { Notification } from "@/types";

const typeConfig = {
  critical: { icon: AlertCircle, color: "text-cyber-red", bg: "bg-cyber-red/10 border-cyber-red/20" },
  alert: { icon: AlertTriangle, color: "text-cyber-orange", bg: "bg-cyber-orange/10 border-cyber-orange/20" },
  warning: { icon: AlertTriangle, color: "text-cyber-yellow", bg: "bg-cyber-yellow/10 border-cyber-yellow/20" },
  info: { icon: Info, color: "text-cyber-blue", bg: "bg-cyber-blue/10 border-cyber-blue/20" },
  success: { icon: CheckCircle, color: "text-cyber-green", bg: "bg-cyber-green/10 border-cyber-green/20" },
};

function NotificationItem({ notification }: { notification: Notification }) {
  const { markAsRead, removeNotification } = useNotificationStore();
  const config = typeConfig[notification.type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "flex gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer group",
        config.bg,
        !notification.read && "ring-1 ring-inset ring-current/20"
      )}
      onClick={() => markAsRead(notification.id)}
    >
      <Icon className={cn("w-4 h-4 flex-shrink-0 mt-0.5", config.color)} />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className={cn("text-sm font-semibold", !notification.read ? "text-white" : "text-dark-text-bright")}>
            {notification.title}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); removeNotification(notification.id); }}
            className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-cyber-red text-dark-text transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-xs text-dark-text mt-0.5 leading-relaxed">{notification.message}</p>
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-xs text-dark-text/60">{formatDate(notification.createdAt, "relative")}</span>
          <span className="text-xs bg-dark-card/50 px-2 py-0.5 rounded text-dark-text/60">{notification.module}</span>
        </div>
      </div>
      {!notification.read && (
        <div className="w-2 h-2 rounded-full bg-cyber-blue flex-shrink-0 mt-1" />
      )}
    </div>
  );
}

export default function NotificationPanel() {
  const { notifications, isOpen, setOpen, markAllAsRead, unreadCount } = useNotificationStore();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="fixed right-4 top-16 w-96 max-h-[600px] glass-card z-50 flex flex-col animate-slide-up"
    >
      <div className="flex items-center justify-between p-4 border-b border-dark-border">
        <div className="flex items-center gap-2">
          <Bell className="w-4.5 h-4.5 text-cyber-blue" />
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-cyber-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-cyber-blue hover:text-cyber-blue-light flex items-center gap-1 transition-colors"
            >
              <Check className="w-3 h-3" />
              Mark all read
            </button>
          )}
          <button onClick={() => setOpen(false)} className="p-1 hover:text-white text-dark-text transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-dark-text">
            <Bell className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map((n) => <NotificationItem key={n.id} notification={n} />)
        )}
      </div>

      <div className="p-3 border-t border-dark-border">
        <p className="text-xs text-dark-text text-center">
          {notifications.length} total notifications · {unreadCount} unread
        </p>
      </div>
    </div>
  );
}
