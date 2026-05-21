import {
  Home, LayoutGrid, AlertTriangle, Users,
  Cpu, Zap, Link2, BarChart2, Settings, ChevronRight
} from 'lucide-react';
import { useApp, ROUTES } from '../context/AppContext';
import styles from '../ComponentsStyle/SideBar.css';
 
const NAV_ITEMS = [
  { id: 'home',         label: 'Home',             Icon: Home,       section: null },
  { id: 'operations',   label: 'Operations',       Icon: LayoutGrid, section: null, badgeType: 'primary' },
  { id: 'escalations',  label: 'Escalations',      Icon: AlertTriangle },
  { id: 'coordination', label: 'Coordination',     Icon: Users },
  { id: '__sep__',      label: 'Intelligence',     section: 'label' },
  { id: 'iee',          label: 'IEE™ Intelligence',Icon: Cpu  },
  { id: 'automations',  label: 'Automations',      Icon: Zap  },
  { id: 'integrations', label: 'Integrations',     Icon: Link2 },
  { id: 'reports',      label: 'Reports',          Icon: BarChart2 },
  { id: 'settings',     label: 'Settings',         Icon: Settings },
];
 
function Sparkline() {
  const pts = [28, 22, 30, 18, 26, 20, 32, 24, 28, 30, 22, 28];
  const W = 180, H = 32, PAD = 2;
  const max = Math.max(...pts), min = Math.min(...pts);
  const xs = pts.map((_, i) => PAD + (i / (pts.length - 1)) * (W - PAD * 2));
  const ys = pts.map(v => H - PAD - ((v - min) / (max - min || 1)) * (H - PAD * 2));
  const line = xs.map((x, i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(' ');
  const fill = `${line} L${xs.at(-1).toFixed(1)},${H} L${xs[0].toFixed(1)},${H} Z`;
 
  return (
    <svg className={styles.sparkline} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-success)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-success)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#sparkGrad)" />
      <path d={line} fill="none" stroke="var(--color-success)" strokeWidth="1.5"
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
 
export default function Sidebar() {
  const { activeRoute, setActiveRoute } = useApp();
 
  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.logo}>
          <Zap size={16} color="#fff" strokeWidth={2.5} />
        </div>
        <span className={styles.brandName}>Operix</span>
        <span className={styles.ieeTag}>IEE™</span>
      </div>
 
      {/* Workspace */}
      <div className={styles.workspace}>
        <div className={styles.wsIcon}>A</div>
        <div className={styles.wsInfo}>
          <div className={styles.wsName}>Acme Operations</div>
          <div className={styles.wsType}>Enterprise Workspace</div>
        </div>
        <ChevronRight size={14} className={styles.wsChevron} />
      </div>
 
      {/* Nav */}
      <nav className={styles.nav} aria-label="Main navigation">
        {NAV_ITEMS.map(item => {
          if (item.section === 'label') {
            return (
              <div key={item.id} className={styles.navSectionLabel}>
                {item.label}
              </div>
            );
          }
 
          const isActive = activeRoute === item.id;
          const badge = ROUTES[item.id]?.badge;
          const { Icon } = item;
 
          return (
            <button
              key={item.id}
              className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              onClick={() => setActiveRoute(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className={styles.navIcon}>
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
              </span>
              <span className={styles.navLabel}>{item.label}</span>
              {badge != null && (
                <span className={`${styles.navBadge} ${item.badgeType === 'primary' ? styles.navBadgePrimary : ''}`}>
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
 
      {/* IEE Status */}
      <div className={styles.ieeStatus}>
        <div className={styles.ieeStatusHeader}>
          <span className={styles.ieeStatusTitle}>IEE™ Status</span>
          <span className={styles.statusDot} />
        </div>
        <div className={styles.ieeStatusActive}>Active</div>
        <div className={styles.ieeStatusSub}>All systems operational</div>
        <Sparkline />
      </div>
 
      {/* User */}
      <div className={styles.user}>
        <div className={styles.avatar}>AM</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>Alex Morgan</div>
          <div className={styles.userRole}>Operations Manager</div>
        </div>
        <ChevronRight size={14} className={styles.userChevron} />
      </div>
    </aside>
  );
}