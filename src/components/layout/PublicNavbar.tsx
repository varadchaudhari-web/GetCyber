import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Shield,
  ChevronDown,
  ExternalLink,
  AlertTriangle,
  Target,
  Activity,
  CheckCircle,
  Zap,
  Bot,
  BarChart3,
  Database,
  Radio,
  ArrowRight,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { cn } from "@/lib/utils";

const SOLUTION_ITEMS = [
  { label: "Vulnerability Assessment", hash: "vulnerability", icon: AlertTriangle, color: "text-cyber-blue" },
  { label: "Penetration Testing", hash: "pentest", icon: Target, color: "text-cyber-red" },
  { label: "Threat Intelligence", hash: "threat", icon: Activity, color: "text-cyber-purple" },
  { label: "Compliance Management", hash: "compliance", icon: CheckCircle, color: "text-cyber-green" },
  { label: "Incident Response", hash: "incident", icon: Zap, color: "text-cyber-yellow" },
  { label: "AI Security Assistant", hash: "ai", icon: Bot, color: "text-cyber-cyan" },
  { label: "Security Analytics", hash: "analytics", icon: BarChart3, color: "text-cyber-orange" },
  { label: "Asset Management", hash: "assets", icon: Database, color: "text-cyber-purple" },
];

type NavLink = {
  label: string;
  href: string;
  hash?: string;
  isSolutions?: boolean;
};

