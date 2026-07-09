import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Shield, LayoutDashboard, AlertTriangle, Target, Activity,
  FileText, Database, Bot, GraduationCap, BarChart3,
  Building2, Settings, Bell, User, LogOut, ChevronLeft,
  ChevronRight, Search, Zap, Eye, Lock, Users, Briefcase,
  Server, ClipboardList, Scale, Key, Layers, Network,
  MonitorCheck, CreditCard, BookOpen, Flag
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { useNotificationStore } from "@/stores/notificationStore";
import { cn, formatRoleLabel } from "@/lib/utils";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  badgeColor?: string;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

function getSectionsForRole(role: string): SidebarSection[] {
  switch (role) {
    case "individual":
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Security",
          items: [
            { id: "assets", label: "My Assets", icon: Database, path: "/dashboard/assets" },
            { id: "vulnerabilities", label: "Security Scans", icon: AlertTriangle, path: "/dashboard/vulnerabilities", badge: 5, badgeColor: "bg-cyber-red" },
            { id: "threats", label: "Threat Alerts", icon: Activity, path: "/dashboard/threats", badge: 3, badgeColor: "bg-cyber-orange" },
            { id: "incidents", label: "Incident Reports", icon: Zap, path: "/dashboard/incidents" },
          ],
        },
        {
          title: "Tools",
          items: [
            { id: "ai", label: "AI Assistant", icon: Bot, path: "/dashboard/ai" },
            { id: "training", label: "Training", icon: GraduationCap, path: "/dashboard/training" },
            { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/reports" },
          ],
        },
      ];

    case "business_owner":
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Organization",
          items: [
            { id: "organization", label: "Organization", icon: Building2, path: "/dashboard/organization" },
            { id: "team", label: "Team Management", icon: Users, path: "/dashboard/organization" },
          ],
        },
        {
          title: "Security Operations",
          items: [
            { id: "assets", label: "Asset Management", icon: Database, path: "/dashboard/assets" },
            { id: "vulnerabilities", label: "Vulnerabilities", icon: AlertTriangle, path: "/dashboard/vulnerabilities", badge: 12, badgeColor: "bg-cyber-red" },
            { id: "pentesting", label: "Penetration Testing", icon: Target, path: "/dashboard/pentesting" },
            { id: "threats", label: "Threat Intelligence", icon: Activity, path: "/dashboard/threats", badge: 6, badgeColor: "bg-cyber-purple" },
            { id: "incidents", label: "Incident Response", icon: Zap, path: "/dashboard/incidents", badge: 4, badgeColor: "bg-cyber-orange" },
          ],
        },
        {
          title: "Governance",
          items: [
            { id: "compliance", label: "Compliance", icon: Lock, path: "/dashboard/compliance" },
            { id: "analytics", label: "Risk Management", icon: BarChart3, path: "/dashboard/analytics" },
            { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/reports" },
          ],
        },
        {
          title: "Tools",
          items: [
            { id: "ai", label: "AI Assistant", icon: Bot, path: "/dashboard/ai" },
            { id: "admin", label: "Billing", icon: CreditCard, path: "/dashboard/admin" },
          ],
        },
      ];

    case "security_analyst":
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Threat Operations",
          items: [
            { id: "monitoring", label: "Threat Monitoring", icon: MonitorCheck, path: "/dashboard/monitoring", badge: 8, badgeColor: "bg-cyber-red" },
            { id: "vulnerabilities", label: "Vulnerabilities", icon: AlertTriangle, path: "/dashboard/vulnerabilities", badge: 12, badgeColor: "bg-cyber-red" },
            { id: "incidents", label: "Incident Response", icon: Zap, path: "/dashboard/incidents", badge: 5, badgeColor: "bg-cyber-orange" },
            { id: "threats", label: "Threat Intelligence", icon: Activity, path: "/dashboard/threats", badge: 6, badgeColor: "bg-cyber-purple" },
          ],
        },
        {
          title: "Analysis",
          items: [
            { id: "analytics", label: "Security Analytics", icon: BarChart3, path: "/dashboard/analytics" },
            { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/reports" },
          ],
        },
        {
          title: "Tools",
          items: [
            { id: "ai", label: "AI Assistant", icon: Bot, path: "/dashboard/ai" },
          ],
        },
      ];

    case "pen_tester":
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Assessment",
          items: [
            { id: "pentesting", label: "Assessment Projects", icon: Target, path: "/dashboard/pentesting" },
            { id: "vulnerabilities", label: "Findings", icon: AlertTriangle, path: "/dashboard/vulnerabilities", badge: 9, badgeColor: "bg-cyber-red" },
            { id: "incidents", label: "Evidence", icon: ClipboardList, path: "/dashboard/incidents" },
            { id: "monitoring", label: "Test Execution", icon: Server, path: "/dashboard/monitoring" },
          ],
        },
        {
          title: "Reports",
          items: [
            { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/reports" },
            { id: "ai", label: "AI Assistant", icon: Bot, path: "/dashboard/ai" },
          ],
        },
      ];

    case "compliance_officer":
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Compliance",
          items: [
            { id: "compliance", label: "Compliance Dashboard", icon: Lock, path: "/dashboard/compliance" },
            { id: "analytics", label: "Frameworks", icon: Layers, path: "/dashboard/analytics" },
            { id: "vulnerabilities", label: "Risk Management", icon: AlertTriangle, path: "/dashboard/vulnerabilities" },
            { id: "organization", label: "Policy Management", icon: BookOpen, path: "/dashboard/organization" },
          ],
        },
        {
          title: "Audit & Evidence",
          items: [
            { id: "incidents", label: "Audit Management", icon: ClipboardList, path: "/dashboard/incidents" },
            { id: "monitoring", label: "Evidence", icon: Eye, path: "/dashboard/monitoring" },
            { id: "reports", label: "Compliance Reports", icon: FileText, path: "/dashboard/reports" },
          ],
        },
        {
          title: "Tools",
          items: [
            { id: "ai", label: "AI Assistant", icon: Bot, path: "/dashboard/ai" },
          ],
        },
      ];

    case "enterprise_admin":
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Organization",
          items: [
            { id: "organization", label: "Organization Mgmt", icon: Building2, path: "/dashboard/organization" },
            { id: "admin", label: "User Management", icon: Users, path: "/dashboard/admin" },
            { id: "monitoring", label: "Role Management", icon: Key, path: "/dashboard/monitoring" },
          ],
        },
        {
          title: "Infrastructure",
          items: [
            { id: "assets", label: "Assets", icon: Database, path: "/dashboard/assets" },
            { id: "vulnerabilities", label: "Vulnerabilities", icon: AlertTriangle, path: "/dashboard/vulnerabilities", badge: 12, badgeColor: "bg-cyber-red" },
            { id: "compliance", label: "Security Policies", icon: Lock, path: "/dashboard/compliance" },
          ],
        },
        {
          title: "Analytics",
          items: [
            { id: "analytics", label: "Security Analytics", icon: BarChart3, path: "/dashboard/analytics" },
            { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/reports" },
          ],
        },
      ];

    case "platform_admin":
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Platform",
          items: [
            { id: "admin", label: "User Management", icon: Users, path: "/dashboard/admin" },
            { id: "organization", label: "Organizations", icon: Building2, path: "/dashboard/organization" },
            { id: "monitoring", label: "Platform Monitoring", icon: MonitorCheck, path: "/dashboard/monitoring", badge: 2, badgeColor: "bg-cyber-red" },
          ],
        },
        {
          title: "Operations",
          items: [
            { id: "threats", label: "Security Operations", icon: Shield, path: "/dashboard/threats" },
            { id: "analytics", label: "Audit Logs", icon: ClipboardList, path: "/dashboard/analytics" },
            { id: "vulnerabilities", label: "API Management", icon: Network, path: "/dashboard/vulnerabilities" },
          ],
        },
        {
          title: "Configuration",
          items: [
            { id: "compliance", label: "Feature Management", icon: Flag, path: "/dashboard/compliance" },
            { id: "incidents", label: "System Config", icon: Settings, path: "/dashboard/incidents" },
            { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/reports" },
          ],
        },
      ];

    default:
      // Fallback — generic security analyst view
      return [
        {
          title: "Overview",
          items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
        },
        {
          title: "Security Operations",
          items: [
            { id: "vulnerabilities", label: "Vulnerabilities", icon: AlertTriangle, path: "/dashboard/vulnerabilities", badge: 12, badgeColor: "bg-cyber-red" },
            { id: "incidents", label: "Incidents", icon: Zap, path: "/dashboard/incidents", badge: 8, badgeColor: "bg-cyber-orange" },
            { id: "threats", label: "Threat Intel", icon: Activity, path: "/dashboard/threats", badge: 6, badgeColor: "bg-cyber-purple" },
            { id: "pentesting", label: "Pen Testing", icon: Target, path: "/dashboard/pentesting" },
          ],
        },
        {
          title: "Governance",
          items: [
            { id: "compliance", label: "Compliance", icon: Lock, path: "/dashboard/compliance" },
            { id: "assets", label: "Asset Management", icon: Database, path: "/dashboard/assets" },
            { id: "reports", label: "Reports", icon: FileText, path: "/dashboard/reports" },
            { id: "analytics", label: "Analytics", icon: BarChart3, path: "/dashboard/analytics" },
          ],
        },
        {
          title: "Tools",
          items: [
            { id: "ai", label: "AI Assistant", icon: Bot, path: "/dashboard/ai" },
            { id: "training", label: "Cyber Awareness", icon: GraduationCap, path: "/dashboard/training" },
            { id: "monitoring", label: "Monitoring", icon: Eye, path: "/dashboard/monitoring" },
          ],
        },
        {
          title: "Organization",
          items: [
            { id: "organization", label: "Organization", icon: Building2, path: "/dashboard/organization" },
            { id: "admin", label: "Administration", icon: Settings, path: "/dashboard/admin" },
          ],
        },
      ];
  }
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { unreadCount, togglePanel } = useNotificationStore();

  const role = user?.role || "security_analyst";
  const sections = getSectionsForRole(role);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={cn(
        "flex flex-col bg-dark-surface border-r border-dark-border transition-all duration-300 h-screen sticky top-0 z-40",
        collapsed ? "w-[70px]" : "w-[260px]"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-dark-border min-h-[64px]">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-cyber-blue/20 rounded-lg flex items-center justify-center border border-cyber-blue/40">
              <Shield className="w-4 h-4 text-cyber-blue" />
            </div>
            <span className="font-bold text-lg text-white tracking-tight">
              Get<span className="text-gradient-blue">Cyber</span>
            </span>
          </Link>
        )}
        {collapsed && (
          <div className="w-8 h-8 mx-auto bg-cyber-blue/20 rounded-lg flex items-center justify-center border border-cyber-blue/40">
            <Shield className="w-4 h-4 text-cyber-blue" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn("p-1.5 rounded-lg text-dark-text hover:text-white hover:bg-dark-card/60 transition-all duration-200", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-3 py-3 border-b border-dark-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-dark-text" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-dark-card/50 border border-dark-border rounded-lg pl-8 pr-3 py-1.5 text-xs text-dark-text-bright placeholder-dark-text focus:outline-none focus:border-cyber-blue/50 transition-all"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="text-xs font-semibold text-dark-text/50 uppercase tracking-wider px-3 py-2 mt-2">
                {section.title}
              </p>
            )}
            {section.items.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={cn("sidebar-item group relative", isActive && "sidebar-item-active")}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-cyber-blue" : "text-dark-text group-hover:text-white")} />
                  {!collapsed && (
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className={cn("text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center", item.badgeColor || "bg-cyber-blue")}>
                      {item.badge}
                    </span>
                  )}
                  {collapsed && item.badge && (
                    <span className={cn("absolute top-0.5 right-0.5 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center text-[10px]", item.badgeColor || "bg-cyber-blue")}>
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="border-t border-dark-border p-2 space-y-0.5">
        <button
          onClick={togglePanel}
          className={cn("sidebar-item w-full relative", collapsed && "justify-center")}
        >
          <Bell className="w-4 h-4 text-dark-text" />
          {!collapsed && <span className="text-sm font-medium flex-1 text-left">Notifications</span>}
          {unreadCount > 0 && (
            <span className={cn(
              "text-white text-xs font-bold px-1.5 py-0.5 rounded-full bg-cyber-red",
              collapsed ? "absolute top-0.5 right-0.5 text-[10px] w-4 h-4 flex items-center justify-center px-0" : ""
            )}>
              {unreadCount}
            </span>
          )}
        </button>

        <Link to="/dashboard/profile" className={cn("sidebar-item", collapsed && "justify-center")}>
          <User className="w-4 h-4 text-dark-text" />
          {!collapsed && <span className="text-sm font-medium">Profile</span>}
        </Link>

        <Link to="/dashboard/admin" className={cn("sidebar-item", collapsed && "justify-center")}>
          <Settings className="w-4 h-4 text-dark-text" />
          {!collapsed && <span className="text-sm font-medium">Settings</span>}
        </Link>

        <button
          onClick={handleLogout}
          className={cn("sidebar-item w-full text-cyber-red/80 hover:text-cyber-red hover:bg-cyber-red/10", collapsed && "justify-center")}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
        </button>
      </div>

      {/* User Info */}
      {!collapsed && user && (
        <div className="border-t border-dark-border p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center text-cyber-blue font-bold text-sm flex-shrink-0">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-dark-text truncate">{formatRoleLabel(user.role)}</p>
            </div>
            <div className="w-2 h-2 rounded-full bg-cyber-green flex-shrink-0" title="Online" />
          </div>
        </div>
      )}
    </aside>
  );
}
