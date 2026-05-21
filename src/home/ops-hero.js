import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AuthModal } from "./AuthModal";
import Icon from "./icon-pack";
import ICON from "./icon-pack";

const ticketData = [
  { id: "TK-2841", title: "API Gateway timeout", priority: "critical", status: "escalated", time: "2m ago", sla: 12 },
  { id: "TK-2839", title: "Auth service degraded", priority: "high", status: "in-progress", time: "8m ago", sla: 45 },
  { id: "TK-2836", title: "DB replica lag spike", priority: "medium", status: "monitoring", time: "15m ago", sla: 78 },
  { id: "TK-2830", title: "CDN cache miss rate", priority: "low", status: "resolved", time: "32m ago", sla: 95 },
  { id: "TK-2828", title: "Payment webhook delay", priority: "high", status: "in-progress", time: "41m ago", sla: 38 },
];

const slaData = [62, 70, 58, 75, 80, 68, 72, 85, 78, 88, 82, 91, 87, 79, 84, 92, 88, 94, 90, 96];
const workloadData = [
  { team: "Platform", load: 87, color: "#f87171" },
  { team: "Backend", load: 64, color: "#fb923c" },
  { team: "Frontend", load: 43, color: "#34d399" },
  { team: "DevOps", load: 72, color: "#f59e0b" },
  { team: "Security", load: 55, color: "#60a5fa" },
];

const aiInsights = [
  { icon: "⚡", label: "Escalation Risk", value: "HIGH", sub: "3 tickets crossing SLA", color: "#f87171", bg: "rgba(248,113,113,0.08)" },
  { icon: "🧠", label: "IEE™ Prediction", value: "↑ 34%", sub: "Load spike in 20 min", color: "#f59e0b", bg: "rgba(245,158,11,0.08)" },
  { icon: "✅", label: "Resolved Today", value: "47", sub: "↑ 12% vs yesterday", color: "#34d399", bg: "rgba(52,211,153,0.08)" },
];

const sparkline = [40, 55, 38, 62, 48, 71, 55, 80, 65, 88, 74, 92, 82, 96, 89, 97];

const logos = [
  "Slack","Jira","GitHub","Linear","Zendesk"
];

const features = [
  {
    icon: "🧠",
    title: "Intelligent Escalation Detection",
    body:
      "Detect escalation risks before SLA breaches occur. Operix continuously analyzes ticket velocity, workload pressure, and support patterns in real time.",
    badge: "Real-time intelligence",
    color: "#818cf8",
    bg: "rgba(99,102,241,0.08)",
    border: "rgba(99,102,241,0.18)",
  },
  {
    icon: "🖥️",
    title: "Operational Analytics",
    body:
      "Monitor ticket throughput, resolution efficiency, SLA compliance, and operational health through live IEE™-powered dashboards.",
    badge: "Live dashboards",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.18)",
  },
  {
    icon: "⚖️",
    title: "Workload Distribution",
    body:
      "Identify overloaded teams instantly and rebalance support operations before burnout or queue congestion impacts customers.",
    badge: "Team visibility",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.18)",
  },
  {
    icon: "⚙️",
    title: "Workflow Automation",
    body:
      "Automate routing, escalation rules, and operational coordination without writing scripts or complex workflows.",
    badge: "No-code automation",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.18)",
  },
  {
    icon: "🛡️",
    title: "SLA Intelligence",
    body:
      "Receive proactive SLA warnings and IEE™ assisted mitigation suggestions before customer impact occurs.",
    badge: "Breach prevention",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.18)",
  },
  {
    icon: "🔗",
    title: "Integrations & Coordination",
    body:
      "Connect Slack, Jira, Zendesk, PagerDuty, GitHub, and more into one unified operational intelligence layer.",
    badge: "40+ integrations",
    color: "#c084fc",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.18)",
  },
];

const operationalCapacity=[
  {
        value: "24/7",
        label: "Real-time operational visibility",
      },
      {
        value: "40+",
        label: "Workflow Integrations",
      },
      {
        value: "99.2%",
        label: "SLA Visibility Accuracy",
      },
      {
        value: "<2 min",
        label: "Escalation Detection Time",
      },
]

