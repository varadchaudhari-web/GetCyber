import { create } from "zustand";
import type { DashboardStats, ChartDataPoint } from "@/types";
import {
  MOCK_DASHBOARD_STATS,
  RISK_TREND_DATA,
  VULN_BY_SEVERITY,
  THREAT_ACTIVITY_DATA,
  COMPLIANCE_DATA,
  ASSET_BY_TYPE,
} from "@/constants/mockData";

interface DashboardState {
  stats: DashboardStats;
  riskTrend: ChartDataPoint[];
  vulnBySeverity: ChartDataPoint[];
  threatActivity: ChartDataPoint[];
  complianceData: ChartDataPoint[];
  assetByType: ChartDataPoint[];
  activeScans: number;
  recentAlerts: number;
  isRefreshing: boolean;
  lastUpdated: string;
  refreshDashboard: () => Promise<void>;
  updateStat: (key: keyof DashboardStats, value: number) => void;
  incrementStat: (key: keyof DashboardStats, amount?: number) => void;
  decrementStat: (key: keyof DashboardStats, amount?: number) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  stats: MOCK_DASHBOARD_STATS,
  riskTrend: RISK_TREND_DATA,
  vulnBySeverity: VULN_BY_SEVERITY,
  threatActivity: THREAT_ACTIVITY_DATA,
  complianceData: COMPLIANCE_DATA,
  assetByType: ASSET_BY_TYPE,
  activeScans: 3,
  recentAlerts: 7,
  isRefreshing: false,
  lastUpdated: new Date().toISOString(),

  refreshDashboard: async () => {
    set({ isRefreshing: true });
    await new Promise((r) => setTimeout(r, 1500));
    set({
      isRefreshing: false,
      lastUpdated: new Date().toISOString(),
      stats: {
        ...get().stats,
        riskScore: get().stats.riskScore + Math.floor(Math.random() * 6 - 3),
        activeThreats: get().stats.activeThreats + Math.floor(Math.random() * 4 - 2),
      },
    });
  },

  updateStat: (key, value) =>
    set((state) => ({ stats: { ...state.stats, [key]: value } })),

  incrementStat: (key, amount = 1) =>
    set((state) => ({
      stats: { ...state.stats, [key]: state.stats[key] + amount },
    })),

  decrementStat: (key, amount = 1) =>
    set((state) => ({
      stats: { ...state.stats, [key]: Math.max(0, state.stats[key] - amount) },
    })),
}));
