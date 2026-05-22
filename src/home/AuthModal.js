import { useState, useEffect } from "react";
import { motion, AnimatePresence} from "framer-motion";
import ICON from "./icon-pack";

// ─── Design tokens () ────────────────────────────────
const INDIGO   = "#6366f1";
const EMERALD  = "#34d399";
const TEXT_HI  = "#f1f5f9";
const TEXT_MID = "rgba(226,232,240,0.62)";
const TEXT_LOW = "rgba(226,232,240,0.38)";
const BORDER   = "rgba(255,255,255,0.08)";

// ─── Tiny helpers ─────────────────────────────────────────────────────────────

function OAuthBtn({ icon, label }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        padding: "10px 12px",
        background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.15)" : BORDER}`,
        borderRadius: "10px", color: TEXT_MID, fontSize: "13px", fontWeight: "500",
        cursor: "pointer", fontFamily: "inherit", transition: "all 0.18s",
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ fontSize: "16px" }}>{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function InputField({ label, type = "text", placeholder, icon, rightEl, value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: error ? "6px" : "14px" }}>
      {label && (
        <label style={{ display: "block", fontSize: "13px", fontWeight: "500", color: "rgba(226,232,240,0.6)", marginBottom: "7px" }}>
          {label}
        </label>
      )}
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", fontSize: "14px", opacity: 0.45, pointerEvents: "none" }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: icon ? "11px 40px 11px 38px" : "11px 40px 11px 14px",
            background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
            border: error
              ? "1px solid rgba(248,113,113,0.55)"
              : focused
              ? "1px solid rgba(99,102,241,0.55)"
              : `1px solid ${BORDER}`,
            borderRadius: "10px", fontSize: "14px", color: TEXT_HI, outline: "none",
            fontFamily: "'DM Sans','Inter',system-ui,sans-serif",
            transition: "border-color 0.2s, background 0.2s",
            boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.1)" : "none",
          }}
        />
        {rightEl && (
          <div style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)" }}>
            {rightEl}
          </div>
        )}
      </div>
      {error && <div style={{ fontSize: "11px", color: "#f87171", marginTop: "4px" }}>{error}</div>}
    </div>
  );
}

function PrimaryBtn({ children, onClick, loading, fullWidth = true }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: fullWidth ? "100%" : "auto",
        padding: "13px 20px",
        background: "linear-gradient(135deg,#6366f1 0%,#4f46e5 100%)",
        color: "#fff", border: "none", borderRadius: "10px",
        fontSize: "14.5px", fontWeight: "600", cursor: "pointer",
        fontFamily: "inherit", letterSpacing: "-0.01em",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        boxShadow: hov
          ? "0 0 36px rgba(99,102,241,0.5), 0 4px 14px rgba(0,0,0,0.35)"
          : "0 0 22px rgba(99,102,241,0.3), 0 2px 8px rgba(0,0,0,0.3)",
        transform: hov ? "translateY(-1px)" : "translateY(0)",
        transition: "transform 0.15s, box-shadow 0.15s",
      }}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}

function Spinner() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" style={{ animation: "authSpin 0.75s linear infinite" }}>
      <circle cx="9" cy="9" r="7" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
      <path d="M9 2 A7 7 0 0 1 16 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OrDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "12px 0" }}>
      <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
      <span style={{ fontSize: "12px", color: TEXT_LOW, fontWeight: "500" }}>or</span>
      <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.07)" }} />
    </div>
  );
}

// ─── Right panel feature cards ────────────────────────────────────────────────