const howSteps = [
  {
    icon: "🔌",
    title: "Connect your stack",
    body: "OAuth with Jira, Slack, Zendesk and more in under 3 minutes.",
    bg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.25)",
  },
  {
    icon: "🧠",
    title: "IEE™ learns your ops",
    body: "Operix ingests historical ticket data automatically.",
    bg: "rgba(52,211,153,0.1)",
    border: "rgba(52,211,153,0.22)",
  },
  {
    icon: "📡",
    title: "Monitor in real time",
    body: "Surface risk, workload imbalances, and SLA pressure live.",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.22)",
  },
  {
    icon: "💡",
    title: "Acts on IEE™ suggestions",
    body: "Trigger automations or reassign with one click.",
    bg: "rgba(248,113,113,0.1)",
    border: "rgba(248,113,113,0.22)",
  },
];

const testimonials = [
  {
    initials: "SR",
    name: "Sarah R.",
    role: "Head of Support Ops · Stripe",
    quote:
      "Operix caught an escalation pattern we'd been missing for months.",
    color: "#6366f1",
  },
  {
    initials: "MK",
    name: "Marcus K.",
    role: "VP Engineering · Vercel",
    quote:
      "The workload distribution view alone saved us from burning out engineers.",
    color: "#10b981",
  },
  {
    initials: "JL",
    name: "Jamie L.",
    role: "CTO · Retool",
    quote:
      "Operix was the only platform that felt genuinely intelligent.",
    color: "#f59e0b",
  },
];

const footerLinks = [
  "Privacy",
  "Terms",
  "Security",
  "Status",
  "Docs",
  "Blog",
];

function MiniSparkline({ data, color, width = 100, height = 32 }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / (max - min)) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function SLAChart() {
  const w = 280, h = 80;
  const max = Math.max(...slaData), min = 50;
  const pts = slaData.map((v, i) => {
    const x = (i / (slaData.length - 1)) * (w - 16) + 8;
    const y = h - ((v - min) / (max - min)) * (h - 12) - 6;
    return `${x},${y}`;
  }).join(" ");
  const areaClose = `${(slaData.length - 1) / (slaData.length - 1) * (w - 16) + 8},${h} 8,${h}`;
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <defs>
        <linearGradient id="slaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#34d399" stopOpacity="0.01" />
        </linearGradient>
      </defs>
      <polygon points={`${pts} ${areaClose}`} fill="url(#slaGrad)" />
      <polyline points={pts} fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      {slaData.slice(-1).map((v, _) => {
        const x = (w - 16) + 8;
        const y = h - ((v - min) / (max - min)) * (h - 12) - 6;
        return <circle key="dot" cx={x} cy={y} r="3" fill="#34d399" />;
      })}
    </svg>
  );
}

const priorityMeta = {
  critical: { color: "#f87171", label: "Critical", dot: "bg-red-400" },
  high: { color: "#f59e0b", label: "High", dot: "bg-amber-400" },
  medium: { color: "#60a5fa", label: "Medium", dot: "bg-blue-400" },
  low: { color: "#34d399", label: "Low", dot: "bg-emerald-400" },
};

const statusMeta = {
  escalated: { bg: "rgba(248,113,113,0.1)", color: "#f87171", label: "Escalated" },
  "in-progress": { bg: "rgba(245,158,11,0.1)", color: "#f59e0b", label: "In Progress" },
  monitoring: { bg: "rgba(96,165,250,0.1)", color: "#60a5fa", label: "Monitoring" },
  resolved: { bg: "rgba(52,211,153,0.1)", color: "#34d399", label: "Resolved" },
};

