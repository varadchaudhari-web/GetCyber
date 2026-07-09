import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Loader2, Lock, Mail, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
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
  const { login, loginWithMock, isLoading } = useAuthStore();
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

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-cyber-blue/20 rounded-xl flex items-center justify-center border border-cyber-blue/40">
              <Shield className="w-5 h-5 text-cyber-blue" />
            </div>
            <span className="font-bold text-2xl text-white">Get<span className="text-gradient-blue">Cyber</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">{mfaStep ? "Two-Factor Authentication" : "Welcome Back"}</h1>
          <p className="text-dark-text text-sm">{mfaStep ? "Enter the 6-digit code from your authenticator app" : "Sign in to your security operations center"}</p>
        </div>

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

            <button type="submit" className="cyber-btn-primary w-full flex items-center justify-center gap-2 py-3" disabled={isLoading}>
              {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</> : (mfaStep ? "Verify & Access Dashboard" : "Sign In Securely")}
            </button>
          </form>

          {/* SSO */}
          {!mfaStep && (
            <>
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-dark-border" />
                <span className="text-dark-text text-xs">OR SIGN IN WITH</span>
                <div className="flex-1 h-px bg-dark-border" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="cyber-btn-secondary py-2.5 text-sm flex items-center justify-center gap-2">
                  <span>🔷</span> Microsoft SSO
                </button>
                <button className="cyber-btn-secondary py-2.5 text-sm flex items-center justify-center gap-2">
                  <span>🔴</span> Google SSO
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
