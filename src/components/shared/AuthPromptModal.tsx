import { Link } from "react-router-dom";
import { Shield, CheckCircle, X, Lock, Zap, Bot, BarChart3, FileText, Activity } from "lucide-react";

interface AuthPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const benefits = [
  { icon: Shield, text: "Vulnerability Assessment & Scanning", color: "text-cyber-blue" },
  { icon: Activity, text: "Real-time Threat Intelligence", color: "text-cyber-purple" },
  { icon: Zap, text: "Incident Response & Management", color: "text-cyber-orange" },
  { icon: Lock, text: "Compliance Framework Management", color: "text-cyber-green" },
  { icon: Bot, text: "AI-Powered Security Assistant (GC-AI)", color: "text-cyber-cyan" },
  { icon: BarChart3, text: "Executive Security Analytics", color: "text-cyber-yellow" },
  { icon: FileText, text: "Professional Security Reports", color: "text-cyber-blue" },
  { icon: CheckCircle, text: "Penetration Testing Management", color: "text-cyber-red" },
];

export default function AuthPromptModal({ isOpen, onClose, feature = "this feature" }: AuthPromptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-card overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-cyber-blue/20 to-cyber-green/10 p-6 border-b border-dark-border">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 hover:bg-dark-card/50 rounded-lg text-dark-text hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-cyber-blue/20 rounded-xl flex items-center justify-center border border-cyber-blue/40 animate-pulse-glow">
              <Shield className="w-6 h-6 text-cyber-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Access {feature}</h2>
              <p className="text-sm text-dark-text">Sign in to unlock full platform access</p>
            </div>
          </div>
          <p className="text-sm text-dark-text-bright leading-relaxed">
            Join 10,000+ security professionals protecting their organizations with GetCyber's AI-powered cybersecurity platform.
          </p>
        </div>

        {/* Benefits */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-xs font-semibold text-dark-text uppercase tracking-wider mb-3">What you get with GetCyber</p>
          <div className="grid grid-cols-1 gap-2">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 p-2.5 bg-dark-card/40 rounded-lg border border-dark-border/50">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${benefit.color}`} />
                  <span className="text-sm text-dark-text-bright">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="p-6 border-t border-dark-border space-y-3">
          <Link
            to="/register"
            onClick={onClose}
            className="cyber-btn-primary w-full text-center text-sm py-3 block"
          >
            Get Started Free — No Credit Card Required
          </Link>
          <Link
            to="/login"
            onClick={onClose}
            className="cyber-btn-secondary w-full text-center text-sm py-2.5 block"
          >
            Sign In to Your Account
          </Link>
          <p className="text-xs text-dark-text text-center">
            Free plan available · Enterprise trials available · SOC 2 certified
          </p>
        </div>
      </div>
    </div>
  );
}
