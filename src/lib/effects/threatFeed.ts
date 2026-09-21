export interface ThreatEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  targetRegion: string;
  vector: string;
  severity: "critical" | "medium" | "info";
  action: string;
}

const SAMPLE_VECTORS = [
  "Ransomware.LockBit.Payload",
  "SQLi: Blind Boolean Probe",
  "SSRF AWS IMDSv1 Query",
  "SSH Brute-Force Auth Attempt",
  "CVE-2024-3400 PAN-OS Exploit",
  "Kerberoasting TGS Req",
  "DNS Tunneling / Exfil Pattern",
  "JWT Null Signature Bypass",
  "Zero-Day Heap Overflow Probe",
  "Credential Stuffing Gateway",
  "BGP Route Anomaly / Hijack",
  "Malicious NPM Package Exec",
];

const SAMPLE_IPS = [
  "185.220.101.5",
  "45.154.255.89",
  "194.26.29.112",
  "103.149.28.14",
  "91.240.118.230",
  "198.51.100.42",
  "193.142.146.33",
  "176.119.25.18",
  "89.248.165.71",
];

const SAMPLE_REGIONS = ["US-East", "EU-Central", "AP-South", "SG-Node-4", "UK-West", "JP-Tokyo", "BR-SaoPaulo"];

const SEVERITIES: ("critical" | "medium" | "info")[] = ["critical", "medium", "info", "critical", "medium"];
const ACTIONS = ["BLOCKED", "ISOLATED", "QUARANTINED", "RATE-LIMITED", "DEFLECTED"];

export function generateThreatEntry(): ThreatEntry {
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}.${String(Math.floor(now.getMilliseconds() / 10)).padStart(2, "0")}`;
  const sev = SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
  const vector = SAMPLE_VECTORS[Math.floor(Math.random() * SAMPLE_VECTORS.length)];
  const ip = SAMPLE_IPS[Math.floor(Math.random() * SAMPLE_IPS.length)];
  const reg = SAMPLE_REGIONS[Math.floor(Math.random() * SAMPLE_REGIONS.length)];
  const act = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];

  return {
    id: `${Date.now()}-${Math.random()}`,
    timestamp: timeStr,
    sourceIp: ip,
    targetRegion: reg,
    vector,
    severity: sev,
    action: act,
  };
}

export function initFeed(feedEl: HTMLElement | null): () => void {
  if (!feedEl) return () => {};

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getSeverityStyle = (sev: "critical" | "medium" | "info") => {
    switch (sev) {
      case "critical":
        return { color: "#ff6b81", bg: "rgba(255, 107, 129, 0.15)", border: "rgba(255, 107, 129, 0.3)" };
      case "medium":
        return { color: "#ffcc66", bg: "rgba(255, 204, 102, 0.15)", border: "rgba(255, 204, 102, 0.3)" };
      case "info":
        return { color: "#31d0aa", bg: "rgba(49, 208, 170, 0.15)", border: "rgba(49, 208, 170, 0.3)" };
    }
  };

  const renderRow = (item: ThreatEntry): HTMLElement => {
    const row = document.createElement("div");
    row.className = "flex items-center justify-between py-1.5 px-3 text-xs font-mono border-b border-white/5 hover:bg-white/[0.02] transition-colors";

    const style = getSeverityStyle(item.severity);

    row.innerHTML = `
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="text-white/40 select-none">${item.timestamp}</span>
        <span style="color: ${style.color}; background: ${style.bg}; border: 1px solid ${style.border};" class="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase">
          ${item.severity}
        </span>
        <span class="text-[#eaf0ff] font-medium truncate">${item.vector}</span>
      </div>
      <div class="flex items-center gap-3 ml-2 flex-shrink-0 text-right">
        <span class="text-[#93a2c4] hidden sm:inline text-[11px]">${item.sourceIp}</span>
        <span class="text-white/40 hidden md:inline text-[10px]">[${item.targetRegion}]</span>
        <span class="text-[#31d0aa] font-semibold text-[10px] bg-[#31d0aa]/10 px-1.5 py-0.5 rounded border border-[#31d0aa]/20">${item.action}</span>
      </div>
    `;

    return row;
  };

  // Seed with initial 5 rows
  feedEl.innerHTML = "";
  for (let i = 0; i < 5; i++) {
    const entry = generateThreatEntry();
    const row = renderRow(entry);
    feedEl.appendChild(row);
  }

  if (prefersReduced) return () => {};

  const intervalId = window.setInterval(() => {
    const entry = generateThreatEntry();
    const row = renderRow(entry);

    if (feedEl.firstChild) {
      feedEl.insertBefore(row, feedEl.firstChild);
    } else {
      feedEl.appendChild(row);
    }

    while (feedEl.children.length > 9) {
      if (feedEl.lastChild) {
        feedEl.removeChild(feedEl.lastChild);
      }
    }
  }, 2200);

  return () => {
    window.clearInterval(intervalId);
  };
}
