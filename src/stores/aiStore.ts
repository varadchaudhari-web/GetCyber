import { create } from "zustand";
import { AI_MESSAGES } from "@/constants/mockData";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AIState {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
  sessionId: string;
  sendMessage: (content: string) => Promise<void>;
  setInput: (value: string) => void;
  clearChat: () => void;
}

const AI_RESPONSES = [
  "Based on your current threat landscape, I recommend prioritizing the SQL injection vulnerability on webapp-portal.techcorp.com. This has a CVSS score of 9.8 and is actively exploitable. I can generate a step-by-step remediation guide if needed.",
  "I've analyzed your recent security events. There's a pattern suggesting a potential APT group reconnaissance activity targeting your API endpoints. Would you like me to create a threat hunt playbook?",
  "Your compliance score can be improved by addressing 10 failed ISO 27001 controls. The most impactful improvements would be in Access Control (A.9) and Cryptography (A.10). I can generate an action plan.",
  "I've detected correlation between the brute force attack on your VPN and the phishing campaign targeting your finance team. This suggests a coordinated attack. Recommend elevating the incident priority to P1.",
  "Based on your vulnerability trends, your risk score should decrease by approximately 15 points if you remediate the 3 critical vulnerabilities within the next 7 days. Would you like a detailed remediation timeline?",
  "I can help you generate an executive security briefing report for your board meeting. The report will include risk posture overview, key incidents, compliance status, and strategic recommendations. Shall I proceed?",
];

let responseIndex = 0;

export const useAIStore = create<AIState>((set, get) => ({
  messages: AI_MESSAGES as Message[],
  isTyping: false,
  inputValue: "",
  sessionId: `ai_sess_${Date.now()}`,

  sendMessage: async (content: string) => {
    const userMessage: Message = {
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    set((state) => ({
      messages: [...state.messages, userMessage],
      isTyping: true,
      inputValue: "",
    }));

    await new Promise((r) => setTimeout(r, 1500 + Math.random() * 1000));

    const aiResponse: Message = {
      role: "assistant",
      content: AI_RESPONSES[responseIndex % AI_RESPONSES.length],
      timestamp: new Date().toISOString(),
    };
    responseIndex++;

    set((state) => ({
      messages: [...state.messages, aiResponse],
      isTyping: false,
    }));
  },

  setInput: (value) => set({ inputValue: value }),

  clearChat: () =>
    set({
      messages: [AI_MESSAGES[0] as Message],
      sessionId: `ai_sess_${Date.now()}`,
    }),
}));
