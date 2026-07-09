import { create } from "zustand";
import type { ThreatIntel } from "@/types";
import { MOCK_THREAT_INTEL } from "@/constants/mockData";

interface ThreatState {
  threats: ThreatIntel[];
  selectedThreat: ThreatIntel | null;
  filter: { type?: string; severity?: string; relevance?: string; search: string };
  iocs: string[];
  alertsCount: number;
  setSelected: (threat: ThreatIntel | null) => void;
  setFilter: (filter: Partial<ThreatState["filter"]>) => void;
  getFilteredThreats: () => ThreatIntel[];
  markAsRead: (id: string) => void;
  addThreat: (threat: ThreatIntel) => void;
}

export const useThreatStore = create<ThreatState>((set, get) => ({
  threats: MOCK_THREAT_INTEL,
  selectedThreat: null,
  filter: { search: "" },
  iocs: ["192.168.100.50", "malware.exe", "c2-lockbit.onion", "apt29-phishing.com", "docusign-verify.com"],
  alertsCount: 6,

  setSelected: (threat) => set({ selectedThreat: threat }),

  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),

  getFilteredThreats: () => {
    const { threats, filter } = get();
    return threats.filter((t) => {
      if (filter.type && t.type !== filter.type) return false;
      if (filter.severity && t.severity !== filter.severity) return false;
      if (filter.relevance && t.relevance !== filter.relevance) return false;
      if (filter.search && !t.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  },

  markAsRead: (id) =>
    set((state) => ({
      threats: state.threats.map((t) =>
        t.id === id ? { ...t } : t
      ),
    })),

  addThreat: (threat) =>
    set((state) => ({
      threats: [threat, ...state.threats],
      alertsCount: state.alertsCount + 1,
    })),
}));
