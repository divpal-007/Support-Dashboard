import {
  LayoutDashboard, AlertOctagon, Cpu, Ticket,
  Activity, AlertCircle, GitMerge, Package,
  BarChart2, Settings, Zap, Plug, ChevronLeft
} from 'lucide-react';
import StatusDot from '../../common/StatusDot/StatusDot';
import styles from './Sidebar.module.css';

const MAIN_NAV = [
  { id: 'overview',label: 'Overview',Icon: LayoutDashboard },
  { id: 'escalations',label: 'Escalations',Icon: AlertOctagon,badge: 12 }, //badge count will be dynamic
  { id: 'iee',label: 'IEE™ Intelligence',Icon: Cpu },
  { id: 'tickets',label: 'Tickets',Icon: Ticket },
  { id: 'workload',label: 'Workload',Icon: Activity },
  { id: 'problems',label: 'Problems',Icon: AlertCircle },
  { id: 'changes',label: 'Changes',Icon: GitMerge },
  { id: 'assets',label: 'Assets',Icon: Package },
  { id: 'reports',label: 'Reports',Icon: BarChart2 },
];

const SYSTEM_NAV = [
  { id: 'automation',label: 'Automation',Icon: Zap },
  { id: 'integrations',label: 'Integrations',Icon: Plug },
  { id: 'settings',label: 'Settings',Icon: Settings },
];

function NavItem({ item, isActive, onClick }) {
  const { Icon, label, badge } = item;
  return (
    <button
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
      onClick={() => onClick(item.id)}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.navIcon}>
        <Icon size={15} strokeWidth={isActive ? 2.5 : 1.8} />
      </span>
      <span className={styles.navLabel}>{label}</span>
      {badge && <span className={styles.navBadge}>{badge}</span>}
    </button>
  );
}

export default function Sidebar({ activeRoute = 'overview', onNavigate }) {
  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.brand}>
        <div className={styles.logoBox}>
          <Zap size={15} color="#fff" strokeWidth={2.5} />
        </div>
        <span className={styles.brandName}>INOPERIX</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav} aria-label="Main">
        <div className={styles.sectionLabel}>MAIN</div>
        {MAIN_NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeRoute === item.id}
            onClick={onNavigate}
          />
        ))}

        <div className={styles.sectionLabel}>SYSTEM</div>
        {SYSTEM_NAV.map(item => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeRoute === item.id}
            onClick={onNavigate}
          />
        ))}
      </nav>

      {/* IEE™ Status Block */}
      <div className={styles.ieeBlock}>
        <div className={styles.ieeHeader}>
          <div className={styles.ieeIcon}>
            <Cpu size={14} color="#fff" />
          </div>
          <div>
            <div className={styles.ieeTitle}>INOPERIX IEE™</div>
            <div className={styles.ieeSub}>Intelligent Escalation Engine</div>
          </div>
        </div>
        <div className={styles.ieeStats}>
          <StatusDot status="active" pulse label="Active" />
          <span style={{ color: 'var(--border-default)' }}>•</span>
          <StatusDot status="learning" pulse label="Learning" />
        </div>
      </div>

      {/* Collapse // TODO: wire collapse*/}
      <button className={styles.collapseBtn}>
        <ChevronLeft size={14} />
        Collapse
      </button>
    </aside>
  );
}
