import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import PublicNavbar from "@/components/layout/PublicNavbar";
import Footer from "@/components/layout/Footer";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import Home from "@/pages/Home";
import Solutions from "@/pages/Solutions";
import Pricing from "@/pages/Pricing";
import Resources from "@/pages/Resources";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import Documentation from "@/pages/Documentation";
import FAQ from "@/pages/FAQ";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import CookieSettings from "@/pages/CookieSettings";
import Careers from "@/pages/Careers";
import Status from "@/pages/Status";
import Support from "@/pages/Support";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import Overview from "@/pages/dashboard/Overview";
import Vulnerabilities from "@/pages/dashboard/Vulnerabilities";
import Incidents from "@/pages/dashboard/Incidents";
import ThreatIntelligence from "@/pages/dashboard/ThreatIntelligence";
import PenTesting from "@/pages/dashboard/PenTesting";
import Compliance from "@/pages/dashboard/Compliance";
import Assets from "@/pages/dashboard/Assets";
import AIAssistant from "@/pages/dashboard/AIAssistant";
import Training from "@/pages/dashboard/Training";
import Analytics from "@/pages/dashboard/Analytics";
import Organization from "@/pages/dashboard/Organization";
import Reports from "@/pages/dashboard/Reports";
import Profile from "@/pages/dashboard/Profile";
import Administration from "@/pages/dashboard/Administration";
import Monitoring from "@/pages/dashboard/Monitoring";
import NotFound from "@/pages/NotFound";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicNavbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#1E293B", border: "1px solid #2D3748", color: "#F1F5F9" },
        }}
      />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/solutions" element={<PublicLayout><Solutions /></PublicLayout>} />
        <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
        <Route path="/resources" element={<PublicLayout><Resources /></PublicLayout>} />
        <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/blog" element={<PublicLayout><Blog /></PublicLayout>} />
        <Route path="/documentation" element={<PublicLayout><Documentation /></PublicLayout>} />
        <Route path="/faq" element={<PublicLayout><FAQ /></PublicLayout>} />
        <Route path="/privacy" element={<PublicLayout><Privacy /></PublicLayout>} />
        <Route path="/terms" element={<PublicLayout><Terms /></PublicLayout>} />
        <Route path="/cookie-settings" element={<PublicLayout><CookieSettings /></PublicLayout>} />
        <Route path="/careers" element={<PublicLayout><Careers /></PublicLayout>} />
        <Route path="/status" element={<PublicLayout><Status /></PublicLayout>} />
        <Route path="/support" element={<PublicLayout><Support /></PublicLayout>} />

        {/* Auth Routes (use public navbar) */}
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/register" element={<PublicLayout><Register /></PublicLayout>} />
        <Route path="/forgot-password" element={<PublicLayout><ForgotPassword /></PublicLayout>} />

        {/* Dashboard Routes (no navbar, sidebar only) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="vulnerabilities" element={<Vulnerabilities />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="threats" element={<ThreatIntelligence />} />
          <Route path="pentesting" element={<PenTesting />} />
          <Route path="compliance" element={<Compliance />} />
          <Route path="assets" element={<Assets />} />
          <Route path="ai" element={<AIAssistant />} />
          <Route path="training" element={<Training />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="organization" element={<Organization />} />
          <Route path="reports" element={<Reports />} />
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<Administration />} />
          <Route path="monitoring" element={<Monitoring />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
