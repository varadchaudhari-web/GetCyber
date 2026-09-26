import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, User, Mail, Lock, Building2, CheckCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { GoogleIcon, MicrosoftIcon } from "@/components/icons/BrandIcons";
import { toast } from "sonner";
import type { User as UserType } from "@/types";

const ACCOUNT_TYPES: { role: UserType["role"]; title: string; desc: string; icon: string }[] = [
  { role: "individual", title: "Individual", desc: "Personal security monitoring", icon: "👤" },
  { role: "business_owner", title: "Business", desc: "Team & organization security", icon: "🏢" },
  { role: "security_analyst", title: "Security Pro", desc: "SOC operations & analysis", icon: "🔍" },
  { role: "pen_tester", title: "Pen Tester", desc: "Offensive security & red team", icon: "🎯" },
];

const steps = ["Account Type", "Your Details", "Organization", "Security Setup"];

export default function Register() {
  const [step, setStep] = useState(0);
  const [accountType, setAccountType] = useState<UserType["role"]>("security_analyst");
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", org: "", industry: "" });
  const { user, isAuthenticated, loginWithMock, logout, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleFinish = () => {
    loginWithMock(accountType);
    navigate("/dashboard");
  };

  const handleSSOSignup = (provider: "Microsoft" | "Google") => {
    toast.success(`Fast provisioning with ${provider} SSO...`);
    setTimeout(() => {
      loginWithMock(accountType);
      navigate("/dashboard");
    }, 600);
  };

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-cyber-blue/20 rounded-xl flex items-center justify-center border border-cyber-blue/40">
              <Shield className="w-5 h-5 text-cyber-blue" />
            </div>
            <span className="font-bold text-2xl text-white">Get<span className="text-gradient-blue">Cyber</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-dark-text text-sm mb-3">Join 10,000+ security professionals worldwide</p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/25 text-[11px] font-mono text-cyber-green">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span>Free 14-Day Enterprise Trial • No Credit Card Required</span>
          </div>
        </div>

        {isAuthenticated && user && (
          <div className="glass-card p-4 mb-6 border border-cyber-blue/40 bg-cyber-blue/10 text-center animate-fade-in">
            <p className="text-xs text-dark-text">You are currently signed in as</p>
            <p className="text-sm font-bold text-white mt-0.5">{user.name} <span className="text-xs font-normal text-cyber-blue">({user.email})</span></p>
            <div className="flex gap-2 mt-3 justify-center">
              <button
                onClick={() => navigate("/dashboard")}
                className="cyber-btn-primary text-xs py-1.5 px-3"
              >
                Go to Dashboard →
              </button>
              <button
                onClick={() => logout()}
                className="cyber-btn-secondary text-xs py-1.5 px-3"
              >
                Sign Out / Switch
              </button>
            </div>
          </div>
        )}

        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < step ? "bg-cyber-green text-dark-bg" : i === step ? "bg-cyber-blue text-white" : "bg-dark-card text-dark-text border border-dark-border"}`}>
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`w-10 h-px ${i < step ? "bg-cyber-green" : "bg-dark-border"}`} />}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-dark-text mb-6">{steps[step]}</p>

        <div className="glass-card p-8">
          {step === 0 && (
            <div className="space-y-3">
              <p className="text-dark-text text-sm mb-4">What best describes you?</p>
              {ACCOUNT_TYPES.map((at) => (
                <button
                  key={at.role}
                  onClick={() => setAccountType(at.role)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all text-left ${accountType === at.role ? "border-cyber-blue bg-cyber-blue/10" : "border-dark-border bg-dark-card/40 hover:border-dark-border-light"}`}
                >
                  <span className="text-2xl">{at.icon}</span>
                  <div>
                    <p className="font-semibold text-white text-sm">{at.title}</p>
                    <p className="text-dark-text text-xs">{at.desc}</p>
                  </div>
                  {accountType === at.role && <CheckCircle className="w-4 h-4 text-cyber-blue ml-auto" />}
                </button>
              ))}

              <div className="pt-4">
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-dark-border" />
                  <span className="text-dark-text text-xs tracking-wider uppercase font-medium">Or instant sign up with</span>
                  <div className="flex-1 h-px bg-dark-border" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSSOSignup("Microsoft")}
                    className="cyber-btn-secondary py-2.5 px-3 text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-[#00a4ef]/50 hover:bg-[#00a4ef]/10 transition-all group"
                  >
                    <MicrosoftIcon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-white">Microsoft</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSSOSignup("Google")}
                    className="cyber-btn-secondary py-2.5 px-3 text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-[#4285f4]/50 hover:bg-[#4285f4]/10 transition-all group"
                  >
                    <GoogleIcon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-white">Google</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="label-cyber">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input-cyber pl-10" placeholder="Alex Morgan" />
                </div>
              </div>
              <div>
                <label className="label-cyber">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                  <input value={form.email} onChange={(e) => update("email", e.target.value)} type="email" className="input-cyber pl-10" placeholder="you@company.com" />
                </div>
              </div>
              <div>
                <label className="label-cyber">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                  <input value={form.password} onChange={(e) => update("password", e.target.value)} type={showPass ? "text" : "password"} className="input-cyber pl-10 pr-10" placeholder="Min 12 characters" />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text hover:text-white">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="label-cyber">Organization Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                  <input value={form.org} onChange={(e) => update("org", e.target.value)} className="input-cyber pl-10" placeholder="TechCorp Industries" />
                </div>
              </div>
              <div>
                <label className="label-cyber">Industry</label>
                <select value={form.industry} onChange={(e) => update("industry", e.target.value)} className="input-cyber">
                  <option value="">Select industry</option>
                  {["Technology", "Financial Services", "Healthcare", "Government", "Education", "Retail", "Energy", "Legal"].map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div>
                <label className="label-cyber">Organization Size</label>
                <select className="input-cyber">
                  <option>1-50 employees</option>
                  <option>50-200 employees</option>
                  <option selected>200-1000 employees</option>
                  <option>1000+ employees</option>
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-dark-text text-sm">Enhance your account security with additional protection:</p>
              {[
                { label: "Enable Two-Factor Authentication (TOTP)", desc: "Recommended — adds an extra verification layer", checked: true },
                { label: "Security Alerts via Email", desc: "Get notified of suspicious activity", checked: true },
                { label: "Session Recording", desc: "Track all login sessions and activity", checked: false },
              ].map((opt) => (
                <div key={opt.label} className="flex items-start gap-3 p-4 bg-dark-card/40 border border-dark-border rounded-xl">
                  <input type="checkbox" defaultChecked={opt.checked} className="mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{opt.label}</p>
                    <p className="text-xs text-dark-text">{opt.desc}</p>
                  </div>
                </div>
              ))}
              <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-lg p-4 text-sm text-dark-text-bright">
                <CheckCircle className="w-4 h-4 text-cyber-green inline mr-2" />
                Your free trial includes 14 days of full Enterprise access
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="cyber-btn-secondary flex-1">Back</button>
            )}
            {step < steps.length - 1 ? (
              <button onClick={() => setStep(step + 1)} className="cyber-btn-primary flex-1">Continue</button>
            ) : (
              <button onClick={handleFinish} className="cyber-btn-primary flex-1 flex items-center justify-center gap-2" disabled={isLoading}>
                {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Creating account...</> : "Launch My Dashboard"}
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-dark-text text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyber-blue hover:text-cyber-blue-light font-medium transition-colors">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
