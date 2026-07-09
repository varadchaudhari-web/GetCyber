import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { MOCK_USER } from "@/constants/mockData";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  sessionId: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithMock: (role?: User["role"]) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

const generateSessionId = () => `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
      sessionId: null,

      login: async (email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1200));
        const mockUser: User = {
          ...MOCK_USER,
          email: email || MOCK_USER.email,
        };
        set({
          user: mockUser,
          isAuthenticated: true,
          isLoading: false,
          token: `gcyber_token_${Date.now()}`,
          sessionId: generateSessionId(),
        });
        return true;
      },

      loginWithMock: (role = "security_analyst") => {
        const roleConfigs: Record<User["role"], Partial<User>> = {
          individual: { name: "Jordan Smith", email: "jordan@example.com", plan: "free", organizationName: undefined },
          business_owner: { name: "David Wilson", email: "david@acmecorp.com", plan: "professional", organizationName: "Acme Corp", role: "business_owner" },
          security_analyst: { name: "Alex Morgan", email: "alex.morgan@getcyber.io", plan: "enterprise", organizationName: "TechCorp Industries", role: "security_analyst" },
          pen_tester: { name: "Sarah Chen", email: "sarah.chen@redteam.io", plan: "professional", role: "pen_tester" },
          compliance_officer: { name: "Mike Johnson", email: "mike.grc@techcorp.com", plan: "professional", role: "compliance_officer" },
          enterprise_admin: { name: "Elena Vasquez", email: "elena@enterprise.com", plan: "enterprise", role: "enterprise_admin" },
          platform_admin: { name: "Platform Admin", email: "admin@getcyber.io", plan: "enterprise", role: "platform_admin" },
        };
        const mockUser: User = { ...MOCK_USER, ...roleConfigs[role], role };
        set({
          user: mockUser,
          isAuthenticated: true,
          token: `gcyber_token_${Date.now()}`,
          sessionId: generateSessionId(),
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          token: null,
          sessionId: null,
        });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } });
        }
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: "getcyber-auth",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        sessionId: state.sessionId,
      }),
    }
  )
);
