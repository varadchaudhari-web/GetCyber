import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Shield,
  Search,
  Bell,
  Play,
  ChevronDown,
  Activity,
  Terminal,
  Zap,
  CheckCircle,
  Clock,
  Radio,
  User,
  LogOut,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { formatRoleLabel } from "@/lib/utils";
import type { User as UserType } from "@/types";

const ROLE_OPTIONS: { role: UserType["role"]; label: string; badge: string; color: string }[] = [
  { role: "security_analyst", label: "Security Analyst", badge: "SOC Operations", color: "text-cyber-blue" },
  { role: "pen_tester", label: "Pen Tester", badge: "Offensive / Red Team", color: "text-cyber-red" },
  { role: "compliance_officer", label: "Compliance Officer", badge: "GRC & Audit", color: "text-cyber-green" },
  { role: "business_owner", label: "Business Owner", badge: "Asset Governance", color: "text-cyber-yellow" },
  { role: "enterprise_admin", label: "Enterprise Admin", badge: "Platform Admin", color: "text-cyber-purple" },
  { role: "individual", label: "Individual User", badge: "Personal Security", color: "text-cyber-cyan" },
];

export default function DashboardTopBar() {
  const { user, loginWithMock, logout } = useAuthStore();
  const { unreadCount, togglePanel } = useNotificationStore();
  const [time, setTime] = useState({ utc: "", local: "" });
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        utc: now.toISOString().substring(11, 19) + " UTC",
        local: now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format breadcrumb from pathname
  const currentPath = location.pathname.replace("/dashboard", "").replace(/^\//, "");
  const pageTitle = currentPath
    ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1).replace("-", " ")
    : "Overview";

  const handleRoleSwitch = (role: UserType["role"]) => {
    loginWithMock(role);
    setRoleMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchVal.trim()) return;
    navigate(`/dashboard/vulnerabilities?q=${encodeURIComponent(searchVal)}`);
  };

  return (
    <header className="h-16 border-b border-dark-border/80 bg-dark-surface/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-30 flex-shrink-0 shadow-lg">
      {/* Left: Breadcrumbs & Live SOC Telemetry Status */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-dark-text hidden sm:inline">
            Console //
          </span>
          <h1 className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
            {pageTitle}
          </h1>
        </div>

        {/* Live SOC Status Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/30 text-[11px] font-mono text-cyber-green">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          <span className="font-semibold">DEFCON 5: NORMAL POSTURE</span>
          <span className="text-dark-text">|</span>
          <span className="text-dark-text-bright">128 SENSORS ONLINE</span>
        </div>
      </div>

      {/* Center: Command Palette / Global Search */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-md mx-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
          <input
            type="text"
            placeholder="Search CVEs, assets, threats, playbooks... (Press ↵)"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="w-full bg-[#070b16]/80 border border-dark-border/80 focus:border-cyber-blue text-xs text-white placeholder-dark-text pl-9 pr-14 py-2 rounded-lg outline-none transition-all focus:ring-1 focus:ring-cyber-blue/50"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono bg-dark-card/90 text-dark-text px-1.5 py-0.5 rounded border border-dark-border">
            ⌘K
          </kbd>
        </div>
      </form>

      {/* Right: SOC Timers, Scan Trigger, Notifications, Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Real-time clocks */}
        <div className="hidden xl:flex flex-col text-right font-mono text-[11px] leading-tight text-dark-text">
          <span className="text-white font-medium">{time.utc}</span>
          <span className="text-dark-text text-[10px]">{time.local} (Local)</span>
        </div>

        {/* Quick Launch Scan Button */}
        <button
          onClick={() => navigate("/dashboard/vulnerabilities")}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyber-blue text-white text-xs font-semibold hover:bg-cyber-blue-light transition-all shadow-glow-blue"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Launch Scan</span>
        </button>

        {/* Notification Bell with Badge */}
        <button
          onClick={togglePanel}
          className="relative p-2 rounded-lg bg-dark-card/60 hover:bg-dark-card border border-dark-border text-dark-text hover:text-white transition-all"
          title="Security Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-cyber-red text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Role Switcher & User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-dark-card/60 hover:bg-dark-card border border-dark-border transition-all"
          >
            <div className="w-7 h-7 rounded-md bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center text-cyber-blue font-bold text-xs">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-white leading-none truncate max-w-[100px]">
                {user?.name || "Security Officer"}
              </p>
              <p className="text-[10px] text-cyber-blue font-mono leading-none mt-1">
                {formatRoleLabel(user?.role || "security_analyst")}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-dark-text" />
          </button>

          {/* Role Switcher Dropdown */}
          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0f172a] border border-dark-border shadow-2xl p-2 z-50 animate-fade-in">
              <div className="px-3 py-2 border-b border-dark-border/60">
                <p className="text-[10px] uppercase font-mono tracking-wider text-dark-text">
                  Switch Active Role Persona
                </p>
                <p className="text-xs text-white font-bold mt-0.5">{user?.name}</p>
                <p className="text-[11px] text-cyber-blue font-mono">{user?.email}</p>
              </div>

              <div className="py-2 space-y-1">
                {ROLE_OPTIONS.map((opt) => (
                  <button
                    key={opt.role}
                    onClick={() => handleRoleSwitch(opt.role)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      user?.role === opt.role
                        ? "bg-cyber-blue/20 text-white font-semibold border border-cyber-blue/30"
                        : "text-dark-text hover:text-white hover:bg-dark-card"
                    }`}
                  >
                    <div>
                      <p className={opt.color}>{opt.label}</p>
                      <p className="text-[10px] text-dark-text">{opt.badge}</p>
                    </div>
                    {user?.role === opt.role && <CheckCircle className="w-4 h-4 text-cyber-blue" />}
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-dark-border/60 flex items-center justify-between px-2">
                <button
                  onClick={() => {
                    setRoleMenuOpen(false);
                    navigate("/dashboard/profile");
                  }}
                  className="text-xs text-dark-text hover:text-white flex items-center gap-1.5 py-1"
                >
                  <Settings className="w-3.5 h-3.5" /> Settings
                </button>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="text-xs text-cyber-red hover:underline flex items-center gap-1 py-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
