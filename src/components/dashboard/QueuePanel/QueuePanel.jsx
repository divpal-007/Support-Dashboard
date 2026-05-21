import Button from '../../common/Button/Button';
import styles from './QueuePanel.module.css';

function QueueItem({ item }) {
  const { label, count, color, pct } = item;
  return (
    <div className={styles.item}>
      <div className={styles.dot} style={{ background: color }} />
      <span className={styles.label}>{label}</span>
      <span className={styles.count} style={{ color }}>{count}</span>
      <div className={styles.barTrack}>
        <div className={styles.barFill} style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function QueuePanel({ queues = [], onViewAll }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Operational Queues</span>
        <Button variant="ghost" size="sm" onClick={onViewAll}>View All</Button>
      </div>
      <div className={styles.list}>
        {queues.map(q => <QueueItem key={q.id} item={q} />)}
      </div>
    </div>
  );
}
