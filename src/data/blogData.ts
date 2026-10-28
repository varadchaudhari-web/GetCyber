export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  glow: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  excerpt: string;
  tags: string[];
  sections: {
    heading: string;
    content: string[];
    callout?: {
      type: "warning" | "tip" | "info";
      title: string;
      text: string;
    };
    codeBlock?: {
      language: string;
      code: string;
    };
    keyPoints?: string[];
  }[];
  mitreTechniques?: { id: string; name: string; tactic: string }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "lockbit-3-analysis",
    slug: "lockbit-3-analysis",
    title: "LockBit 3.0 Analysis: What Security Teams Need to Know",
    category: "Threat Intel",
    date: "Jul 9, 2026",
    readTime: "8 min",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&h=600&fit=crop",
    glow: "rgba(239, 68, 68, 0.25)",
    author: {
      name: "Marcus Vance",
      role: "Lead Threat Intelligence Researcher",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    },
    excerpt:
      "A deep forensic dissection of LockBit 3.0 (LockBit Black), its modular builder leak, evasion mechanics, anti-analysis routines, and immediate defense playbooks for enterprise SOCs.",
    tags: ["Ransomware", "LockBit 3.0", "Threat Hunting", "SOC", "Malware Analysis"],
    mitreTechniques: [
      { id: "T1486", name: "Data Encrypted for Impact", tactic: "Impact" },
      { id: "T1078", name: "Valid Accounts", tactic: "Defense Evasion / Initial Access" },
      { id: "T1059.001", name: "PowerShell Execution", tactic: "Execution" },
      { id: "T1490", name: "Inhibit System Recovery", tactic: "Impact" },
    ],
    sections: [
      {
        heading: "Executive Threat Briefing",
        content: [
          "LockBit 3.0, internally referred to as 'LockBit Black', represents one of the most operationally aggressive Ransomware-as-a-Service (RaaS) variants monitored by GetCyber Labs. While law enforcement disruptions have seized key command-and-control infrastructure, leaked builder binaries have allowed multiple independent affiliate cells to weaponize private variants.",
          "Our SOC telemetry indicates that initial compromise typically stems from compromised remote desktop protocol (RDP) credentials, unpatched edge VPN vulnerabilities (specifically CVE-2023-46805 and CVE-2024-21887), and sophisticated credential phishing operations targeting IT administrators.",
        ],
        callout: {
          type: "warning",
          title: "Critical Advisory for Blue Teams",
          text: "LockBit 3.0 binaries require a unique 32-character password parameter provided at runtime (--pass) to unpack their payload. Without this key, sandbox detonation in automated dynamic analysis environments will fail.",
        },
      },
      {
        heading: "Execution Flow & Anti-Analysis Mechanics",
        content: [
          "Upon execution with the correct decrypter pass-flag, LockBit 3.0 immediately calls Win32 APIs to disable Windows Defender, terminate volume shadow copy services (`vssadmin delete shadows /all /quiet`), and kill over 65 critical enterprise database and hypervisor processes (including SQL Server, Oracle, and VMware ESXi services).",
          "The encryption routine combines multithreaded AES-256 in CBC mode for bulk data and RSA-4096 public key encryption for key encapsulation, achieving encryption throughput speeds exceeding 25,000 files per minute across local and network mounted drives.",
        ],
        codeBlock: {
          language: "bash",
          code: `# Observed malicious PowerShell execution during lateral movement:
powershell.exe -NoP -NonI -W Hidden -Exec Bypass -Command "Get-WmiObject Win32_ShadowCopy | ForEach-Object { $_.Delete() }"
vssadmin.exe Delete Shadows /All /Quiet
wbadmin.exe DELETE SYSTEMSTATEBACKUP -keepVersions:0`,
        },
        keyPoints: [
          "Anti-hooking routines check for API monitoring DLLs injected by EDR agents.",
          "Automatic privilege escalation leveraging SeDebugPrivilege and token duplication.",
          "Double-extortion tactics: Exfiltration via StealBit utility prior to payload encryption.",
          "Automated lateral movement across Active Directory domains via PsExec and WMI.",
        ],
      },
      {
        heading: "Enterprise SOC Containment & Remediation Playbook",
        content: [
          "To defend against LockBit variants, security operations centers must enforce immediate host isolation policies upon detecting high-volume file modification events and unauthorized vssadmin executions.",
          "GetCyber Automated Response rules trigger within 12 seconds of suspicious file entropy spikes, severing SMB/CIFS shares and revoking active Kerberos golden/silver tickets across the domain controller.",
        ],
        keyPoints: [
          "Isolate affected endpoints immediately from the internal VLAN to prevent lateral propagation.",
          "Enforce MFA across all remote access gateways without legacy protocol fallback.",
          "Implement immutable, air-gapped backup repositories validated weekly.",
          "Deploy GetCyber Endpoint Behavioral Sensors with canary honeypot files to detect encryption early.",
        ],
      },
    ],
  },
  {
    id: "iso-27001-2022-changes",
    slug: "iso-27001-2022-changes",
    title: "ISO 27001:2022 — Key Changes and What They Mean for Your Business",
    category: "Compliance",
    date: "Jul 7, 2026",
    readTime: "12 min",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop",
    glow: "rgba(49, 208, 170, 0.25)",
    author: {
      name: "Sarah Chen",
      role: "VP of Governance, Risk & Compliance",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
    },
    excerpt:
      "A complete roadmap to the ISO/IEC 27001:2022 revision: the restructuring from 114 to 93 controls, 11 brand new mandatory controls, and how to automate compliance audits with GetCyber.",
    tags: ["ISO 27001", "Compliance", "GRC", "Audit Readiness", "Security Governance"],
    sections: [
      {
        heading: "Overview of the 2022 Standard Revisions",
        content: [
          "The ISO/IEC 27001:2022 standard represents the first major overhaul in nearly a decade. While the core management clauses (Clauses 4 through 10) received minor wording alignments with the ISO Harmonized Structure, Annex A underwent a radical consolidation and modernisation.",
          "The previously cluttered 14 domains containing 114 controls have been streamlined into 4 clear organizational themes: Organizational Controls (37 controls), People Controls (8 controls), Physical Controls (14 controls), and Technological Controls (34 controls).",
        ],
        callout: {
          type: "info",
          title: "Transition Deadlines",
          text: "Certified organizations must complete their transition audits by October 31, 2025. All certifications following ISO 27001:2013 become obsolete, requiring your Statement of Applicability (SoA) to reflect the new 93 controls.",
        },
      },
      {
        heading: "The 11 New Mandatory Annex A Controls",
        content: [
          "The 2022 edition introduces 11 critical controls designed to address modern threat landscapes including cloud multi-tenancy, digital supply chain attacks, and data leakage risks.",
        ],
        keyPoints: [
          "A.5.7 Threat Intelligence: Systematic collection, analysis, and application of cyber threat indicators.",
          "A.5.23 Information Security for Cloud Services: Security requirements for acquisition, use, and termination of cloud services.",
          "A.5.30 ICT Readiness for Business Continuity: Ensuring IT architecture resilience during major outages.",
          "A.7.4 Physical Security Monitoring: Continuous monitoring of sensitive facilities and data centers.",
          "A.8.9 Configuration Management: Standardized, hardened baseline configurations and drift detection.",
          "A.8.10 Information Deletion: Compliant sanitization and erasure of data in adherence to privacy laws.",
          "A.8.11 Data Masking: Pseudonymization and masking of PII across test, staging, and analytics databases.",
          "A.8.12 Data Leakage Prevention (DLP): Monitoring and blocking unauthorized egress of sensitive intellectual property.",
          "A.8.16 Monitoring Activities: Behavioral anomaly detection and baseline network telemetry analysis.",
          "A.8.23 Web Filtering: Restricting employee access to malicious, phishing, or unauthorized domains.",
          "A.8.28 Secure Coding: Security governance integrated into CI/CD pipelines, SAST/DAST scanning, and code review.",
        ],
      },
      {
        heading: "Automating Audit Readiness with GetCyber GRC",
        content: [
          "GetCyber's Compliance module maps your real-time cloud infrastructure, vulnerability scans, and access control audit logs directly to the ISO 27001:2022 Annex A framework.",
          "Rather than performing painful manual evidence collection across dozens of spreadsheets, our platform automatically generates your Statement of Applicability (SoA) and continuous evidence packages ready for external certification bodies.",
        ],
      },
    ],
  },
  {
    id: "ai-in-cybersecurity-mttr",
    slug: "ai-in-cybersecurity-mttr",
    title: "AI in Cybersecurity: How GC-AI Reduces MTTR by 86%",
    category: "Product",
    date: "Jul 5, 2026",
    readTime: "6 min",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
    glow: "rgba(77, 141, 255, 0.25)",
    author: {
      name: "Dr. Elena Rostova",
      role: "Chief AI Architect",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=faces",
    },
    excerpt:
      "Discover the algorithmic architecture behind GC-AI: alert clustering, neural causality trees, and how machine-speed triage slashes enterprise Mean Time To Remediate from 4.2 hours to 35 minutes.",
    tags: ["Artificial Intelligence", "MTTR", "SOC Automation", "Machine Learning", "GC-AI"],
    sections: [
      {
        heading: "The Enterprise Alert Fatigue Crisis",
        content: [
          "A modern enterprise security operations center ingests over 10,000 security signals every 24 hours. Studies show that tier-1 SOC analysts spend up to 74% of their shifts reviewing noisy, disconnected alerts — leading directly to analyst burnout, delayed triage, and missed dwell time.",
          "Mean Time to Remediate (MTTR) across Fortune 500 enterprises has averaged 4.2 hours for critical incidents. In a cyberattack where lateral movement occurs in under 45 minutes, a 4-hour response window is catastrophic.",
        ],
      },
      {
        heading: "GC-AI's Causality Engine Architecture",
        content: [
          "GetCyber AI (GC-AI) employs a multi-agent transformer model trained on millions of real-world attack graphs, MITRE ATT&CK patterns, and threat intelligence feeds. The engine operates in three continuous stages:",
        ],
        keyPoints: [
          "1. Telemetry Deduplication & Graph Synthesis: 10,000 raw alerts are correlated into 3-5 cohesive incident attack chains using temporal and topological graph neural networks.",
          "2. Autonomous Context Enrichment: GC-AI automatically queries asset databases, recent code deployments, and IP reputation feeds to calculate exploitability and blast radius.",
          "3. Deterministic Playbook Synthesis: Instead of providing vague suggestions, GC-AI outputs concrete, copy-pasteable firewall commands, host isolation scripts, and patch instructions.",
        ],
        codeBlock: {
          language: "json",
          code: `// Sample GC-AI Telemetry Synthesis Output:
{
  "incident_id": "INC-2026-904",
  "root_cause": "CVE-2026-21887 on Edge Gateway",
  "confidence_score": 0.984,
  "attack_vector": "Remote Code Execution -> Privilege Escalation -> Credential Dump",
  "recommended_action": "isolate_endpoint('10.240.12.8') && revoke_token('usr_9812')",
  "estimated_mttr_impact": "-86%"
}`,
        },
      },
      {
        heading: "Real-World Benchmark Results",
        content: [
          "In peer-reviewed enterprise trials across 50 production environments, GC-AI reduced median alert triage time from 48 minutes down to 14 seconds. Overall MTTR dropped from 252 minutes to just 35 minutes — an 86.1% improvement in operational efficiency.",
        ],
      },
    ],
  },
  {
    id: "zero-trust-architecture-guide",
    slug: "zero-trust-architecture-guide",
    title: "Building a Zero Trust Architecture: Step-by-Step Guide",
    category: "Architecture",
    date: "Jul 3, 2026",
    readTime: "15 min",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=600&fit=crop",
    glow: "rgba(167, 123, 255, 0.25)",
    author: {
      name: "Alex Morgan",
      role: "Lead Security Architect",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    },
    excerpt:
      "Move beyond legacy VPNs with an actionable 4-phase Zero Trust implementation framework aligned with NIST SP 800-207: identity verification, micro-segmentation, and continuous telemetry monitoring.",
    tags: ["Zero Trust", "NIST 800-207", "Network Security", "Identity", "Cloud Security"],
    sections: [
      {
        heading: "The Demise of the Perimeter Security Model",
        content: [
          "Traditional 'castle-and-moat' network architectures operated under a flawed assumption: everything inside the corporate perimeter could be trusted. With hybrid workforces, multi-cloud SaaS deployments, and sophisticated insider threats, this assumption is obsolete.",
          "Zero Trust operates on three non-negotiable principles established in NIST Special Publication 800-207: Verify explicitly, use least privilege access, and assume breach at all times.",
        ],
      },
      {
        heading: "The 4-Phase Zero Trust Implementation Framework",
        content: [
          "Transitioning to Zero Trust does not happen overnight. We recommend a phased roll-out strategy that avoids operational disruption while continuously closing attack surfaces.",
        ],
        keyPoints: [
          "Phase 1: Identity & Device Trust Foundation: Implement modern identity providers (IdP) with mandatory phishing-resistant FIDO2/WebAuthn MFA. Enforce endpoint posture verification before granting session tokens.",
          "Phase 2: Microsegmentation & Software-Defined Perimeters: Replace broad site-to-site VPNs with granular Zero Trust Network Access (ZTNA). Each application connection is brokered individually based on dynamic risk.",
          "Phase 3: Data Classification & Encryption: Tag sensitive data at rest and in transit. Apply cryptographic access controls so even compromised storage buckets cannot be read.",
          "Phase 4: Continuous Adaptive Trust Engine: Ingest real-time behavior analytics. If an authenticated user suddenly accesses databases from an unusual geographic location or anomalous device, revoke session rights instantly.",
        ],
      },
    ],
  },
  {
    id: "ransomware-response-playbook",
    slug: "ransomware-response-playbook",
    title: "Ransomware Response Playbook: A Practical Guide",
    category: "Incident Response",
    date: "Jul 1, 2026",
    readTime: "10 min",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
    glow: "rgba(249, 115, 22, 0.25)",
    author: {
      name: "Marcus Vance",
      role: "Lead Threat Intelligence Researcher",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    },
    excerpt:
      "When every second counts: An operational step-by-step incident response playbook covering containment in the first 60 minutes, forensic evidence preservation, and safe recovery orchestration.",
    tags: ["Incident Response", "Playbook", "Forensics", "Disaster Recovery", "SOC"],
    sections: [
      {
        heading: "The Golden Hour: Immediate First 60 Minutes",
        content: [
          "During an active ransomware outbreak, the actions taken within the first 60 minutes dictate whether the incident results in minor localized disruption or enterprise catastrophe.",
          "Do NOT power down infected machines immediately. Powering off systems wipes volatile RAM memory containing cryptographic keys, active process handles, and memory-injected payloads essential for digital forensics.",
        ],
        callout: {
          type: "warning",
          title: "Critical Operational Directive",
          text: "Disconnect network cables and disable Wi-Fi/NIC interfaces instead of shutting down power. Preserve RAM dumps using WinPmem or LiME before performing any reboot operations.",
        },
        keyPoints: [
          "Step 1: Sever network interfaces (physical unplugs, virtual NIC disconnects) across affected subnets.",
          "Step 2: Disable automated backup sync jobs to prevent ransomware from propagating encrypted blobs to secondary backup targets.",
          "Step 3: Freeze Active Directory accounts that initiated lateral administrative sessions.",
          "Step 4: Spin up out-of-band communication channels (Signal/private bridge) for the incident response team.",
        ],
      },
      {
        heading: "Evidence Acquisition & Root Cause Triaging",
        content: [
          "Once containment is established, the incident response unit must capture forensic timelines to identify patient zero. GetCyber's Incident Management module correlates SIEM logs, firewall flows, and endpoint process trees to reconstruct the timeline automatically.",
        ],
      },
    ],
  },
  {
    id: "cvss-4-understanding-scoring",
    slug: "cvss-4-understanding-scoring",
    title: "CVSS 4.0: Understanding the New Scoring System",
    category: "Vulnerabilities",
    date: "Jun 28, 2026",
    readTime: "7 min",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&h=600&fit=crop",
    glow: "rgba(245, 158, 11, 0.25)",
    author: {
      name: "Sarah Chen",
      role: "VP of Governance, Risk & Compliance",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=faces",
    },
    excerpt:
      "A complete guide to FIRST's CVSS v4.0 specification: the introduction of Attack Requirements (AT), fine-grained impact metrics, and why Base Score is no longer enough for vulnerability prioritization.",
    tags: ["CVSS 4.0", "Vulnerability Management", "AppSec", "CVE", "Risk Scoring"],
    sections: [
      {
        heading: "Why CVSS v3.1 Needed Replacement",
        content: [
          "For years, security teams treated the CVSS Base Score as a direct measurement of real-world risk. However, a vulnerability with a high base score (like 9.8) might require extraordinary conditions to exploit or may never be weaponized in the wild.",
          "The Forum of Incident Response and Security Teams (FIRST) officially launched CVSS v4.0 to resolve ambiguity and provide enterprise security teams with nuanced, threat-informed scoring nomenclature.",
        ],
      },
      {
        heading: "Key Innovations in the CVSS 4.0 Metric Groups",
        content: [
          "CVSS v4.0 introduces distinct nomenclature to clearly communicate what factors are included in a score:",
        ],
        keyPoints: [
          "CVSS-B: Base metrics (intrinsic qualities independent of threat or environment).",
          "CVSS-BT: Base + Threat metrics (incorporates real-time active exploitation telemetry).",
          "CVSS-BE: Base + Environmental metrics (incorporates organization-specific mitigations).",
          "CVSS-BTE: Base + Threat + Environmental (the gold standard for operational risk prioritization).",
          "New Attack Requirements (AT) metric: Distinguishes between inherent attack complexity and prerequisite environmental conditions.",
          "Expanded Impact: Separate scoring for impact to the vulnerable system vs. subsequent impact to downstream systems.",
        ],
      },
      {
        heading: "Applying CVSS 4.0 in GetCyber",
        content: [
          "GetCyber's Vulnerability Assessment module automatically calculates CVSS-BTE scores by joining CVE database records with live threat intelligence feeds. This ensures your engineering teams patch active exploit vectors first, cutting vulnerability backlogs by up to 60%.",
        ],
      },
    ],
  },
];
