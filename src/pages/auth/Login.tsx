import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Loader2, Lock, Mail, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { GoogleIcon, MicrosoftIcon } from "@/components/icons/BrandIcons";
import { toast } from "sonner";
import type { User } from "@/types";

const DEMO_ROLES: { role: User["role"]; label: string; color: string }[] = [
  { role: "security_analyst", label: "Security Analyst", color: "text-cyber-blue" },
  { role: "pen_tester", label: "Pen Tester", color: "text-cyber-red" },
  { role: "compliance_officer", label: "Compliance Officer", color: "text-cyber-green" },
  { role: "enterprise_admin", label: "Enterprise Admin", color: "text-cyber-purple" },
  { role: "platform_admin", label: "Platform Admin", color: "text-cyber-yellow" },
];

export default function Login() {
  const [email, setEmail] = useState("alex.morgan@getcyber.io");
  const [password, setPassword] = useState("demo1234");
  const [showPass, setShowPass] = useState(false);
  const [mfaStep, setMfaStep] = useState(false);
  const [mfaCode, setMfaCode] = useState("");
  const [error, setError] = useState("");
  const { user, isAuthenticated, login, loginWithMock, logout, isLoading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!mfaStep) {
      const ok = await login(email, password);
      if (ok) setMfaStep(true);
      else setError("Invalid credentials. Use the demo buttons below.");
    } else {
      if (mfaCode === "123456" || mfaCode.length === 6) {
        navigate("/dashboard");
      } else {
        setError("Invalid MFA code. Try 123456");
      }
    }
  };

  const handleDemoLogin = (role: User["role"]) => {
    loginWithMock(role);
    navigate("/dashboard");
  };

  const handleSSOLogin = (provider: "Microsoft" | "Google") => {
    toast.success(`Authenticating securely with ${provider} SSO...`);
    setTimeout(() => {
      loginWithMock("security_analyst");
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-cyber-blue/20 rounded-xl flex items-center justify-center border border-cyber-blue/40">
              <Shield className="w-5 h-5 text-cyber-blue" />
            </div>
            <span className="font-bold text-2xl text-white">Get<span className="text-gradient-blue">Cyber</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">{mfaStep ? "Two-Factor Authentication" : "Welcome Back"}</h1>
          <p className="text-dark-text text-sm mb-3">
            {mfaStep ? "Enter the 6-digit code from your authenticator app" : "Sign in to your AI-powered security operations center"}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-blue/10 border border-cyber-blue/25 text-[11px] font-mono text-cyber-blue">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
            <span>SOC 2 Type II & Zero-Trust Certified Portal</span>
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

        <div className="glass-card p-8">
          {error && (
            <div className="flex items-center gap-2 bg-cyber-red/10 border border-cyber-red/30 text-cyber-red text-sm p-3 rounded-lg mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!mfaStep ? (
              <>
                <div>
                  <label className="label-cyber">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-cyber pl-10"
                      placeholder="you@company.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="label-cyber mb-0">Password</label>
                    <Link to="/forgot-password" className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
                    <input
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-cyber pl-10 pr-10"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text hover:text-white transition-colors"
                    >
                      {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="remember" className="rounded border-dark-border" defaultChecked />
                  <label htmlFor="remember" className="text-sm text-dark-text cursor-pointer">Remember this device for 30 days</label>
                </div>
              </>
            ) : (
              <div>
                <label className="label-cyber">MFA Code</label>
                <input
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value.slice(0, 6))}
                  className="input-cyber text-center text-2xl tracking-widest font-mono"
                  placeholder="000000"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-dark-text mt-2 text-center">Enter code: <span className="text-cyber-green font-mono">123456</span> (demo)</p>
              </div>
            )}

            <button type="submit" className="cyber-btn-primary w-full flex items-center justify-center gap-2 py-3 shadow-lg hover:shadow-blue-600/40" disabled={isLoading}>
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</> : (mfaStep ? "Verify & Access Dashboard" : "Sign In Securely")}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#93a2c4] pt-1">
              <Lock className="w-3 h-3 text-[#31d0aa]" />
              <span>256-bit SSL Encrypted • Single Sign-On Ready</span>
            </div>
          </form>

          {/* SSO */}
          {!mfaStep && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-dark-border" />
                <span className="text-dark-text text-xs tracking-wider uppercase font-medium">Or continue with</span>
                <div className="flex-1 h-px bg-dark-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleSSOLogin("Microsoft")}
                  className="cyber-btn-secondary py-2.5 px-3 text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-[#00a4ef]/50 hover:bg-[#00a4ef]/10 transition-all group"
                >
                  <MicrosoftIcon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-white">Microsoft</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSSOLogin("Google")}
                  className="cyber-btn-secondary py-2.5 px-3 text-xs sm:text-sm flex items-center justify-center gap-2 hover:border-[#4285f4]/50 hover:bg-[#4285f4]/10 transition-all group"
                >
                  <GoogleIcon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="font-medium text-white">Google</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Demo Logins */}
        <div className="mt-6 glass-card p-5">
          <p className="text-xs font-semibold text-dark-text uppercase tracking-wider mb-3 text-center">Quick Demo Access</p>
          <div className="grid grid-cols-1 gap-2">
            {DEMO_ROLES.map((r) => (
              <button
                key={r.role}
                onClick={() => handleDemoLogin(r.role)}
                className="flex items-center justify-between px-3 py-2.5 bg-dark-card/60 hover:bg-dark-card border border-dark-border hover:border-cyber-blue/40 rounded-lg transition-all text-sm group"
              >
                <span className={`font-medium ${r.color}`}>{r.label}</span>
                <span className="text-dark-text text-xs group-hover:text-white transition-colors">→ Enter Demo</span>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-dark-text text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-cyber-blue hover:text-cyber-blue-light font-medium transition-colors">Create one free</Link>
        </p>
      </div>
    </div>
  );
}
