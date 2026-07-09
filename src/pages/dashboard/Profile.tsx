import { useState } from "react";
import { User, Mail, Lock, Shield, Bell, Key, LogOut, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { formatDate, formatRoleLabel } from "@/lib/utils";

export default function Profile() {
  const { user, updateUser, logout } = useAuthStore();
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="page-container max-w-4xl">
      <h1 className="section-header">Account Profile</h1>
      <p className="section-subheader">Manage your personal information, security settings, and preferences</p>

      {/* Profile Card */}
      <div className="glass-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-cyber-blue/20 border-2 border-cyber-blue/40 flex items-center justify-center text-2xl font-black text-cyber-blue">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user.name}</h2>
            <p className="text-dark-text">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 px-2 py-0.5 rounded-full">{formatRoleLabel(user.role)}</span>
              <span className="text-xs bg-cyber-green/10 text-cyber-green border border-cyber-green/30 px-2 py-0.5 rounded-full capitalize">{user.plan} Plan</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label-cyber">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
              <input
                defaultValue={user.name}
                onChange={(e) => updateUser({ name: e.target.value })}
                className="input-cyber pl-10"
              />
            </div>
          </div>
          <div>
            <label className="label-cyber">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text" />
              <input defaultValue={user.email} className="input-cyber pl-10" />
            </div>
          </div>
          <div>
            <label className="label-cyber">Organization</label>
            <input defaultValue={user.organizationName || ""} className="input-cyber" />
          </div>
          <div>
            <label className="label-cyber">Role</label>
            <input value={formatRoleLabel(user.role)} className="input-cyber bg-dark-card/30" readOnly />
          </div>
        </div>

        <button onClick={handleSave} className="cyber-btn-primary mt-4 flex items-center gap-2">
          {saved ? <><CheckCircle className="w-4 h-4" />Saved!</> : "Save Changes"}
        </button>
      </div>

      {/* Password */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Lock className="w-4 h-4 text-cyber-blue" /> Change Password
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div className="sm:col-span-2">
            <label className="label-cyber">Current Password</label>
            <div className="relative">
              <input type={showCurrentPass ? "text" : "password"} className="input-cyber pr-10" placeholder="••••••••••" />
              <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-text hover:text-white">
                {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div><label className="label-cyber">New Password</label><input type="password" className="input-cyber" placeholder="Min 12 chars" /></div>
          <div><label className="label-cyber">Confirm New Password</label><input type="password" className="input-cyber" placeholder="Repeat password" /></div>
        </div>
        <button className="cyber-btn-primary mt-4 text-sm">Update Password</button>
      </div>

      {/* MFA */}
      <div className="glass-card p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyber-green" /> Two-Factor Authentication
            </h3>
            <p className="text-dark-text text-sm">Add an extra layer of security to your account</p>
          </div>
          {user.mfaEnabled ? (
            <span className="flex items-center gap-2 text-cyber-green text-sm font-semibold">
              <CheckCircle className="w-4 h-4" /> Enabled
            </span>
          ) : (
            <button onClick={() => updateUser({ mfaEnabled: true })} className="cyber-btn-green text-sm py-2">Enable MFA</button>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Bell className="w-4 h-4 text-cyber-blue" /> Notification Preferences
        </h3>
        <div className="space-y-3">
          {[
            { label: "Critical Vulnerability Alerts", desc: "Instant notification for CVSS 9.0+ findings", enabled: true },
            { label: "New Incident Created", desc: "Alert when P1/P2 incidents are opened", enabled: true },
            { label: "Threat Intelligence Alerts", desc: "Notify on high-relevance threat intel", enabled: true },
            { label: "Compliance Deadlines", desc: "Reminders 30 days before audit dates", enabled: false },
            { label: "Weekly Security Digest", desc: "Summary of weekly security metrics", enabled: true },
            { label: "Scan Completion", desc: "Notify when vulnerability scans complete", enabled: false },
          ].map((pref) => (
            <div key={pref.label} className="flex items-center justify-between p-3 bg-dark-card/40 rounded-lg border border-dark-border">
              <div>
                <p className="text-sm font-medium text-white">{pref.label}</p>
                <p className="text-xs text-dark-text">{pref.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={pref.enabled} className="sr-only peer" />
                <div className="w-9 h-5 bg-dark-card border border-dark-border rounded-full peer peer-checked:bg-cyber-blue peer-checked:border-cyber-blue transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-4" />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* API Tokens */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Key className="w-4 h-4 text-cyber-purple" /> API Access Tokens
        </h3>
        <div className="space-y-3 mb-4">
          {[
            { name: "SIEM Integration Token", created: "2026-06-01", lastUsed: "2026-07-09" },
            { name: "Monitoring API Key", created: "2026-05-15", lastUsed: "2026-07-08" },
          ].map((token) => (
            <div key={token.name} className="flex items-center justify-between p-3 bg-dark-card/40 border border-dark-border rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">{token.name}</p>
                <p className="text-xs font-mono text-dark-text">gcyber_••••••••••••••••</p>
                <p className="text-xs text-dark-text">Created {token.created} · Last used {token.lastUsed}</p>
              </div>
              <button className="cyber-btn-danger text-xs py-1.5 px-3">Revoke</button>
            </div>
          ))}
        </div>
        <button className="cyber-btn-secondary flex items-center gap-2 text-sm">
          <Key className="w-3.5 h-3.5" /> Generate New Token
        </button>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 border-cyber-red/20 border">
        <h3 className="font-bold text-cyber-red mb-3">Danger Zone</h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={logout} className="cyber-btn-danger flex items-center gap-2 text-sm">
            <LogOut className="w-4 h-4" /> Sign Out All Devices
          </button>
          <button className="cyber-btn-danger text-sm">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
