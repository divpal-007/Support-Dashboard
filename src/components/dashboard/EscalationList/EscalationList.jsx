import Badge from '../../common/Badge/Badge';
import Button from '../../common/Button/Button';
import styles from './EscalationList.module.css';

const SEVERITY_ICON = {
  critical: { bg: '#ef444420', color: '#ef4444', icon: '🔴' },
  high:     { bg: '#f9731620', color: '#f97316', icon: '🟠' },
  medium:   { bg: '#eab30820', color: '#eab308', icon: '🟡' },
  low:      { bg: '#22c55e20', color: '#22c55e', icon: '🟢' },
};

function Avatar({ initials }) {
  return (
    <div className={styles.avatar} title={initials}>
      {initials}
    </div>
  );
}

function EscalationItem({ item }) {
  const { title, id, category, severity, age, assignees = [], extraAssignees = 0 } = item;
  const sev = SEVERITY_ICON[severity] || SEVERITY_ICON.low;

  return (
    <div className={styles.item}>
      {/* Icon */}
      <div className={styles.iconBox} style={{ background: sev.bg }}>
        <span style={{ fontSize: 14 }}>{sev.icon}</span>
      </div>

      {/* Info */}
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.meta}>
          <span className={styles.id}>{id}</span>
          <span className={styles.sep}>•</span>
          <span className={styles.category}>{category}</span>
        </div>
      </div>

      {/* Badge */}
      <Badge variant={severity}>{severity.toUpperCase()}</Badge>

      {/* Age */}
      <span className={styles.age}>{age}</span>

      {/* Assignees */}
      <div className={styles.assignees}>
        {assignees.map(a => <Avatar key={a} initials={a} />)}
        {extraAssignees > 0 && (
          <div className={`${styles.avatar} ${styles.extra}`}>+{extraAssignees}</div>
        )}
      </div>
    </div>
  );
}

export default function EscalationList({ escalations = [], onViewAll }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.headerTitle}>Recent Escalations</span>
        <Button variant="ghost" size="sm" onClick={onViewAll}>View All</Button>
      </div>
      <div className={styles.list}>
        {escalations.map(item => (
          <EscalationItem key={item.id} item={item} />
        ))}
        {escalations.length === 0 && (
          <div className={styles.empty}>No active escalations 🎉</div>
        )}
      </div>
    </div>
  );
}