const FEATURES = [
  {
    icon: "🧠",
    iconBg: "linear-gradient(135deg,rgba(99,102,241,0.3),rgba(79,70,229,0.2))",
    iconBorder: "rgba(99,102,241,0.3)",
    badge: "IEE",
    badgeColor: "#a5b4fc",
    badgeBg: "rgba(99,102,241,0.15)",
    title: "Intelligent Escalation Detection",
    body: "IEE™ predicts SLA risks and flags critical issues before they escalate.",
    link: "Learn more",
    linkColor: INDIGO,
  },
  {
    icon: "🧩",
    iconBg: "linear-gradient(135deg,rgba(52,211,153,0.25),rgba(16,185,129,0.15))",
    iconBorder: "rgba(52,211,153,0.25)",
    title: "Connect Your Stack",
    body: "Seamlessly integrate with the tools your teams already use.",
    link: "View all integrations",
    linkColor: EMERALD,
    // pills: ["🔷", "💬", "⚡", "🟢", "🟣"],
  },
  {
    icon: "👥",
    iconBg: "linear-gradient(135deg,rgba(245,158,11,0.25),rgba(234,88,12,0.15))",
    iconBorder: "rgba(245,158,11,0.25)",
    title: "Real-time Team Coordination",
    body: "Unified visibility, balanced workloads, and smarter handoffs across teams.",
    link: "See how it works",
    linkColor: "#f59e0b",
  },
];

