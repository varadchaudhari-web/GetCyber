import { create } from "zustand";
import type { Incident, IncidentEvent, SeverityLevel, StatusType } from "@/types";
import { MOCK_INCIDENTS } from "@/constants/mockData";
import { useDashboardStore } from "./dashboardStore";

interface IncidentState {
  incidents: Incident[];
  selectedIncident: Incident | null;
  filter: { severity?: SeverityLevel; status?: StatusType; search: string };
  addIncident: (incident: Omit<Incident, "id" | "timeline">) => void;
  updateIncident: (id: string, updates: Partial<Incident>) => void;
  closeIncident: (id: string, resolution: string) => void;
  addTimelineEvent: (incidentId: string, event: Omit<IncidentEvent, "id">) => void;
  setSelected: (incident: Incident | null) => void;
  setFilter: (filter: Partial<IncidentState["filter"]>) => void;
  getFilteredIncidents: () => Incident[];
}

export const useIncidentStore = create<IncidentState>((set, get) => ({
  incidents: MOCK_INCIDENTS,
  selectedIncident: null,
  filter: { search: "" },

  addIncident: (incidentData) => {
    const newIncident: Incident = {
      ...incidentData,
      id: `inc_${Date.now()}`,
      timeline: [
        {
          id: `evt_${Date.now()}`,
          timestamp: new Date().toISOString(),
          action: "Incident Created",
          user: "System",
          details: "New incident created",
        },
      ],
    };
    set((state) => ({ incidents: [newIncident, ...state.incidents] }));
    useDashboardStore.getState().incrementStat("openIncidents");
  },

  updateIncident: (id, updates) =>
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === id ? { ...inc, ...updates, updatedAt: new Date().toISOString() } : inc
      ),
      selectedIncident: state.selectedIncident?.id === id
        ? { ...state.selectedIncident, ...updates }
        : state.selectedIncident,
    })),

  closeIncident: (id, resolution) => {
    get().updateIncident(id, {
      status: "closed",
      resolvedAt: new Date().toISOString(),
    });
    get().addTimelineEvent(id, {
      timestamp: new Date().toISOString(),
      action: "Incident Closed",
      user: "System",
      details: resolution,
    });
    useDashboardStore.getState().decrementStat("openIncidents");
  },

  addTimelineEvent: (incidentId, eventData) => {
    const newEvent: IncidentEvent = { ...eventData, id: `evt_${Date.now()}` };
    set((state) => ({
      incidents: state.incidents.map((inc) =>
        inc.id === incidentId
          ? { ...inc, timeline: [...inc.timeline, newEvent] }
          : inc
      ),
    }));
  },

  setSelected: (incident) => set({ selectedIncident: incident }),

  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),

  getFilteredIncidents: () => {
    const { incidents, filter } = get();
    return incidents.filter((inc) => {
      if (filter.severity && inc.severity !== filter.severity) return false;
      if (filter.status && inc.status !== filter.status) return false;
      if (filter.search && !inc.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  },
}));
