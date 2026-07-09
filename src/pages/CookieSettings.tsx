import { useState } from "react";
import { Cookie, Shield, BarChart3, Settings, CheckCircle, Info, Link as LinkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface CookieCategory {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  required: boolean;
  color: string;
  examples: string[];
}

const categories: CookieCategory[] = [
  {
    id: "essential",
    icon: Shield,
    title: "Essential Cookies",
    description: "These cookies are strictly necessary for the platform to function. They enable core features like authentication, session management, and security controls. They cannot be disabled.",
    required: true,
    color: "text-cyber-blue",
    examples: ["Session token (auth_session)", "CSRF protection token", "User preference language", "Security integrity check"],
  },
  {
    id: "analytics",
    icon: BarChart3,
    title: "Analytics Cookies",
    description: "These cookies help us understand how users interact with the platform, which features are most used, and where performance can be improved. All data is aggregated and anonymized.",
    required: false,
    color: "text-cyber-green",
    examples: ["Page visit tracking", "Feature usage frequency", "Session duration analysis", "Error rate monitoring"],
  },
  {
    id: "preferences",
    icon: Settings,
    title: "Preference Cookies",
    description: "These cookies remember your customizations and settings so you do not have to reconfigure them each visit. They improve your experience without tracking behavior across sites.",
    required: false,
    color: "text-cyber-purple",
    examples: ["Dashboard layout preference", "Sidebar collapsed state", "Theme selection", "Default date range filters"],
  },
];

const cookieTable = [
  { name: "gc_session", category: "Essential", duration: "Session", purpose: "Authentication session identifier" },
  { name: "gc_csrf", category: "Essential", duration: "Session", purpose: "Cross-site request forgery protection" },
  { name: "_gc_analytics", category: "Analytics", duration: "90 days", purpose: "Anonymized usage analytics" },
  { name: "gc_prefs", category: "Preferences", duration: "365 days", purpose: "User interface preferences" },
  { name: "gc_sidebar", category: "Preferences", duration: "365 days", purpose: "Sidebar collapse state" },
];

export default function CookieSettings() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    essential: true,
    analytics: true,
    preferences: true,
  });

  const handleToggle = (id: string) => {
    if (id === "essential") return;
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSave = () => {
    toast.success("Cookie preferences saved successfully.");
  };

  const handleAcceptAll = () => {
    setEnabled({ essential: true, analytics: true, preferences: true });
    toast.success("All cookies accepted.");
  };

  const handleRejectOptional = () => {
    setEnabled({ essential: true, analytics: false, preferences: false });
    toast.success("Optional cookies declined. Only essential cookies are active.");
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <section className="py-12 text-center relative overflow-hidden" id="hero">
        <div className="absolute inset-0 bg-glow-blue opacity-10" />
        <div className="relative max-w-3xl mx-auto px-4">
          <div className="w-14 h-14 bg-cyber-blue/10 border border-cyber-blue/30 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Cookie className="w-7 h-7 text-cyber-blue" />
          </div>
          <h1 className="text-4xl font-black text-white mb-3">Cookie Settings</h1>
          <p className="text-dark-text-bright mt-2 leading-relaxed max-w-2xl mx-auto">
            Control which cookies GetCyber uses on your browser. Essential cookies are always active. You can opt in or out of analytics and preference cookies at any time.
          </p>
        </div>
      </section>

      {/* Info Banner */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex items-start gap-3 p-4 bg-cyber-blue/5 border border-cyber-blue/20 rounded-xl">
          <Info className="w-4 h-4 text-cyber-blue flex-shrink-0 mt-0.5" />
          <p className="text-sm text-dark-text-bright leading-relaxed">
            GetCyber does not use advertising cookies, cross-site tracking pixels, or sell any cookie data to third parties.
            All optional cookies are used only to improve your experience on our platform.
            See our <Link to="/privacy#cookies" className="text-cyber-blue hover:underline">Privacy Policy</Link> for full details.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-4xl mx-auto px-4 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={handleAcceptAll} className="cyber-btn-primary flex-1 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" /> Accept All Cookies
          </button>
          <button onClick={handleRejectOptional} className="cyber-btn-secondary flex-1">
            Essential Only
          </button>
        </div>
      </div>

      {/* Cookie Categories */}
      <div className="max-w-4xl mx-auto px-4 space-y-4 mb-10">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isOn = enabled[cat.id];
          return (
            <div key={cat.id} className="glass-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-dark-card/60 border border-dark-border">
                    <Icon className={`w-4.5 h-4.5 ${cat.color}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{cat.title}</h3>
                    {cat.required && <span className="text-xs text-cyber-yellow">Always Active</span>}
                  </div>
                </div>
                {/* Toggle */}
                <label className={`relative inline-flex items-center ${cat.required ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}>
                  <input
                    type="checkbox"
                    checked={isOn}
                    onChange={() => handleToggle(cat.id)}
                    disabled={cat.required}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-6 bg-dark-card border border-dark-border rounded-full peer peer-checked:bg-cyber-blue peer-checked:border-cyber-blue transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-4" />
                </label>
              </div>
              <p className="text-dark-text text-sm leading-relaxed mb-4">{cat.description}</p>
              <div>
                <p className="text-xs text-dark-text uppercase tracking-wider mb-2 font-semibold">Examples</p>
                <div className="flex flex-wrap gap-2">
                  {cat.examples.map((ex) => (
                    <span key={ex} className="text-xs bg-dark-card border border-dark-border text-dark-text px-2.5 py-1 rounded-full">{ex}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cookie Table */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="glass-card p-6">
          <div className="flex items-center gap-2 mb-5">
            <LinkIcon className="w-4 h-4 text-cyber-cyan" />
            <h3 className="font-bold text-white">Specific Cookies Used</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Cookie Name</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {cookieTable.map((row) => (
                  <tr key={row.name}>
                    <td><span className="font-mono text-xs text-cyber-blue">{row.name}</span></td>
                    <td>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${
                        row.category === "Essential" ? "text-cyber-blue bg-cyber-blue/10 border-cyber-blue/30" :
                        row.category === "Analytics" ? "text-cyber-green bg-cyber-green/10 border-cyber-green/30" :
                        "text-cyber-purple bg-cyber-purple/10 border-cyber-purple/30"
                      }`}>{row.category}</span>
                    </td>
                    <td><span className="text-xs text-dark-text">{row.duration}</span></td>
                    <td><span className="text-xs text-dark-text-bright">{row.purpose}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-semibold text-sm mb-1">Save your preferences</p>
            <p className="text-dark-text text-xs">Your settings are saved locally and applied immediately.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="cyber-btn-primary px-6">Save Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
}
