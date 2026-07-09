import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-cyber-blue/20 rounded-xl flex items-center justify-center border border-cyber-blue/40">
              <Shield className="w-5 h-5 text-cyber-blue" />
            </div>
            <span className="font-bold text-2xl text-white">Get<span className="text-gradient-blue">Cyber</span></span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-dark-text text-sm">We'll send a recovery link to your email</p>
        </div>

        <div className="glass-card p-8">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <button type="submit" className="cyber-btn-primary w-full flex items-center justify-center gap-2 py-3" disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : "Send Recovery Link"}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <CheckCircle className="w-12 h-12 text-cyber-green mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">Check Your Email</h3>
              <p className="text-dark-text text-sm mb-4">We sent a password reset link to <span className="text-white">{email}</span></p>
              <p className="text-xs text-dark-text">Didn't receive it? <button onClick={() => setSent(false)} className="text-cyber-blue hover:underline">Try again</button></p>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-dark-text hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
