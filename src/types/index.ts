export type UserRole =
  | "individual"
  | "business_owner"
  | "security_analyst"
  | "pen_tester"
  | "compliance_officer"
  | "enterprise_admin"
  | "platform_admin";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  mfaEnabled: boolean;
  lastLogin: string;
  createdAt: string;
  plan: "free" | "professional" | "enterprise";
  permissions: string[];
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  plan: "starter" | "professional" | "enterprise";
  membersCount: number;
  assetsCount: number;
  riskScore: number;
  complianceScore: number;
  createdAt: string;
  status: "active" | "suspended" | "trial";
  logo?: string;
}

export type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";
export type StatusType = "open" | "in_progress" | "resolved" | "closed" | "pending";

export interface Vulnerability {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  cvssScore: number;
  cve?: string;
  asset: string;
  assetType: string;
  status: StatusType;
  discoveredAt: string;
  updatedAt: string;
  assignedTo?: string;
  recommendation: string;
  category: string;
  exploitable: boolean;
}

export interface Asset {
  id: string;
  name: string;
  type: "server" | "workstation" | "webapp" | "mobile" | "network" | "cloud" | "domain" | "api";
  ip?: string;
  url?: string;
  os?: string;
  status: "online" | "offline" | "maintenance" | "unknown";
  riskScore: number;
  vulnerabilities: number;
  lastScanned: string;
  owner: string;
  environment: "production" | "staging" | "development" | "testing";
  patchStatus: "up_to_date" | "needs_update" | "critical" | "unknown";
  tags: string[];
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  status: StatusType;
  type: string;
  affectedAssets: string[];
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  priority: "p1" | "p2" | "p3" | "p4";
  timeline: IncidentEvent[];
  tags: string[];
}

export interface IncidentEvent {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  details: string;
}

export interface ThreatIntel {
  id: string;
  title: string;
  type: "malware" | "phishing" | "ransomware" | "apt" | "vulnerability" | "data_breach" | "ddos" | "ioc";
  severity: SeverityLevel;
  source: string;
  confidence: number;
  ioc?: string[];
  description: string;
  publishedAt: string;
  relevance: "high" | "medium" | "low";
  tags: string[];
  ttps?: string[];
}

export interface ComplianceFramework {
  id: string;
  name: string;
  version: string;
  description: string;
  totalControls: number;
  passedControls: number;
  failedControls: number;
  notApplicable: number;
  score: number;
  status: "compliant" | "partially_compliant" | "non_compliant";
  lastAssessed: string;
  nextAudit: string;
  category: string;
}

export interface PenTestProject {
  id: string;
  name: string;
  client: string;
  type: "web" | "network" | "mobile" | "api" | "cloud" | "social_engineering" | "red_team";
  status: "planning" | "active" | "testing" | "reporting" | "completed" | "cancelled";
  startDate: string;
  endDate: string;
  tester: string;
  scope: string[];
  findingsCount: number;
  criticalCount: number;
  highCount: number;
  progress: number;
  methodology: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: number;
  modules: number;
  enrolled: number;
  rating: number;
  progress: number;
  completed: boolean;
  certificationAvailable: boolean;
  tags: string[];
  thumbnail: string;
}

export interface Notification {
  id: string;
  type: "alert" | "info" | "warning" | "success" | "critical";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
  module: string;
}

export interface DashboardStats {
  riskScore: number;
  riskTrend: number;
  totalAssets: number;
  activeThreats: number;
  openVulnerabilities: number;
  criticalVulnerabilities: number;
  openIncidents: number;
  complianceScore: number;
  securityScore: number;
  patchCompliance: number;
  activeScans: number;
  trainingCompletion: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
  color?: string;
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  children?: NavItem[];
  roles?: UserRole[];
  module: string;
}
