import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 bg-cyber-blue/10 border border-cyber-blue/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-cyber-blue" />
        </div>
        <h1 className="text-8xl font-black text-cyber-blue mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-dark-text mb-8 max-w-md mx-auto">The page you're looking for doesn't exist or has been moved. Let's get you back to safety.</p>
        <div className="flex gap-4 justify-center">
          <Link to="/" className="cyber-btn-primary">Back to Home</Link>
          <Link to="/dashboard" className="cyber-btn-secondary">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
