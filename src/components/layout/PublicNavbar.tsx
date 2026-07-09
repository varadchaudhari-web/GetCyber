import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, X, Shield, ChevronDown, ExternalLink,
  AlertTriangle, Target, Activity, CheckCircle, Zap, Bot, BarChart3, Database
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
    const offset = 80;
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
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSolutionsOpen(false);
  }, [location]);

  // Handle hash-based scroll after navigation
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
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-dark-surface/95 backdrop-blur-md border-b border-dark-border shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-cyber-blue/20 rounded-lg flex items-center justify-center border border-cyber-blue/40 group-hover:border-cyber-blue transition-all duration-200">
              <Shield className="w-5 h-5 text-cyber-blue" />
            </div>
            <span className="font-bold text-xl text-white tracking-tight">
              Get<span className="text-gradient-blue">Cyber</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.isSolutions && setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                {link.isSolutions ? (
                  <button
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      location.pathname === link.href
                        ? "text-white bg-dark-card/60"
                        : "text-dark-text hover:text-white hover:bg-dark-card/40"
                    )}
                    onClick={() => navigate("/solutions")}
                  >
                    {link.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", solutionsOpen && "rotate-180")} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => handleNavClick(link)}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      location.pathname === link.href
                        ? "text-white bg-dark-card/60"
                        : "text-dark-text hover:text-white hover:bg-dark-card/40"
                    )}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Solutions Dropdown */}
                {link.isSolutions && solutionsOpen && (
                  <div className="absolute top-full left-0 mt-1 w-72 glass-card p-2 animate-slide-up">
                    <p className="text-xs text-dark-text/60 uppercase tracking-wider px-3 py-1.5 mb-1">Security Solutions</p>
                    {SOLUTION_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.hash}
                          onClick={() => handleSolutionClick(item.hash)}
                          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-dark-text hover:text-white hover:bg-dark-card/60 transition-all duration-150 w-full text-left"
                        >
                          <Icon className={cn("w-4 h-4 flex-shrink-0", item.color)} />
                          {item.label}
                        </button>
                      );
                    })}
                    <div className="mt-1 pt-2 border-t border-dark-border px-2">
                      <Link
                        to="/solutions"
                        className="flex items-center justify-between px-2 py-2 rounded-lg text-xs text-cyber-blue hover:bg-dark-card/60 transition-all"
                      >
                        View all solutions
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="cyber-btn-primary text-sm py-2 px-4"
              >
                Dashboard
              </button>
            ) : (
              <>
                <Link to="/login" className="cyber-btn-ghost text-sm">
                  Sign In
                </Link>
                <Link to="/register" className="cyber-btn-primary text-sm py-2 px-4 flex items-center gap-1.5">
                  Get Started
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-dark-text hover:text-white hover:bg-dark-card transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-dark-surface/98 backdrop-blur-md border-t border-dark-border animate-slide-up max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <Link
                  to={link.href}
                  className="block px-3 py-2.5 rounded-lg text-sm font-medium text-dark-text hover:text-white hover:bg-dark-card/60 transition-all"
                >
                  {link.label}
                </Link>
                {link.isSolutions && (
                  <div className="ml-4 mt-1 space-y-0.5">
                    {SOLUTION_ITEMS.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.hash}
                          onClick={() => handleSolutionClick(item.hash)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-dark-text/80 hover:text-white hover:bg-dark-card/40 transition-all w-full text-left"
                        >
                          <Icon className={cn("w-3.5 h-3.5 flex-shrink-0", item.color)} />
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-3 flex flex-col gap-2 border-t border-dark-border">
              <Link to="/login" className="cyber-btn-secondary text-sm text-center">Sign In</Link>
              <Link to="/register" className="cyber-btn-primary text-sm text-center">Get Started Free</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
