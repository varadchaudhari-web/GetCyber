import { create } from "zustand";
import type { Asset } from "@/types";
import { MOCK_ASSETS } from "@/constants/mockData";
import { useDashboardStore } from "./dashboardStore";

interface AssetState {
  assets: Asset[];
  selectedAsset: Asset | null;
  filter: { type?: string; status?: string; environment?: string; search: string };
  addAsset: (asset: Omit<Asset, "id">) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  removeAsset: (id: string) => void;
  setSelected: (asset: Asset | null) => void;
  setFilter: (filter: Partial<AssetState["filter"]>) => void;
  getFilteredAssets: () => Asset[];
  getHighRiskAssets: () => Asset[];
}

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: MOCK_ASSETS,
  selectedAsset: null,
  filter: { search: "" },

  addAsset: (assetData) => {
    const newAsset: Asset = { ...assetData, id: `ast_${Date.now()}` };
    set((state) => ({ assets: [newAsset, ...state.assets] }));
    useDashboardStore.getState().incrementStat("totalAssets");
  },

  updateAsset: (id, updates) =>
    set((state) => ({
      assets: state.assets.map((a) =>
        a.id === id ? { ...a, ...updates } : a
      ),
    })),

  removeAsset: (id) => {
    set((state) => ({ assets: state.assets.filter((a) => a.id !== id) }));
    useDashboardStore.getState().decrementStat("totalAssets");
  },

  setSelected: (asset) => set({ selectedAsset: asset }),

  setFilter: (filter) =>
    set((state) => ({ filter: { ...state.filter, ...filter } })),

  getFilteredAssets: () => {
    const { assets, filter } = get();
    return assets.filter((a) => {
      if (filter.type && a.type !== filter.type) return false;
      if (filter.status && a.status !== filter.status) return false;
      if (filter.environment && a.environment !== filter.environment) return false;
      if (filter.search && !a.name.toLowerCase().includes(filter.search.toLowerCase())) return false;
      return true;
    });
  },

  getHighRiskAssets: () =>
    get().assets.filter((a) => a.riskScore >= 70).sort((a, b) => b.riskScore - a.riskScore),
}));
