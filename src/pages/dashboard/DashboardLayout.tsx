import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import NotificationPanel from "@/components/shared/NotificationPanel";
import { useAuthStore } from "@/stores/authStore";

export default function DashboardLayout() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-dark-bg">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <NotificationPanel />
    </div>
  );
}