function AnimatedCounter({ target, duration = 1800 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return <span>{val}</span>;
}

const BADGES = [
  { icon: "🧠", text: "Intelligent Escalation Detection" },
  { icon: "🖥️", text: "Operational Analytics" },
  { icon: "⚙️", text: "Smart Workflow Automation" },
];

function NavLink({ label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      style={{ cursor: "pointer", transition: "color 0.2s", color: hovered ? "#e2e8f0" : "rgba(226,232,240,0.55)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </span>
  );
}
export default function Hero() {
  const [tick, setTick] = useState(0);
  const [activeTicket, setActiveTicket] = useState(null);
  const[open,setOpen]=useState(false);
  const[tab,setTab]=useState("signin");

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 3000);
    return () => clearInterval(id);
  }, []);

  const liveMetrics = [
    { label: "Open Tickets", value: 142 + (tick % 3), delta: "+2", up: true },
    { label: "SLA Health", value: "94%", delta: "+1.2%", up: true },
    { label: "Avg Response", value: "4.2m", delta: "-0.8m", up: true },
    { label: "Escalations", value: 3 + (tick % 2), delta: "+1", up: false },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0b0f 0%, #0d1117 40%, #0f1420 100%)",
      fontFamily: "'DM Sans', 'Geist', 'Inter', system-ui, sans-serif",
      color: "#e2e8f0",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)`,
        backgroundSize: "44px 44px",
      }} />

      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "-120px", left: "30%", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(99,102,241,0.08) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "0", right: "10%", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(52,211,153,0.05) 0%, transparent 70%)", zIndex: 0, pointerEvents: "none" }} />

      {/* Nav */}
      <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: "60px", borderBottom: "1px solid rgba(255,255,255,0.055)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", background: "linear-gradient(135deg, #6366f1, #34d399)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>⚡</div>
          <span style={{ fontSize: "15px", fontWeight: "600", letterSpacing: "-0.02em", color: "#f1f5f9" }}>Operix</span>
          <span style={{ fontSize: "9px", background: "rgba(99,102,241,0.15)", color: "#818cf8", padding: "2px 7px", borderRadius: "20px", border: "1px solid rgba(99,102,241,0.2)", fontWeight: "500",opacity:"0.72", }}>Powered by IEE™</span>
        </div>
       <div style={{ display: "flex", gap: "28px", fontSize: "13.5px", color: "rgba(226,232,240,0.55)", fontWeight: "450" }}>
          {["Product", "Solutions", "Pricing", "Docs"].map(n => (
            <NavLink key={n} label={n} />
          ))}
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <button onClick={()=>{setTab("signin"); setOpen(true)}} style={{ background: "none", border: "none", color:"rgba(226,232,240,0.62)", fontSize: "14px", cursor: "pointer", padding: "7px 14px", fontFamily: "inherit", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#f1f5f9"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(226,232,240,0.62)"}>Sign in</button>
          <button onClick={()=>{setTab("create"); setOpen(true)}} style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "#fff", border: "none", borderRadius: "9px", padding: "8px 18px", fontSize: "13.5px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 20px rgba(99,102,241,0.35)", letterSpacing: "-0.01em", transition: "box-shadow 0.2s, transform 0.15s"}}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 0 32px rgba(99,102,241,0.5)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.35)"; e.currentTarget.style.transform = "translateY(0)"; }}>Get Started</button>
        </div>
      </motion.nav>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", gap: "48px", maxWidth: "1280px", margin: "0 auto", padding: "64px 40px 80px" }}>

        {/* LEFT */}
        <div style={{ flex: "0 0 480px", paddingTop: "16px" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "20px", padding: "4px 12px 4px 8px", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", boxShadow: "0 0 6px #34d399", display: "inline-block" }} />
              <span style={{ fontSize: "12px", color: "#a5b4fc", fontWeight: "500" }}>Now with Intelligent Escalation Engine</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: "46px", fontWeight: "700", lineHeight: "1.12", letterSpacing: "-0.035em", color: "#f1f5f9", margin: "0 0 20px" }}>
            Reduce Operational
            <span style={{ display: "block", background: "linear-gradient(90deg, #6366f1, #34d399 70%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Chaos with
            </span>
            Workflow Intelligence
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: "16px", lineHeight: "1.65", color: "rgba(226,232,240,0.62)", margin: "0 0 36px", maxWidth: "420px" }}>
            Track operational issues, detect escalation risks, monitor team workload, and gain real-time visibility through an intelligent support coordination platform.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
            <motion.button whileHover={{ y: -2 }}
            style={{background:"linear-gradient(135deg,#6366f1,#4f46e5)",color: "#fff",border: "none",borderRadius: "10px",padding: "12px 24px",fontSize: "14.5px",fontWeight: "600",
                    cursor: "pointer",boxShadow: "0 0 28px rgba(99,102,241,0.35),0 2px 8px rgba(0,0,0,0.3)", letterSpacing: "-0.01em", display:"flex",alignItems:"center",gap:"6px"}}>▶ Start Demo</motion.button>
          <motion.button whileHover={{background: "rgba(255,255,255,0.1)",}}
            style={{background: "rgba(255,255,255,0.04)",color: "#e2e8f0",border:"1px solid rgba(255,255,255,0.1)",borderRadius: "10px",padding: "12px 24px",
                  fontSize: "14.5px",fontWeight: "500",cursor: "pointer",letterSpacing:"-0.01em",backdropFilter:"blur(8px),"}}>View Dashboard →</motion.button>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {BADGES.map((b, i) => (
              <motion.div key={b.text} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.08 }}
                style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "8px", padding: "6px 12px" }}>
                <span style={{ fontSize: "13px" }}>{b.icon}</span>
                <span style={{ fontSize: "12.5px", color: "rgba(226,232,240,0.7)", fontWeight: "450" }}>{b.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
            style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ display: "flex" }}>
              {["🟣", "🔵", "🟢"].map((c, i) => (
                <div key={i} style={{ width: "60px", height: "40px", borderRadius: "50%", background: ["#6366f1", "#3b82f6", "#10b981", "#f59e0b"][i], border: "2px solid #0d1117", marginLeft: i > 0 ? "-8px" : "0px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", color: "#fff", fontWeight: "500" }}>
                  {["Visibility", "Action", "Intelligence"][i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: "12.5px", fontWeight: "600", color: "#f1f5f9" }}><span style={{ color: "rgba(226,232,240,0.5)", fontWeight: "400" }}>operational visibility meets intelligent action</span></div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Dashboard */}
        <motion.div initial={{ opacity: 0, x: 40, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ flex: 1, minWidth: 0 }}>

          {/* Dashboard shell */}
          <div style={{
            background: "rgba(15,18,28,0.9)", border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px", overflow: "hidden",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(99,102,241,0.07)",
            backdropFilter: "blur(20px)",
          }}>

            {/* Dashboard titlebar */}
            <div style={{ background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "12px 16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ display: "flex", gap: "5px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: "11px", height: "11px", borderRadius: "50%", background: c }} />)}
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: "6px", padding: "3px 16px", fontSize: "11px", color: "rgba(226,232,240,0.4)", border: "1px solid rgba(255,255,255,0.05)" }}>
                  operix.iee/dashboard
                </div>
              </div>
              <div style={{ fontSize: "11px", color: "rgba(226,232,240,0.35)" }}>
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34d399", display: "inline-block", marginRight: "4px", boxShadow: "0 0 5px #34d399" }} />
                Live
              </div>
            </div>

            <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              {liveMetrics.map((m, i) => (
                <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.07 }}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "12px 14px" }}>
                  <div style={{ fontSize: "11px", color: "rgba(226,232,240,0.4)", marginBottom: "4px", fontWeight: "500" }}>{m.label}</div>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#f1f5f9", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {typeof m.value === "number" ? <AnimatedCounter target={m.value} /> : m.value}
                  </div>
                  <div style={{ fontSize: "11px", color: m.up ? "#34d399" : "#f87171", marginTop: "3px" }}>{m.delta}</div>
                </motion.div>
              ))}
            </div>

            {/* Main content */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 200px", gap: 0 }}>
              <div style={{ padding: "16px", borderRight: "1px solid rgba(255,255,255,0.05)" }}>

                {/* AI Summary Cards */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginBottom: "14px" }}>
                  {aiInsights.map((ins, i) => (
                    <motion.div key={ins.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 + i * 0.08 }}
                      style={{ background: ins.bg, border: `1px solid ${ins.color}22`, borderRadius: "10px", padding: "10px 12px" }}>
                      <div style={{ fontSize: "16px", marginBottom: "3px" }}>{ins.icon}</div>
                      <div style={{ fontSize: "10px", color: "rgba(226,232,240,0.45)", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.05em" }}>{ins.label}</div>
                      <div style={{ fontSize: "17px", fontWeight: "700", color: ins.color, letterSpacing: "-0.02em" }}>{ins.value}</div>
                      <div style={{ fontSize: "10px", color: "rgba(226,232,240,0.4)", marginTop: "1px" }}>{ins.sub}</div>
                    </motion.div>
                  ))}
                </div>

                {/* SLA Chart */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", padding: "12px 14px", marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "rgba(226,232,240,0.7)" }}>SLA Compliance Trend</span>
                    <span style={{ fontSize: "11px", color: "#34d399", fontWeight: "600" }}>94.2% ↑</span>
                  </div>
                  <SLAChart />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                    {["Jan", "Feb", "Mar", "Apr", "May"].map(m => (
                      <span key={m} style={{ fontSize: "10px", color: "rgba(226,232,240,0.25)" }}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Ticket List */}
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "10px", overflow: "hidden" }}>
                  <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "rgba(226,232,240,0.7)" }}>Active Tickets</span>
                    <span style={{ fontSize: "11px", color: "rgba(226,232,240,0.3)" }}>142 open</span>
                  </div>
                  {ticketData.map((t, i) => (
                    <motion.div key={t.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.06 }}
                      onMouseEnter={() => setActiveTicket(t.id)} onMouseLeave={() => setActiveTicket(null)}
                      style={{ padding: "8px 14px", display: "flex", alignItems: "center", gap: "10px", borderBottom: i < ticketData.length - 1 ? "1px solid rgba(255,255,255,0.035)" : "none", cursor: "pointer", background: activeTicket === t.id ? "rgba(255,255,255,0.03)" : "transparent", transition: "background 0.15s" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: priorityMeta[t.priority].color, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "12px", color: "#e2e8f0", fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
                        <div style={{ fontSize: "10.5px", color: "rgba(226,232,240,0.35)" }}>{t.id} · {t.time}</div>
                      </div>
                      <div style={{ flexShrink: 0 }}>
                        <span style={{ fontSize: "10px", padding: "2px 7px", borderRadius: "5px", background: statusMeta[t.status].bg, color: statusMeta[t.status].color, fontWeight: "600", whiteSpace: "nowrap" }}>
                          {statusMeta[t.status].label}
                        </span>
                      </div>
                      <div style={{ flexShrink: 0, width: "36px" }}>
                        <div style={{ height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${t.sla}%`, background: t.sla > 70 ? "#34d399" : t.sla > 40 ? "#f59e0b" : "#f87171", borderRadius: "2px" }} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* RIGHT PANEL: Workload + Sparklines */}
              <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "rgba(226,232,240,0.6)" }}>Team Workload</div>
                {workloadData.map((w, i) => (
                  <motion.div key={w.team} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 + i * 0.06 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ fontSize: "11.5px", color: "rgba(226,232,240,0.6)" }}>{w.team}</span>
                      <span style={{ fontSize: "11px", color: w.load > 80 ? "#f87171" : w.load > 65 ? "#f59e0b" : "#34d399", fontWeight: "600" }}>{w.load}%</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${w.load}%` }} transition={{ duration: 0.8, delay: 0.75 + i * 0.06, ease: "easeOut" }}
                        style={{ height: "100%", background: w.color, borderRadius: "3px" }} />
                    </div>
                  </motion.div>
                ))}

                <div style={{ marginTop: "8px", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "12px" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "rgba(226,232,240,0.6)", marginBottom: "10px" }}>Throughput</div>
                  <div style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "8px", padding: "10px" }}>
                    <div style={{ fontSize: "10px", color: "rgba(226,232,240,0.4)", marginBottom: "4px" }}>Tickets resolved / hr</div>
                    <div style={{ fontSize: "20px", fontWeight: "700", color: "#a5b4fc", letterSpacing: "-0.03em" }}>
                      <AnimatedCounter target={97} duration={1600} />
                    </div>
                    <MiniSparkline data={sparkline} color="#6366f1" width={155} height={28} />
                  </div>
                </div>

                {/* Escalation Warning */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }}
                  style={{ background: "rgba(248,113,113,0.07)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: "8px", padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px" }}>⚠️</span>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#f87171" }}>Escalation Alert</span>
                  </div>
                  <div style={{ fontSize: "10.5px", color: "rgba(226,232,240,0.55)", lineHeight: 1.5 }}>TK-2841 breaching SLA in <strong style={{ color: "#fca5a5" }}>8 min</strong>. Recommend immediate reassignment.</div>
                </motion.div>

                {/* AI Suggestion */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
                  style={{ background: "rgba(52,211,153,0.05)", border: "1px solid rgba(52,211,153,0.15)", borderRadius: "8px", padding: "10px 12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px" }}><ICON name="robot" size="20" className="robot-suggestion"/> </span>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#34d399" }}>Agent Suggestion</span>
                  </div>
                  <div style={{ fontSize: "10.5px", color: "rgba(226,232,240,0.55)", lineHeight: 1.5 }}>Route 4 tickets to <strong style={{ color: "#6ee7b7" }}>Frontend</strong> (43% capacity available)</div>
                </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                </div> 
                  {/* STATS BAR */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25 }}
                  style={{marginTop: "18px",borderTop: "1px solid rgba(255,255,255,0.05)",borderBottom: "1px solid rgba(255,255,255,0.05)",background: "rgba(255,255,255,0.015)",padding: "18px 0",}}>
                  <div style={{display: "grid",gridTemplateColumns: "repeat(4,1fr)",gap: "10px",}}>
                {operationalCapacity.map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 + i * 0.08 }}
                  style={{textAlign: "center",padding: "0 10px",borderLeft:i !== 0 ? "1px solid rgba(255,255,255,0.06)": "none",}}>
                 <div style={{fontSize: "26px",fontWeight: "700",letterSpacing: "-0.04em",background:"linear-gradient(135deg,#f1f5f9,rgba(241,245,249,0.55))",WebkitBackgroundClip: "text",WebkitTextFillColor: "transparent",}}>{item.value}</div>
                  <div style={{fontSize: "11px",color: "rgba(226,232,240,0.4)",marginTop: "5px",lineHeight: 1.5,}}>{item.label}</div>
                </motion.div>))}
                </div>
                </motion.div>
                <div style={{maxWidth: "1280px", margin: "0 auto",padding: "0 40px",position: "relative",zIndex: 1,}}>
                {/* LOGOS */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }} style={{marginTop: "20px",textAlign: "center",}}>
                  <div style={{fontSize: "10px",letterSpacing: "0.12em",textTransform: "uppercase",color: "rgba(226,232,240,0.28)",marginBottom: "14px",fontWeight: "600",}}>Built for modern operational workflows
                  </div>
                  <div style={{display: "flex",justifyContent: "center",flexWrap: "wrap",gap: "22px",}}>
                  {logos.map((logo, i) => (
                  <motion.span key={logo} whileHover={{ y: -2,color: "#e2e8f0",}}style={{fontSize: "13px",fontWeight: "600",color: "rgba(226,232,240,0.25)",cursor: "pointer",transition: "0.2s",letterSpacing: "-0.01em",}}>{logo}</motion.span>))}
                  </div>
                </motion.div>

                {/* FEATURES */}
                <div style={{marginTop: "80px",}}>
                  {/* Section Header */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45 }} style={{marginBottom: "38px",}}>
                  <div style={{display: "inline-flex",alignItems: "center",gap: "6px",background: "rgba(99,102,241,0.08)",border: "1px solid rgba(99,102,241,0.18)",borderRadius: "20px",padding: "4px 12px 4px 8px",marginBottom: "20px",}}>
                  <div style={{width: "5px",height: "5px",borderRadius: "50%",background: "#6366f1",}}/>
                  <span style={{fontSize: "11.5px",color: "#a5b4fc",fontWeight: "500",}}>Platform Capabilities</span>
                  </div>
                  <div style={{fontSize: "40px",fontWeight: "700",letterSpacing: "-0.04em",lineHeight: 1.08,color: "#f8fafc",maxWidth: "720px",marginBottom: "18px",}}>Everything your operations team needs<br />in one intelligent platform
                  </div>

                  <div style={{fontSize: "16px",lineHeight: 1.8,color: "rgba(226,232,240,0.52)",maxWidth: "620px",}}>
                  From escalation prevention to workload intelligence,
                  Operix gives modern support teams real-time operational
                  visibility and IEE™ assisted coordination at scale.
                  </div>
                  </motion.div>

                  {/* Cards Grid */}
                  <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45 }}>
                  <div style={{display: "grid",gridTemplateColumns: "repeat(3,minmax(0,1fr))",gap: "16px",}}>
                  {features.map((item, i) => (
                    <motion.div key={item.title} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{type:"spring",stiffness:280,damping:20}}
                      whileHover={{y: -4,borderColor: item.border,background: "rgba(255,255,255,0.038)",}}
                      style={{position: "relative",overflow: "hidden",padding: "24px",borderRadius: "18px",background: "rgba(255,255,255,0.025)",border: "1px solid rgba(255,255,255,0.065)",}}>
                    {/* Glow */}
                    <div style={{position: "absolute",inset: 0,background: `radial-gradient(circle at top, ${item.bg} 0%, transparent 72%)`,opacity: 0.9,pointerEvents: "none",}}/>
                    {/* Icon */}
                    <div style={{position: "relative",width: "46px",height: "46px",borderRadius: "14px",display: "flex",alignItems: "center",justifyContent: "center",fontSize: "20px",marginBottom: "18px",background: item.bg,border: `1px solid ${item.border}`,boxShadow: `0 0 24px ${item.bg}`,}}>{item.icon}
                    </div>
                    {/* Title */}
                    <div style={{position: "relative",fontSize: "16px",fontWeight: "650",color: "#f8fafc",marginBottom: "10px",letterSpacing: "-0.02em",}}>{item.title}</div>
                    {/* Body */}
                    <div style={{position: "relative",fontSize: "13.5px",lineHeight: 1.75,color: "rgba(226,232,240,0.48)",}}>{item.body}</div>
                    {/* Badge */}
                    <div style={{position: "relative",marginTop: "18px",display: "inline-flex",alignItems: "center",gap: "6px",padding: "5px 12px",borderRadius: "999px",background: item.bg,border: `1px solid ${item.border}`,color: item.color,fontSize: "11px",fontWeight: "600",letterSpacing: "-0.01em",}}>✦ {item.badge}</div>
                  </motion.div>
                    ))}
                  </div>
                  </motion.div>
                </div>

                {/* HOW IT WORKS */}
<div
  style={{
    marginTop: "80px",
  }}
>
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(99,102,241,0.08)",
      border: "1px solid rgba(99,102,241,0.18)",
      borderRadius: "20px",
      padding: "4px 12px 4px 8px",
      marginBottom: "20px",
    }}
  >
    <div
      style={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: "#6366f1",
      }}
    />

    <span
      style={{
        fontSize: "11.5px",
        color: "#a5b4fc",
        fontWeight: "500",
      }}
    >
      How It Works
    </span>
  </div>

  <div
    style={{
      fontSize: "36px",
      fontWeight: "700",
      letterSpacing: "-0.03em",
      color: "#f1f5f9",
      marginBottom: "44px",
      lineHeight: 1.15,
    }}
  >
    Operational clarity in four steps
  </div>

  <div
  style={{
    position: "relative",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
    alignItems: "start",
  }}
>
  {/* Connection Line */}
  <div
    style={{
      position: "absolute",
      top: "28px",
      left: "12%",
      right: "12%",
      height: "1px",
      background:
        "linear-gradient(90deg, transparent, rgba(99,102,241,0.28), rgba(52,211,153,0.2), transparent)",
      zIndex: 0,
    }}
  />

  {howSteps.map((step, i) => (
    <motion.div
      key={step.title}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.8 + i * 0.08 }}
      style={{
        position: "relative",
        zIndex: 1,
        textAlign: "center",
        padding: "0 10px",
      }}
    >
      {/* Circle + Glow */}
      <div
        style={{
          position: "relative",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          margin: "0 auto 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          background: step.bg,
          border: `1px solid ${step.border}`,
          backdropFilter: "blur(10px)",
          boxShadow: `0 0 30px ${step.bg}`,
        }}
      >
        {/* Pulse Glow */}
        <div
          style={{
            position: "absolute",
            inset: "-8px",
            borderRadius: "50%",
            background: step.bg,
            filter: "blur(18px)",
            opacity: 0.5,
            zIndex: -1,
          }}
        />

        {step.icon}
      </div>

      {/* Step Number */}
      <div
        style={{
          position: "absolute",
          top: "-8px",
          right: "calc(50% - 34px)",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          background: "#0f172a",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: "700",
          color: "rgba(226,232,240,0.6)",
        }}
      >
        {i + 1}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: "14.5px",
          fontWeight: "650",
          color: "#f1f5f9",
          marginBottom: "8px",
          letterSpacing: "-0.015em",
        }}
      >
        {step.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: "13px",
          color: "rgba(226,232,240,0.43)",
          lineHeight: 1.7,
          maxWidth: "220px",
          margin: "0 auto",
        }}
      >
        {step.body}
      </div>
      </motion.div>
    ))}
  </div>
</div>

{/* TESTIMONIALS */}
{/* <div
  style={{
    marginTop: "90px",
  }}
>
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: "rgba(52,211,153,0.08)",
      border: "1px solid rgba(52,211,153,0.18)",
      borderRadius: "20px",
      padding: "4px 12px 4px 8px",
      marginBottom: "20px",
    }}
  >
    <div
      style={{
        width: "5px",
        height: "5px",
        borderRadius: "50%",
        background: "#34d399",
      }}
    />

    <span
      style={{
        fontSize: "11.5px",
        color: "#6ee7b7",
        fontWeight: "500",
      }}
    >
      Customer Stories
    </span>
  </div>

  <div
    style={{
      fontSize: "36px",
      fontWeight: "700",
      letterSpacing: "-0.03em",
      color: "#f1f5f9",
      marginBottom: "36px",
      lineHeight: 1.15,
    }}
  >
    Teams that run calmer operations
  </div>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: "14px",
    }}
  >
    {testimonials.map((item, i) => (
      <motion.div
        key={item.name}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 + i * 0.08 }}
        whileHover={{
          y: -3,
          borderColor: "rgba(99,102,241,0.22)",
        }}
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.065)",
          borderRadius: "14px",
          padding: "24px",
        }}
      >
        <div
          style={{
            color: "#f59e0b",
            fontSize: "13px",
            marginBottom: "14px",
            letterSpacing: "1px",
          }}
        >
          ★★★★★
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "rgba(226,232,240,0.62)",
            lineHeight: 1.72,
            marginBottom: "18px",
            fontStyle: "italic",
          }}
        >
          "{item.quote}"
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "14px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: item.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "700",
              color: "#fff",
            }}
          >
            {item.initials}
          </div>

          <div>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "650",
                color: "#f1f5f9",
              }}
            >
              {item.name}
            </div>

            <div
              style={{
                fontSize: "11.5px",
                color: "rgba(226,232,240,0.35)",
              }}
            >
              {item.role}
            </div>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div> */}

{/* CTA SECTION */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.3 }}
  style={{
    marginTop: "90px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "20px",
    padding: "60px 48px",
    textAlign: "center",
    background:
      "linear-gradient(135deg,rgba(99,102,241,0.13) 0%,rgba(52,211,153,0.06) 100%)",
    border: "1px solid rgba(99,102,241,0.2)",
  }}
>
  <div
    style={{
      position: "absolute",
      top: "-100px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "600px",
      height: "300px",
      background:
        "radial-gradient(ellipse,rgba(99,102,241,0.15) 0%,transparent 70%)",
      pointerEvents: "none",
    }}
  />

  <div
    style={{
      position: "relative",
      fontSize: "38px",
      fontWeight: "700",
      letterSpacing: "-0.035em",
      color: "#f1f5f9",
      marginBottom: "16px",
    }}
  >
    Ready to reduce operational chaos?
  </div>

  <div
    style={{
      position: "relative",
      fontSize: "16px",
      color: "rgba(226,232,240,0.52)",
      maxWidth: "540px",
      margin: "0 auto 34px",
      lineHeight: 1.7,
    }}
  >
    Connect your operations with Operix to stay ahead of escalations,
    balance workloads, and ship reliably.
  </div>

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      position: "relative",
    }}
  >
    <motion.button
      whileHover={{ y: -2 }}
      style={{
        background:
          "linear-gradient(135deg,#6366f1,#4f46e5)",
        color: "#fff",
        border: "none",
        borderRadius: "11px",
        padding: "14px 30px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        boxShadow: "0 0 32px rgba(99,102,241,0.4)",
      }}
    >
      ▶ Start Free Demo
    </motion.button>

    <motion.button
      whileHover={{
        background: "rgba(255,255,255,0.1)",
      }}
      style={{
        background: "rgba(255,255,255,0.06)",
        color: "#e2e8f0",
        border:
          "1px solid rgba(255,255,255,0.13)",
        borderRadius: "11px",
        padding: "14px 30px",
        fontSize: "15px",
        fontWeight: "500",
        cursor: "pointer",
      }}
    >
      Talk to Sales →
    </motion.button>
  </div>

  <div
    style={{
      marginTop: "18px",
      fontSize: "12px",
      color: "rgba(226,232,240,0.28)",
      position: "relative",
    }}
  >
    No credit card required · 14-day free trial
  </div>
</motion.div>
</div>
{/* FOOTER */}
<motion.footer
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 2.5 }}
  style={{
    position: "relative",
    marginTop: "90px",
    borderTop: "1px solid rgba(255,255,255,0.055)",
    padding: "36px 40px",
    overflow: "hidden",
  }}
>
  {/* Background Glow */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background:
        "radial-gradient(circle at top, rgba(99,102,241,0.06), transparent 65%)",
      pointerEvents: "none",
    }}
  />

  <div
    style={{
      position: "relative",
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "18px",
    }}
  >
    {/* Logo */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "28px",
          height: "28px",
          borderRadius: "8px",
          background:
            "linear-gradient(135deg,#6366f1,#34d399)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          boxShadow:
            "0 0 18px rgba(99,102,241,0.35)",
        }}
      >
        ⚡
      </div>

      <span
        style={{
          fontSize: "14px",
          fontWeight: "700",
          letterSpacing: "-0.02em",
          color: "#f1f5f9",
        }}
      >
        Operix
      </span>
    </motion.div>

    {/* Links */}
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        flexWrap: "wrap",
      }}
    >
      {footerLinks.map((link) => (
        <motion.a
          key={link}
          whileHover={{
            color: "rgba(226,232,240,0.7)",
          }}
          href="/"
          style={{
            fontSize: "12.5px",
            color: "rgba(226,232,240,0.33)",
            textDecoration: "none",
            transition: "0.2s",
          }}
        >
          {link}
        </motion.a>
      ))}
    </div>

    {/* Copyright */}
    <div
      style={{
        fontSize: "12px",
        color: "rgba(226,232,240,0.22)",
        letterSpacing: "-0.01em",
      }}
    >
      © 2026 Operix Inc. All rights reserved.
    </div>
  </div>
</motion.footer>
        {/* AuthModal for Authentication */}
        <AuthModal open={open} onClose={()=>{setOpen(false)}} defaultTab={tab}/>
          </div>
  );
}
