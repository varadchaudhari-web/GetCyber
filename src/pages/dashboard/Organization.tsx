import { Building2, Users, Shield, Plus, Mail, CheckCircle, XCircle, Settings } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import { TEAM_MEMBERS, MOCK_ORGANIZATION } from "@/constants/mockData";
import { formatDate, formatRoleLabel } from "@/lib/utils";
import RiskGauge from "@/components/shared/RiskGauge";

export default function Organization() {
  const { user } = useAuthStore();
  const org = MOCK_ORGANIZATION;

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">Organization</h1>
          <p className="section-subheader">Manage your organization profile, teams, roles, and billing</p>
        </div>
        <button className="cyber-btn-primary flex items-center gap-2 text-sm py-2">
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      {/* Org Profile */}
      <div className="glass-card p-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-cyber-blue/20 border border-cyber-blue/40 rounded-2xl flex items-center justify-center">
              <Building2 className="w-8 h-8 text-cyber-blue" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{org.name}</h2>
              <p className="text-dark-text">{org.domain} · {org.industry}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 rounded-full bg-cyber-green" />
                <span className="text-xs text-cyber-green capitalize">{org.status}</span>
                <span className="text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 px-2 py-0.5 rounded-full capitalize">{org.plan}</span>
              </div>
            </div>
          </div>
          <button className="cyber-btn-secondary flex items-center gap-2 text-sm py-2">
            <Settings className="w-4 h-4" /> Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-dark-border">
          {[
            { label: "Team Members", value: org.membersCount },
            { label: "Assets", value: org.assetsCount },
            { label: "Organization Size", value: org.size },
            { label: "Member Since", value: formatDate(org.createdAt, "short") },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <p className="text-2xl font-black text-white">{item.value}</p>
              <p className="text-xs text-dark-text mt-1">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Security + Compliance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="glass-card p-6 flex flex-col items-center gap-4">
          <h3 className="font-bold text-white self-start">Organization Risk Score</h3>
          <RiskGauge score={org.riskScore} size="lg" />
        </div>
        <div className="glass-card p-6 flex flex-col items-center gap-4">
          <h3 className="font-bold text-white self-start">Compliance Score</h3>
          <div className="flex flex-col items-center gap-2">
            <p className="text-5xl font-black text-cyber-green">{org.complianceScore}%</p>
            <p className="text-dark-text text-sm">Across all active frameworks</p>
            <div className="w-full h-3 bg-dark-card rounded-full overflow-hidden mt-2">
              <div className="h-full bg-gradient-to-r from-cyber-blue to-cyber-green rounded-full" style={{ width: `${org.complianceScore}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyber-blue" />
            Team Members ({TEAM_MEMBERS.length})
          </h3>
          <button className="text-xs text-cyber-blue hover:text-cyber-blue-light transition-colors">View All Members</button>
        </div>
        <div className="space-y-3">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="flex items-center gap-3 p-3 bg-dark-card/40 border border-dark-border rounded-xl hover:border-cyber-blue/30 transition-all">
              <img src={member.avatar} alt={member.name} className="w-9 h-9 rounded-full object-cover border border-dark-border flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-white">{member.name}</p>
                  {member.id === user?.id && <span className="text-xs bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 px-1.5 py-0.5 rounded">You</span>}
                </div>
                <p className="text-xs text-dark-text">{member.email}</p>
              </div>
              <div className="hidden sm:flex flex-col items-end gap-1">
                <span className="text-xs bg-dark-card border border-dark-border text-dark-text-bright px-2 py-0.5 rounded capitalize">{formatRoleLabel(member.role)}</span>
                <span className="text-xs text-dark-text">{member.department}</span>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {member.mfaEnabled
                  ? <CheckCircle className="w-4 h-4 text-cyber-green" title="MFA Enabled" />
                  : <XCircle className="w-4 h-4 text-cyber-red" title="MFA Disabled" />
                }
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 p-4 bg-dark-card/40 border border-dark-border rounded-xl">
          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyber-blue" /> Invite New Member
          </h4>
          <div className="flex gap-3">
            <input type="email" placeholder="colleague@company.com" className="input-cyber flex-1 py-2 text-sm" />
            <select className="input-cyber w-40 text-sm">
              <option>Security Analyst</option>
              <option>Pen Tester</option>
              <option>Compliance Officer</option>
              <option>Viewer</option>
            </select>
            <button className="cyber-btn-primary text-sm py-2 px-4 whitespace-nowrap">
              Send Invite
            </button>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div className="glass-card p-6">
        <h3 className="font-bold text-white mb-4">Departments & Teams</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: "Security Operations (SOC)", members: 8, lead: "Alex Morgan", icon: "🛡️" },
            { name: "Red Team", members: 4, lead: "Sarah Chen", icon: "🎯" },
            { name: "GRC & Compliance", members: 6, lead: "Mike Johnson", icon: "📋" },
            { name: "IT Security", members: 12, lead: "Elena Vasquez", icon: "💻" },
            { name: "Cloud Security", members: 5, lead: "David Park", icon: "☁️" },
            { name: "Threat Intelligence", members: 3, lead: "Priya Sharma", icon: "🔍" },
          ].map((dept) => (
            <div key={dept.name} className="glass-card-hover p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{dept.icon}</span>
                <h4 className="text-sm font-semibold text-white">{dept.name}</h4>
              </div>
              <p className="text-xs text-dark-text">Lead: {dept.lead}</p>
              <p className="text-xs text-dark-text">{dept.members} members</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subscription */}
      <div className="glass-card p-6 border-cyber-blue/20 border">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h3 className="font-bold text-white mb-1 flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyber-blue" />
              Current Plan: Enterprise
            </h3>
            <p className="text-dark-text text-sm">Unlimited users · All features · 24/7 support · SLA guarantee</p>
          </div>
          <div className="flex gap-3">
            <button className="cyber-btn-secondary text-sm py-2">Manage Billing</button>
            <button className="cyber-btn-primary text-sm py-2">Upgrade Plan</button>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 pt-4 border-t border-dark-border">
          {[
            { label: "Plan", value: "Enterprise" },
            { label: "Renewal", value: "2027-01-01" },
            { label: "Active Users", value: `${org.membersCount} / ∞` },
            { label: "Assets", value: `${org.assetsCount} / ∞` },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-dark-text">{item.label}</p>
              <p className="text-sm font-semibold text-white mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
