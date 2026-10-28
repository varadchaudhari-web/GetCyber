import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Shield,
  User,
  Mail,
  Lock,
  Building2,
  CheckCircle,
  Loader2,
  Eye,
  EyeOff,
  Phone,
  Sparkles,
  ArrowRight,
  Target,
  FileCheck,
  Cpu,
  KeyRound,
  Fingerprint,
  Check,
  Server,
  Zap,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { GoogleIcon, MicrosoftIcon } from "@/components/icons/BrandIcons";
import { toast } from "sonner";
import type { User as UserType } from "@/types";

interface AccountTypeOption {
  role: UserType["role"];
  title: string;
  badge: string;
  desc: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

const ACCOUNT_TYPES: AccountTypeOption[] = [
  {
    role: "individual",
    title: "Individual User",
    badge: "Personal",
    desc: "Personal device scanning, dark web identity monitoring & alert notifications.",
    icon: User,
    color: "text-cyber-cyan",
    bgColor: "bg-cyber-cyan/10",
    borderColor: "border-cyber-cyan/30",
  },
  {
    role: "business_owner",
    title: "Business Owner",
    badge: "Enterprise",
    desc: "Add digital assets, manage risks, track compliance & posture scorecards.",
    icon: Building2,
    color: "text-cyber-green",
    bgColor: "bg-cyber-green/10",
    borderColor: "border-cyber-green/30",
  },
  {
    role: "security_analyst",
    title: "Security Analyst",
    badge: "SOC Pro",
    desc: "Real-time threat feeds, incident triage, SIEM telemetry & executive reporting.",
    icon: Shield,
    color: "text-cyber-blue",
    bgColor: "bg-cyber-blue/10",
    borderColor: "border-cyber-blue/30",
  },
  {
    role: "pen_tester",
    title: "Penetration Tester",
    badge: "Red Team",
    desc: "Scope definition, exploit validation repository & automated retesting workflows.",
    icon: Target,
    color: "text-cyber-red",
    bgColor: "bg-cyber-red/10",
    borderColor: "border-cyber-red/30",
  },
  {
    role: "compliance_officer",
    title: "Compliance Officer",
    badge: "GRC",
    desc: "Audit management, ISO 27001/SOC 2 frameworks & automated evidence collection.",
    icon: FileCheck,
    color: "text-cyber-purple",
    bgColor: "bg-cyber-purple/10",
    borderColor: "border-cyber-purple/30",
  },
  {
    role: "enterprise_admin",
    title: "Enterprise Admin",
    badge: "Platform",
    desc: "Multi-tenant governance, organization policy enforcement & global RBAC.",
    icon: Server,
    color: "text-cyber-yellow",
    bgColor: "bg-cyber-yellow/10",
    borderColor: "border-cyber-yellow/30",
  },
];

const STEPS = ["Account Type", "Your Details", "Organization", "Security Setup"];

export default function Register() {
  const [step, setStep] = useState(0);
  const [accountType, setAccountType] = useState<UserType["role"]>("security_analyst");
  const [regMode, setRegMode] = useState<"email" | "otp">("email");
  const [showPass, setShowPass] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    org: "",
    industry: "",
    size: "200-1000 employees",
  });

  const { user, isAuthenticated, loginWithMock, logout, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (!form.phone.trim() || form.phone.length < 8) {
      toast.error("Please enter a valid mobile phone number with country code.");
      return;
    }
    setOtpSent(true);
    toast.success(`Verification OTP sent to ${form.phone}. (Demo code: 492815)`);
  };

  const handleFinish = () => {
    if (regMode === "otp" && otpCode !== "492815" && otpCode.length < 6) {
      toast.error("Please enter the 6-digit OTP code sent to your phone (Demo: 492815)");
      return;
    }
    loginWithMock(accountType);
    toast.success("Account created successfully! Welcome to GetCyber.");
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

  // Password strength calculator
  const getPasswordStrength = () => {
    if (!form.password) return 0;
    let score = 0;
    if (form.password.length >= 8) score += 25;
    if (/[A-Z]/.test(form.password)) score += 25;
    if (/[0-9]/.test(form.password)) score += 25;
    if (/[^A-Za-z0-9]/.test(form.password)) score += 25;
    return score;
  };

  const passStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#05070F] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-cyber-blue/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Enterprise Visual Showcase & Images */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header Branding */}
            <div>
              <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
                <div className="w-11 h-11 bg-cyber-blue/20 rounded-xl flex items-center justify-center border border-cyber-blue/40 shadow-glow-blue group-hover:scale-105 transition-transform">
                  <Shield className="w-6 h-6 text-cyber-blue" />
                </div>
                <span className="font-display font-black text-2xl tracking-tight text-white">
                  Get<span className="text-gradient-blue">Cyber</span>
                </span>
              </Link>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-white mb-3">
                Enterprise-Grade Cyber Protection For Your Organization
              </h1>
              <p className="text-dark-text text-sm sm:text-base leading-relaxed">
                Join 10,000+ security analysts, CISOs, and ethical hackers protecting cloud infrastructure, endpoints, and identity at machine speed.
              </p>
            </div>

            {/* Visual Hero Image Card */}
            <div className="relative rounded-[22px] overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-b from-[#0B101E] to-[#05070F] p-1 group">
              <div className="relative h-64 sm:h-72 rounded-[18px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&h=600&fit=crop"
                  alt="Security Operations Center"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-[#05070F]/40 to-transparent" />

                {/* Floating telemetry tag */}
                <div className="absolute top-3 left-3 bg-[#05070F]/90 backdrop-blur-md border border-cyber-green/40 px-3 py-1.5 rounded-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-cyber-green">SOC Core: Live Defense</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-[#05070F]/85 backdrop-blur-md p-2 rounded-lg border border-white/10">
                      <p className="text-sm sm:text-base font-black text-cyber-blue">86%</p>
                      <p className="text-[10px] text-dark-text uppercase tracking-wider font-mono">MTTR Reduction</p>
                    </div>
                    <div className="bg-[#05070F]/85 backdrop-blur-md p-2 rounded-lg border border-white/10">
                      <p className="text-sm sm:text-base font-black text-cyber-green">99.99%</p>
                      <p className="text-[10px] text-dark-text uppercase tracking-wider font-mono">Uptime SLA</p>
                    </div>
                    <div className="bg-[#05070F]/85 backdrop-blur-md p-2 rounded-lg border border-white/10">
                      <p className="text-sm sm:text-base font-black text-cyber-purple">10k+</p>
                      <p className="text-[10px] text-dark-text uppercase tracking-wider font-mono">SOCs Protected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Highlights */}
            <div className="glass-card p-5 space-y-3.5 border border-dark-border/80">
              <h3 className="text-xs font-bold uppercase tracking-wider text-dark-text flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyber-yellow" />
                What you get with your free trial
              </h3>

              <div className="space-y-2.5">
                {[
                  { text: "Full access to automated vulnerability assessment & scanning", icon: CheckCircle },
                  { text: "GC-AI Copilot for threat analysis, log triage & remediation", icon: Cpu },
                  { text: "Penetration testing tracking, exploit repository & PoC tests", icon: Target },
                  { text: "ISO 27001, SOC 2, HIPAA & GDPR compliance frameworks", icon: FileCheck },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-dark-text-bright">
                      <Icon className="w-4 h-4 text-cyber-green flex-shrink-0 mt-0.5" />
                      <span>{item.text}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compliance certifications badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 rounded-xl bg-dark-card/40 border border-dark-border text-xs text-dark-text">
              <span className="font-semibold text-white">Certifications:</span>
              <span className="font-mono text-cyber-blue bg-cyber-blue/10 px-2 py-0.5 rounded border border-cyber-blue/20">SOC 2 Type II</span>
              <span className="font-mono text-cyber-green bg-cyber-green/10 px-2 py-0.5 rounded border border-cyber-green/20">ISO 27001</span>
              <span className="font-mono text-cyber-purple bg-cyber-purple/10 px-2 py-0.5 rounded border border-cyber-purple/20">GDPR Ready</span>
            </div>
          </div>

          {/* RIGHT COLUMN: The Multi-Step Registration Card */}
          <div className="lg:col-span-7">
            {isAuthenticated && user && (
              <div className="glass-card p-4 mb-6 border border-cyber-blue/40 bg-cyber-blue/10 text-center animate-fade-in">
                <p className="text-xs text-dark-text">You are currently signed in as</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {user.name} <span className="text-xs font-normal text-cyber-blue">({user.email})</span>
                </p>
                <div className="flex gap-2 mt-3 justify-center">
                  <button onClick={() => navigate("/dashboard")} className="cyber-btn-primary text-xs py-1.5 px-3">
                    Go to Dashboard →
                  </button>
                  <button onClick={() => logout()} className="cyber-btn-secondary text-xs py-1.5 px-3">
                    Sign Out / Switch
                  </button>
                </div>
              </div>
            )}

            <div className="glass-card p-6 sm:p-8 shadow-2xl border border-dark-border/80">
              {/* Step indicator header */}
              <div className="mb-6">
                <div className="flex items-center justify-between gap-2 mb-3">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex-1 flex items-center">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            i < step
                              ? "bg-cyber-green text-dark-bg shadow-glow-green"
                              : i === step
                              ? "bg-cyber-blue text-white shadow-glow-blue"
                              : "bg-dark-card text-dark-text border border-dark-border"
                          }`}
                        >
                          {i < step ? <Check className="w-4 h-4 stroke-[3]" /> : i + 1}
                        </div>
                        <span
                          className={`text-[11px] font-medium mt-1.5 text-center hidden sm:block ${
                            i === step ? "text-white font-bold" : "text-dark-text"
                          }`}
                        >
                          {s}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={`h-0.5 flex-1 mx-2 rounded transition-all ${
                            i < step ? "bg-cyber-green" : "bg-dark-border"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-center sm:hidden mt-2">
                  <span className="text-xs text-cyber-blue font-bold">Step {step + 1} of {STEPS.length}: </span>
                  <span className="text-xs text-white">{STEPS[step]}</span>
                </div>
              </div>

              {/* STEP 0: Account Type / Role Selection */}
              {step === 0 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Select Your Primary Role</h2>
                    <p className="text-dark-text text-xs sm:text-sm">
                      We personalize your dashboards, scan profiles, and threat alerts based on your responsibilities.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {ACCOUNT_TYPES.map((at) => {
                      const Icon = at.icon;
                      const isSelected = accountType === at.role;
                      return (
                        <button
                          key={at.role}
                          type="button"
                          onClick={() => setAccountType(at.role)}
                          className={`relative p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                            isSelected
                              ? "border-cyber-blue bg-cyber-blue/15 shadow-glow-blue"
                              : "border-dark-border bg-dark-card/40 hover:border-dark-border-light hover:bg-dark-card/70"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${at.bgColor} border ${at.borderColor}`}>
                              <Icon className={`w-5 h-5 ${at.color}`} />
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dark-card text-dark-text border border-dark-border">
                              {at.badge}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-bold text-white text-sm mb-1">{at.title}</h4>
                            <p className="text-dark-text text-xs leading-relaxed">{at.desc}</p>
                          </div>

                          {isSelected && (
                            <div className="absolute top-3 right-3 w-5 h-5 bg-cyber-blue rounded-full flex items-center justify-center">
                              <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* SSO Quick Sign Up Options */}
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
                        <span className="font-medium text-white">Microsoft SSO</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSSOSignup("Google")}
                        className="cyber-btn-secondary py-2.5 px-3 text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-[#4285f4]/50 hover:bg-[#4285f4]/10 transition-all group"
                      >
                        <GoogleIcon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="font-medium text-white">Google SSO</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 1: Your Details (Email vs Mobile OTP) */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white mb-1">Your Identity Credentials</h2>
                      <p className="text-dark-text text-xs">Choose registration method (Email or Mobile OTP)</p>
                    </div>
                    {/* Mode Toggle */}
                    <div className="flex p-0.5 rounded-lg bg-dark-surface border border-dark-border">
                      <button
                        type="button"
                        onClick={() => setRegMode("email")}
                        className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                          regMode === "email" ? "bg-cyber-blue text-white shadow-sm" : "text-dark-text hover:text-white"
                        }`}
                      >
                        Work Email
                      </button>
                      <button
                        type="button"
                        onClick={() => setRegMode("otp")}
                        className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                          regMode === "otp" ? "bg-cyber-blue text-white shadow-sm" : "text-dark-text hover:text-white"
                        }`}
                      >
                        Mobile OTP
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="label-cyber">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                      <input
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="input-cyber pl-10 text-sm"
                        placeholder="Alex Morgan"
                      />
                    </div>
                  </div>

                  {regMode === "email" ? (
                    <div>
                      <label className="label-cyber">Work Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                        <input
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          type="email"
                          className="input-cyber pl-10 text-sm"
                          placeholder="alex.morgan@company.com"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="label-cyber">Mobile Phone Number (OTP Registration)</label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                          <input
                            value={form.phone}
                            onChange={(e) => update("phone", e.target.value)}
                            type="tel"
                            className="input-cyber pl-10 text-sm"
                            placeholder="+1 (555) 019-2834"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSendOtp}
                          className="cyber-btn-secondary text-xs px-3.5 whitespace-nowrap"
                        >
                          {otpSent ? "Resend OTP" : "Send OTP"}
                        </button>
                      </div>

                      {otpSent && (
                        <div className="mt-3 p-3 rounded-lg bg-cyber-blue/10 border border-cyber-blue/30 space-y-2">
                          <label className="text-xs font-semibold text-cyber-blue">Enter 6-Digit OTP</label>
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value)}
                            placeholder="Enter 492815"
                            className="input-cyber font-mono text-center tracking-widest text-base"
                          />
                          <p className="text-[11px] text-dark-text">A one-time code was dispatched via SMS.</p>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="label-cyber">Secure Master Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                      <input
                        value={form.password}
                        onChange={(e) => update("password", e.target.value)}
                        type={showPass ? "text" : "password"}
                        className="input-cyber pl-10 pr-10 text-sm"
                        placeholder="Min 12 characters (letters, numbers, symbols)"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass(!showPass)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text hover:text-white"
                      >
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength bar */}
                    {form.password && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-dark-text">Strength</span>
                          <span
                            className={
                              passStrength >= 75
                                ? "text-cyber-green font-bold"
                                : passStrength >= 50
                                ? "text-cyber-yellow"
                                : "text-cyber-red"
                            }
                          >
                            {passStrength >= 75 ? "Strong" : passStrength >= 50 ? "Moderate" : "Weak"}
                          </span>
                        </div>
                        <div className="h-1 bg-dark-card rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              passStrength >= 75
                                ? "bg-cyber-green"
                                : passStrength >= 50
                                ? "bg-cyber-yellow"
                                : "bg-cyber-red"
                            }`}
                            style={{ width: `${passStrength}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-3 rounded-lg bg-dark-surface border border-dark-border flex items-center gap-2.5 text-xs text-dark-text">
                    <Fingerprint className="w-4 h-4 text-cyber-blue flex-shrink-0" />
                    <span>Your cryptographic keys are isolated and encrypted via AES-256 GCM.</span>
                  </div>
                </div>
              )}

              {/* STEP 2: Organization Profile */}
              {step === 2 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Organization Profile</h2>
                    <p className="text-dark-text text-xs">Configure your organization tenant and industry compliance baseline</p>
                  </div>

                  <div>
                    <label className="label-cyber">Organization Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                      <input
                        value={form.org}
                        onChange={(e) => update("org", e.target.value)}
                        className="input-cyber pl-10 text-sm"
                        placeholder="TechCorp Global Industries"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-cyber">Industry Sector</label>
                    <select
                      value={form.industry}
                      onChange={(e) => update("industry", e.target.value)}
                      className="input-cyber text-sm"
                    >
                      <option value="">Select industry</option>
                      {[
                        "Technology & SaaS",
                        "Banking & Financial Services",
                        "Healthcare & Pharmaceuticals",
                        "Government & Defense",
                        "Educational Institutions",
                        "E-Commerce & Retail",
                        "Critical Infrastructure & Energy",
                        "Legal & Professional Services",
                      ].map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="label-cyber">Organization Size</label>
                    <select
                      value={form.size}
                      onChange={(e) => update("size", e.target.value)}
                      className="input-cyber text-sm"
                    >
                      <option value="1-50 employees">1-50 employees (Startup / Boutique)</option>
                      <option value="50-200 employees">50-200 employees (Mid-Market)</option>
                      <option value="200-1000 employees">200-1000 employees (Enterprise)</option>
                      <option value="1000+ employees">1000+ employees (Global Corporation)</option>
                    </select>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyber-blue/10 border border-cyber-blue/30 text-xs text-dark-text-bright space-y-1">
                    <p className="font-semibold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-cyber-blue" />
                      Automated Tenant Provisioning
                    </p>
                    <p className="text-dark-text">
                      We will automatically configure a dedicated multi-tenant vault with RBAC roles for your organization domain.
                    </p>
                  </div>
                </div>
              )}

              {/* STEP 3: Security & MFA Setup */}
              {step === 3 && (
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-1">Security Identity & MFA Setup</h2>
                    <p className="text-dark-text text-xs">Configure enterprise security controls for your root identity</p>
                  </div>

                  {[
                    {
                      label: "Enforce Multi-Factor Authentication (TOTP)",
                      desc: "Mandatory for administrator accounts using Authenticator apps or FIDO2 keys.",
                      checked: true,
                    },
                    {
                      label: "Real-Time Critical Threat Notifications",
                      desc: "Receive instant SMS and email alerts for zero-day exploits and brute-force events.",
                      checked: true,
                    },
                    {
                      label: "Privileged Session Recording & Audit Logs",
                      desc: "Maintain immutable compliance ledger of all API queries and administrative changes.",
                      checked: true,
                    },
                  ].map((opt) => (
                    <div
                      key={opt.label}
                      className="flex items-start gap-3 p-3.5 bg-dark-card/50 border border-dark-border rounded-xl hover:border-cyber-blue/30 transition-colors"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={opt.checked}
                        className="mt-1 w-4 h-4 rounded border-dark-border text-cyber-blue focus:ring-cyber-blue bg-dark-surface"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{opt.label}</p>
                        <p className="text-xs text-dark-text mt-0.5 leading-relaxed">{opt.desc}</p>
                      </div>
                    </div>
                  ))}

                  <div className="p-4 rounded-xl bg-cyber-green/10 border border-cyber-green/30 text-xs text-dark-text-bright flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyber-green flex-shrink-0" />
                    <div>
                      <p className="font-bold text-white">14-Day Full Enterprise Trial Included</p>
                      <p className="text-dark-text">
                        No credit card required. Unlimited vulnerability scans and full GC-AI copilot access.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex gap-3 mt-8 pt-4 border-t border-dark-border/60">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="cyber-btn-secondary flex-1 py-2.5 text-sm"
                  >
                    Back
                  </button>
                )}
                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="cyber-btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="cyber-btn-primary flex-1 py-2.5 text-sm flex items-center justify-center gap-2 shadow-glow-blue"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Creating Secure Account...</span>
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" />
                        <span>Launch My Security Dashboard</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              <p className="text-center text-dark-text text-xs mt-6">
                Already have an account?{" "}
                <Link to="/login" className="text-cyber-blue hover:text-cyber-blue-light font-semibold transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
