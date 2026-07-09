import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SeverityLevel, StatusType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, format: "short" | "long" | "relative" | "time" = "short"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  
  if (format === "relative") {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString();
  }
  
  if (format === "time") {
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }
  
  if (format === "long") {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  }
  
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export function getSeverityClass(severity: SeverityLevel): string {
  const classes: Record<SeverityLevel, string> = {
    critical: "severity-critical",
    high: "severity-high",
    medium: "severity-medium",
    low: "severity-low",
    info: "severity-info",
  };
  return classes[severity] || "severity-info";
}

export function getStatusClass(status: StatusType): string {
  const classes: Record<StatusType, string> = {
    open: "status-open",
    in_progress: "status-in-progress",
    resolved: "status-resolved",
    closed: "status-closed",
    pending: "status-in-progress",
  };
  return classes[status] || "status-closed";
}

export function getSeverityColor(severity: SeverityLevel): string {
  const colors: Record<SeverityLevel, string> = {
    critical: "#EF4444",
    high: "#F97316",
    medium: "#F59E0B",
    low: "#22C55E",
    info: "#06B6D4",
  };
  return colors[severity] || "#94A3B8";
}

export function getRiskColor(score: number): string {
  if (score >= 80) return "#EF4444";
  if (score >= 60) return "#F97316";
  if (score >= 40) return "#F59E0B";
  return "#22C55E";
}

export function getRiskLabel(score: number): string {
  if (score >= 80) return "Critical";
  if (score >= 60) return "High";
  if (score >= 40) return "Medium";
  if (score >= 20) return "Low";
  return "Minimal";
}

export function formatStatusLabel(status: StatusType): string {
  const labels: Record<StatusType, string> = {
    open: "Open",
    in_progress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
    pending: "Pending",
  };
  return labels[status] || status;
}

export function formatRoleLabel(role: string): string {
  const labels: Record<string, string> = {
    individual: "Individual",
    business_owner: "Business Owner",
    security_analyst: "Security Analyst",
    pen_tester: "Penetration Tester",
    compliance_officer: "Compliance Officer",
    enterprise_admin: "Enterprise Admin",
    platform_admin: "Platform Admin",
  };
  return labels[role] || role;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateId(prefix = "id"): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function downloadJSON(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard.writeText(text);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export const SEVERITY_ORDER: Record<SeverityLevel, number> = {
  critical: 5,
  high: 4,
  medium: 3,
  low: 2,
  info: 1,
};

export function sortBySeverity<T extends { severity: SeverityLevel }>(items: T[]): T[] {
  return [...items].sort((a, b) => SEVERITY_ORDER[b.severity] - SEVERITY_ORDER[a.severity]);
}
