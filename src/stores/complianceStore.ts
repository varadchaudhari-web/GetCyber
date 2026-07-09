import { create } from "zustand";
import type { ComplianceFramework } from "@/types";
import { MOCK_COMPLIANCE } from "@/constants/mockData";

interface ComplianceState {
  frameworks: ComplianceFramework[];
  selectedFramework: ComplianceFramework | null;
  overallScore: number;
  nextAuditDate: string;
  setSelected: (framework: ComplianceFramework | null) => void;
  updateFramework: (id: string, updates: Partial<ComplianceFramework>) => void;
  addEvidence: (frameworkId: string, controlId: string, evidence: string) => void;
  getOverallScore: () => number;
}

export const useComplianceStore = create<ComplianceState>((set, get) => ({
  frameworks: MOCK_COMPLIANCE,
  selectedFramework: null,
  overallScore: 83,
  nextAuditDate: "2026-09-15",

  setSelected: (framework) => set({ selectedFramework: framework }),

  updateFramework: (id, updates) =>
    set((state) => ({
      frameworks: state.frameworks.map((f) =>
        f.id === id ? { ...f, ...updates } : f
      ),
    })),

  addEvidence: (_frameworkId, _controlId, _evidence) => {
    // Mock implementation
    console.log("Evidence added");
  },

  getOverallScore: () => {
    const { frameworks } = get();
    const total = frameworks.reduce((sum, f) => sum + f.score, 0);
    return Math.round(total / frameworks.length);
  },
}));