function FeatureCard({ f }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.025)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: "12px", padding: "14px 16px",
        display: "flex", gap: "14px", alignItems: "flex-start",
        transition: "all 0.2s", cursor: "default",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "46px", height: "46px", flexShrink: 0, borderRadius: "11px",
        background: f.iconBg, border: `1px solid ${f.iconBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "20px", position: "relative",
      }}>
        {f.icon}
        {f.badge && (
          <div style={{
            position: "absolute", bottom: "-6px", right: "-6px",
            background: f.badgeBg, color: f.badgeColor,
            fontSize: "8px", fontWeight: "700", padding: "1px 5px",
            borderRadius: "4px", border: `1px solid ${f.iconBorder}`,
          }}>
            {f.badge}
          </div>
        )}
      </div>
      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "13.5px", fontWeight: "650", color: TEXT_HI, marginBottom: "4px", letterSpacing: "-0.01em" }}>{f.title}</div>
        <div style={{ fontSize: "12.5px", color: TEXT_LOW, lineHeight: 1.55, marginBottom: f.link ? "8px" : 0 }}>{f.body}</div>
        {/* Integration pills */}
        {f.pills && (
          <div style={{ display: "flex", gap: "6px", marginBottom: "8px" }}>
            {f.pills.map((p, i) => (
              <div key={i} style={{ width: "26px", height: "26px", borderRadius: "6px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>{p}</div>
            ))}
          </div>
        )}
        {f.link && (
          <div style={{ fontSize: "12px", color: f.linkColor, fontWeight: "600", cursor: "pointer" }}>
            {f.link} →
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sign In form ─────────────────────────────────────────────────────────────

function SignInForm({ onSwitch }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const submit = () => {
    const e = {};
    if (!email.includes("@"))   e.email    = "Enter a valid email.";
    if (password.length < 6)    e.password = "Min. 6 characters.";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "32px 0" }}>
        <div style={{ fontSize: "48px", marginBottom: "14px" }}>✅</div>
        <div style={{ fontSize: "18px", fontWeight: "700", color: TEXT_HI, marginBottom: "8px" }}>Signed in!</div>
        <div style={{ fontSize: "13.5px", color: TEXT_MID, marginBottom: "20px" }}>Redirecting to your dashboard…</div>
        <div style={{ height: "3px", borderRadius: "2px", background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.8, ease: "linear" }}
            style={{ height: "100%", background: "linear-gradient(90deg,#6366f1,#34d399)", borderRadius: "2px" }} />
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "24px", fontWeight: "700", color: TEXT_HI, letterSpacing: "-0.025em", marginBottom: "5px" }}>Access your operational workspace</div>
        <div style={{ fontSize: "13.5px", color: TEXT_LOW }}>Sign in to continue to Operix</div>
      </div>

      {/* OAuth row 1 */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <OAuthBtn icon={<ICON name="googleLogin" size="20" viewBox="0 0 48 48" className="g-login"/>} label="Continue with Google" />
        <OAuthBtn icon={<ICON name="microLogin" size="20" viewBox="0 0 24 24" className="m-login"/>} label="Continue with Microsoft" />
      </div>
      {/* OAuth row 2 */}
      <div style={{ display: "flex", gap: "8px" }}>
        <OAuthBtn icon={<ICON name="gitLogin" size="20" viewBox="0 0 24 24" className="git-login"/>} label="Continue with GitHub" />
        <OAuthBtn icon="🌍" label="Continue with the SSO" />
      </div>

      <OrDivider />

      <InputField
        label="Email address"
        type="email"
        placeholder="you@company.com"
        icon="✉️"
        value={email}
        onChange={e => setEmail(e.target.value)}
        error={errors.email}
      />

      <InputField
        label="Password"
        type={showPass ? "text" : "password"}
        placeholder="Enter your password"
        icon="🔒"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errors.password}
        rightEl={
          <span onClick={() => setShowPass(v => !v)} style={{ fontSize: "14px", cursor: "pointer", opacity: 0.5, userSelect: "none" }}>
            {showPass ? "🙈" : "👁️"}
          </span>
        }
      />

      {/* Remember + Forgot */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", marginTop: "-4px" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
          <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)} style={{ accentColor: INDIGO, width: "14px", height: "14px" }} />
          <span style={{ fontSize: "13px", color: TEXT_MID }}>Remember me</span>
        </label>
        <span style={{ fontSize: "13px", color: INDIGO, cursor: "pointer", fontWeight: "500" }}>Forgot password?</span>
      </div>

      <PrimaryBtn onClick={submit} loading={loading}>
        Continue to Workspace →
      </PrimaryBtn>

      <div style={{ textAlign: "center", marginTop: "16px", fontSize: "13px", color: TEXT_LOW }}>
        Don't have an account?{" "}
        <span onClick={onSwitch} style={{ color: INDIGO, cursor: "pointer", fontWeight: "600" }}>Create workspace</span>
      </div>
    </div>
  );
}

// ─── Create Workspace form ────────────────────────────────────────────────────

function CreateForm({ onSwitch }) {
  const [name,      setName]      = useState("");
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [workspace, setWorkspace] = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);
  const [errors,    setErrors]    = useState({});

  const submit = () => {
    const e = {};
    if (name.trim().length < 2)      e.name      = "Enter your full name.";
    if (!email.includes("@"))        e.email     = "Enter a valid work email.";
    if (password.length < 8)         e.password  = "Min. 8 characters.";
    if (workspace.trim().length < 2) e.workspace = "Enter a workspace name.";
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({}); setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2000);
  };

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "24px 0" }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, delay: 0.1 }} style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</motion.div>
        <div style={{ fontSize: "18px", fontWeight: "700", color: TEXT_HI, marginBottom: "6px" }}>Workspace created!</div>
        <div style={{ fontSize: "13.5px", color: TEXT_MID, marginBottom: "20px" }}>Welcome to Operix, <strong style={{ color: TEXT_HI }}>{name}</strong>. Setting things up…</div>
        {["Account created","Workspace provisioned","Integrations connecting","IEE engine calibrating"].map((label, i) => (
          <motion.div key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.12 }}
            style={{ display: "flex", alignItems: "center", gap: "9px", padding: "8px 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none", textAlign: "left" }}>
            <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: i < 2 ? "rgba(52,211,153,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${i < 2 ? EMERALD : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", flexShrink: 0, color: i < 2 ? EMERALD : TEXT_LOW }}>
              {i < 2 ? "✓" : "·"}
            </div>
            <span style={{ fontSize: "13px", color: i < 2 ? TEXT_HI : TEXT_LOW }}>{label}</span>
            {i < 2 && <span style={{ fontSize: "11px", color: EMERALD, marginLeft: "auto", fontWeight: "600" }}>Done</span>}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "24px", fontWeight: "700", color: TEXT_HI, letterSpacing: "-0.025em", marginBottom: "5px" }}>Create your workspace</div>
        {/* <div style={{ fontSize: "13.5px", color: TEXT_LOW }}>Get started with the Service</div> */}
      </div>

      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <OAuthBtn icon={<ICON name="googleLogin" size="20" viewBox="0 0 48 48" className="g-login"/>} label="Continue with Google" />
        <OAuthBtn icon={<ICON name="gitLogin" size="20" viewBox="0 0 24 24" className="git-login"/>} label="Continue with GitHub" />
      </div>

      <OrDivider />

      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{ flex: 1 }}>
          <InputField label="Full name" placeholder="Alex Johnson" icon="👤" value={name} onChange={e => setName(e.target.value)} error={errors.name} />
        </div>
        <div style={{ flex: 1 }}>
          <InputField label="Workspace" placeholder="Acme Corp" icon="🏢" value={workspace} onChange={e => setWorkspace(e.target.value)} error={errors.workspace} />
        </div>
      </div>

      <InputField label="Work email" type="email" placeholder="you@company.com" icon="✉️" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />

      <InputField
        label="Password"
        type={showPass ? "text" : "password"}
        placeholder="Min. 8 characters"
        icon="🔒"
        value={password}
        onChange={e => setPassword(e.target.value)}
        error={errors.password}
        rightEl={
          <span onClick={() => setShowPass(v => !v)} style={{ fontSize: "14px", cursor: "pointer", opacity: 0.5, userSelect: "none" }}>
            {showPass ? "🙈" : "👁️"}
          </span>
        }
      />

      {/* Password strength */}
      {password.length > 0 && (
        <div style={{ marginTop: "-10px", marginBottom: "14px" }}>
          <div style={{ display: "flex", gap: "4px", marginBottom: "3px" }}>
            {[1,2,3,4].map(i => {
              const score = password.length < 6 ? 1 : password.length < 10 ? 2 : /[^a-zA-Z0-9]/.test(password) && /[A-Z]/.test(password) ? 4 : 3;
              const colors = ["","#f87171","#f59e0b","#60a5fa","#34d399"];
              return <div key={i} style={{ flex: 1, height: "2px", borderRadius: "2px", background: i <= score ? colors[score] : "rgba(255,255,255,0.07)", transition: "background 0.3s" }} />;
            })}
          </div>
        </div>
      )}

      <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "18px", cursor: "pointer" }}>
        <input type="checkbox" style={{ accentColor: INDIGO, marginTop: "2px", flexShrink: 0 }} />
        <span style={{ fontSize: "12px", color: TEXT_LOW, lineHeight: 1.55 }}>
          I agree to Operix's <span style={{ color: INDIGO }}>Terms of Service</span> and <span style={{ color: INDIGO }}>Privacy Policy</span>
        </span>
      </label>

      <PrimaryBtn onClick={submit} loading={loading}>
        Launch my workspace
      </PrimaryBtn>

      <div style={{ textAlign: "center", marginTop: "14px", fontSize: "13px", color: TEXT_LOW }}>
        Already have an account?{" "}
        <span onClick={onSwitch} style={{ color: INDIGO, cursor: "pointer", fontWeight: "600" }}>Sign in</span>
      </div>
    </div>
  );
}

// ─── The Modal itself ─────────────────────────────────────────────────────────

function AuthModal({ open, onClose, defaultTab = "signin" }) {
  const [tab, setTab] = useState(defaultTab);

  // reset tab when reopened
  useEffect(() => { if (open) setTab(defaultTab); }, [open, defaultTab]);

  // close on Escape
  useEffect(() => {
    const handle = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [onClose]);

  useEffect(() => { //preventing unnecessary scrolling of the page
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => { document.body.style.overflow = ""; };
}, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{duration: 0.15}}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(2px)"}}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0  }}
            exit={  { opacity: 0, y: 8  }}
            transition={{ duration: 0.18, }}
            style={{
              position: "fixed", inset: 0, zIndex: 101,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "20px",
              pointerEvents: "none",
            }}
          >
            <div style={{
              width: "100%", maxWidth: "820px",
              background: "rgba(13,16,23,0.99)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "20px",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.04),0 32px 80px rgba(0,0,0,0.75),0 0 60px rgba(99,102,241,0.08)",
              backdropFilter: "blur(8px)",
              overflow: "hidden",
              display: "flex", flexDirection: "column",
              pointerEvents: "all",
              maxHeight: "calc(100vh - 40px)",
              overflowY: "auto",
            }}>

              {/* ── Top bar with tabs + close ── */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 24px 0", borderBottom: "1px solid rgba(255,255,255,0.07)", paddingBottom: "0" }}>
                {/* Tabs */}
                <div style={{ display: "flex", gap: "0" }}>
                  {[
                    { id: "signin",  label: "Sign In"          },
                    { id: "create",  label: "Create Workspace"  },
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      style={{
                        background: "none", border: "none", cursor: "pointer",
                        fontFamily: "inherit", fontSize: "14.5px", fontWeight: tab === t.id ? "650" : "450",
                        color: tab === t.id ? TEXT_HI : TEXT_LOW,
                        padding: "14px 20px",
                        borderBottom: tab === t.id ? `2px solid ${INDIGO}` : "2px solid transparent",
                        transition: "color 0.2s, border-color 0.2s",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Close */}
                <button
                  onClick={onClose}
                  style={{ background: "none", border: "none", cursor: "pointer", color: TEXT_LOW, fontSize: "20px", padding: "8px", lineHeight: 1, transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = TEXT_HI}
                  onMouseLeave={e => e.currentTarget.style.color = TEXT_LOW}
                >
                  ✕
                </button>
              </div>

              {/* ── Two-column body ── */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0" }}>

                {/* LEFT: form */}
                <div style={{ padding: "28px 28px 24px", borderRight: "1px solid rgba(255,255,255,0.07)",minHeight:"580px",minWidth:"450px" }}>
                  <AnimatePresence mode="wait">
                    {tab === "signin" ? (
                      <motion.div key="signin" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.22 }}>
                        <SignInForm onSwitch={() => setTab("create")} />
                      </motion.div>
                    ) : (
                      <motion.div key="create" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.22 }}>
                        <CreateForm onSwitch={() => setTab("signin")} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* RIGHT: features */}
                <div style={{ padding: "28px 24px 24px", background: "rgba(255,255,255,0.015)", minHeight:"580px", minWidth:"350px"}}>
                  <div style={{ marginBottom: "18px" }}>
                    <div style={{ fontSize: "16px", fontWeight: "700", color: TEXT_HI, letterSpacing: "-0.02em", marginBottom: "5px" }}>Why teams choose Operix</div>
                    <div style={{ fontSize: "13px", color: TEXT_LOW, lineHeight: 1.6 }}>An operational intelligence that keeps your team ahead of every escalation.</div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {FEATURES.map(f => <FeatureCard key={f.title} f={f} />)}
                  </div>
                </div>
              </div>

              {/* ── Bottom trust bar ── */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "10px 28px", display: "flex", alignItems: "center", justifyContent: "center", gap: "28px", background: "rgba(255,255,255,0.01)", flexWrap: "wrap" }}>
                {/* {[
                  { icon: "🛡️", label: "Enterprise-grade security" },
                  { icon: "🔒", label: "SOC 2 Compliant"          },
                  { icon: "🌍", label: "GDPR Compliant"            },
                  { icon: "🔑", label: "SSO & SAML Ready"          },
                ].map(b => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: TEXT_LOW }}>
                    <span style={{ fontSize: "14px" }}>{b.icon}</span>
                    {b.label}
                  </div>
                ))} */}
                 <div style={{ fontSize: "12px", color: TEXT_MID, lineHeight: 1.55 }}>🛡️ Your data is encrypted and never shared. We follow industry best practices to keep your operations secure and compliant.</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Named exports for individual use
export { AuthModal };