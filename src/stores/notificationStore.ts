import { create } from "zustand";
import type { Notification } from "@/types";
import { MOCK_NOTIFICATIONS } from "@/constants/mockData";

interface NotificationState {
  notifications: Notification[];
  isOpen: boolean;
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  togglePanel: () => void;
  setOpen: (open: boolean) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: MOCK_NOTIFICATIONS,
  isOpen: false,
  unreadCount: MOCK_NOTIFICATIONS.filter((n) => !n.read).length,

  addNotification: (notifData) => {
    const newNotif: Notification = {
      ...notifData,
      id: `notif_${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    set((state) => ({
      notifications: [newNotif, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (id) => {
    const notif = get().notifications.find((n) => n.id === id);
    if (notif && !notif.read) {
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    }
  },

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    })),

  removeNotification: (id) => {
    const notif = get().notifications.find((n) => n.id === id);
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
      unreadCount: notif && !notif.read ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
    }));
  },

  togglePanel: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));