const navLinks: NavLink[] = [
  { label: "Solutions", href: "/solutions", isSolutions: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function scrollToSection(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    const offset = 90;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  useEffect(() => {
    if (location.pathname === "/solutions" && location.hash) {
      const hash = location.hash.replace("#", "");
      setTimeout(() => scrollToSection(hash), 200);
    }
  }, [location]);

  const handleSolutionClick = (hash: string) => {
    setSolutionsOpen(false);
    if (location.pathname === "/solutions") {
      scrollToSection(hash);
    } else {
      navigate(`/solutions#${hash}`);
    }
  };

  const handleNavClick = (link: NavLink) => {
    if (link.hash && location.pathname === link.href) {
      scrollToSection(link.hash);
    }
  };

  return (
    <div className="fixed top-2 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <nav
        className={cn(
          "max-w-6xl mx-auto rounded-2xl sm:rounded-full transition-all duration-500 pointer-events-auto",
          scrolled
            ? "bg-[#05070F]/85 backdrop-blur-2xl border border-white/10 shadow-[0_16px_50px_rgba(0,0,0,0.85)] py-2 px-4 sm:px-6"
            : "bg-[#080d1a]/50 backdrop-blur-md border border-white/5 py-2.5 px-4 sm:px-7 shadow-lg"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo with pulsating radar beacon */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 bg-cyber-blue/15 rounded-xl flex items-center justify-center border border-cyber-blue/40 group-hover:border-cyber-blue group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all duration-300">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-cyber-blue group-hover:scale-110 transition-transform" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
            </div>
            <span className="font-black text-lg sm:text-xl text-white tracking-tight">
              Get<span className="text-gradient-blue">Cyber</span>
            </span>
          </Link>

          {/* Desktop Nav Items with glowing hover capsules */}
          <div className="hidden md:flex items-center gap-1 bg-[#070b16]/60 p-1 rounded-full border border-dark-border/60">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;

              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.isSolutions && setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  {link.isSolutions ? (
                    <button
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-transparent",
                        isActive || solutionsOpen
                          ? "text-white bg-cyber-blue/20 border-cyber-blue/40 shadow-glow-blue"
                          : "text-dark-text hover:text-white hover:bg-cyber-blue/10 hover:border-cyber-blue/25"
                      )}
                      onClick={() => navigate("/solutions")}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={cn("w-3 h-3 transition-transform duration-200", solutionsOpen && "rotate-180")}
                      />
                    </button>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => handleNavClick(link)}
                      className={cn(
                        "flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 border border-transparent",
                        isActive
                          ? "text-white bg-cyber-blue/20 border-cyber-blue/40 shadow-glow-blue"
                          : "text-dark-text hover:text-white hover:bg-cyber-blue/10 hover:border-cyber-blue/25"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}

                  {/* Solutions Dropdown Menu */}
                  {link.isSolutions && solutionsOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 rounded-2xl bg-[#0d1527] border border-cyber-blue/40 p-2 shadow-2xl animate-slide-up backdrop-blur-2xl">
                      <div className="flex items-center justify-between px-3 py-1.5 border-b border-dark-border/60 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-dark-text">
                          Security Capabilities
                        </span>
                        <span className="text-[10px] font-mono text-cyber-green flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" /> SOC 2 Ready
                        </span>
                      </div>
                      <div className="grid grid-cols-1 gap-1">
                        {SOLUTION_ITEMS.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.hash}
                              onClick={() => handleSolutionClick(item.hash)}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-dark-text-bright hover:text-white hover:bg-cyber-blue/15 hover:border hover:border-cyber-blue/30 transition-all text-left w-full group/item"
                            >
                              <Icon className={cn("w-4 h-4 flex-shrink-0 group-hover/item:scale-110 transition-transform", item.color)} />
                              <span className="font-medium">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      <div className="mt-1 pt-1.5 border-t border-dark-border/60 px-2">
                        <Link
                          to="/solutions"
                          className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs font-semibold text-cyber-blue hover:text-white hover:bg-cyber-blue/15 transition-all"
                        >
                          <span>Explore Full Solutions Matrix</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="cyber-btn-primary text-xs py-2 px-4 rounded-full flex items-center gap-1.5 shadow-glow-blue"
                >
                  <Radio className="w-3.5 h-3.5 text-cyber-green animate-pulse" />
                  <span>Dashboard Console</span>
                </button>
                <button
                  onClick={() => {
                    useAuthStore.getState().logout();
                    navigate("/login");
                  }}
                  className="text-xs text-dark-text hover:text-white px-3 py-2 rounded-full border border-dark-border/80 hover:border-cyber-blue/40 bg-dark-card/40 transition-all font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs font-semibold text-dark-text-bright hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/5 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="cyber-btn-primary text-xs py-2 px-4 rounded-full flex items-center gap-1.5 shadow-glow-blue hover:scale-105 active:scale-95 transition-all font-bold group"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl text-dark-text hover:text-white hover:bg-dark-card/60 transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 text-cyber-blue" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-dark-border/60 animate-slide-up max-h-[75vh] overflow-y-auto">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    className="block px-3 py-2 rounded-xl text-xs font-semibold text-dark-text hover:text-white hover:bg-cyber-blue/15 transition-all"
                  >
                    {link.label}
                  </Link>
                  {link.isSolutions && (
                    <div className="ml-3 mt-1 pl-2 border-l border-dark-border space-y-0.5">
                      {SOLUTION_ITEMS.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.hash}
                            onClick={() => handleSolutionClick(item.hash)}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-dark-text/80 hover:text-white hover:bg-dark-card/50 transition-all w-full text-left"
                          >
                            <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", item.color)} />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 flex flex-col gap-2 border-t border-dark-border/60">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/dashboard");
                      }}
                      className="cyber-btn-primary text-xs text-center py-2.5 rounded-xl"
                    >
                      Dashboard Console
                    </button>
                    <button
                      onClick={() => {
                        useAuthStore.getState().logout();
                        setMobileOpen(false);
                        navigate("/login");
                      }}
                      className="cyber-btn-secondary text-xs text-center py-2 rounded-xl"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="cyber-btn-secondary text-xs text-center py-2 rounded-xl">
                      Sign In
                    </Link>
                    <Link to="/register" className="cyber-btn-primary text-xs text-center py-2.5 rounded-xl">
                      Start Free Trial
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
