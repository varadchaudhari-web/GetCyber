import { useEffect, useRef } from "react";
import { Bot, Send, Trash2, Cpu, Loader2, Copy } from "lucide-react";
import { useAIStore } from "@/stores/aiStore";
import { formatDate, copyToClipboard } from "@/lib/utils";

const QUICK_PROMPTS = [
  "What are my most critical vulnerabilities?",
  "Analyze my current threat landscape",
  "Generate an executive security briefing",
  "How can I improve my compliance score?",
  "Explain the active ransomware incident",
  "What assets are at highest risk?",
];

export default function AIAssistant() {
  const { messages, isTyping, inputValue, sendMessage, setInput, clearChat } = useAIStore();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border bg-dark-surface flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyber-blue/20 rounded-xl border border-cyber-blue/40 flex items-center justify-center">
            <Bot className="w-5 h-5 text-cyber-blue" />
          </div>
          <div>
            <h1 className="font-bold text-white">GC-AI Security Assistant</h1>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="text-xs text-cyber-green">Online · Powered by GetCyber Intelligence Engine</span>
            </div>
          </div>
        </div>
        <button onClick={clearChat} className="cyber-btn-ghost flex items-center gap-2 text-sm">
          <Trash2 className="w-4 h-4" /> Clear Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === "assistant" ? "bg-cyber-blue/20 border border-cyber-blue/40" : "bg-dark-card border border-dark-border"}`}>
              {msg.role === "assistant" ? <Bot className="w-4 h-4 text-cyber-blue" /> : <span className="text-xs font-bold text-dark-text">You</span>}
            </div>
            <div className={`max-w-2xl group relative ${msg.role === "user" ? "items-end" : ""}`}>
              <div className={`rounded-xl p-4 text-sm leading-relaxed ${msg.role === "assistant" ? "bg-dark-card/60 border border-dark-border rounded-tl-sm" : "bg-cyber-blue/20 border border-cyber-blue/30 rounded-tr-sm"}`}>
                {msg.role === "assistant" ? (
                  <div className="text-dark-text-bright whitespace-pre-wrap">
                    {msg.content}
                  </div>
                ) : (
                  <p className="text-white">{msg.content}</p>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1 px-1">
                <span className="text-xs text-dark-text/60">{formatDate(msg.timestamp, "time")}</span>
                <button
                  onClick={() => copyToClipboard(msg.content)}
                  className="opacity-0 group-hover:opacity-100 text-dark-text hover:text-white transition-all p-0.5"
                >
                  <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-cyber-blue/20 border border-cyber-blue/40 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-cyber-blue" />
            </div>
            <div className="bg-dark-card/60 border border-dark-border rounded-xl rounded-tl-sm p-4">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-cyber-blue animate-spin" />
                <span className="text-dark-text text-sm">GC-AI is analyzing your security data...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-6 py-3 border-t border-dark-border bg-dark-surface flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {QUICK_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isTyping}
              className="whitespace-nowrap text-xs bg-dark-card border border-dark-border hover:border-cyber-blue/50 text-dark-text hover:text-white px-3 py-1.5 rounded-full transition-all flex-shrink-0"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-6 py-4 border-t border-dark-border bg-dark-surface flex-shrink-0">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isTyping}
              placeholder="Ask GC-AI about threats, vulnerabilities, incidents, compliance... (Shift+Enter for new line)"
              className="input-cyber resize-none min-h-[52px] max-h-32 pr-4"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={isTyping || !inputValue.trim()}
            className="cyber-btn-primary p-3 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-xs text-dark-text mt-2 flex items-center gap-1.5">
          <Cpu className="w-3 h-3" /> GC-AI uses your live security data for context-aware responses. Not a substitute for expert security advice.
        </p>
      </div>
    </div>
  );
}
