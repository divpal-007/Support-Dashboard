import Badge from '../../common/Badge/Badge';
import Button from '../../common/Button/Button';
import styles from './ActivityFeed.module.css';

const TAG_COLORS = {
  iee:        { bg: 'rgba(139,92,246,0.12)', color: '#a78bfa', dot: '#8b5cf6' },
  system:     { bg: 'rgba(99,102,241,0.12)',  color: '#818cf8', dot: '#6366f1' },
  automation: { bg: 'rgba(6,182,212,0.12)',   color: '#22d3ee', dot: '#06b6d4' },
};

function ActivityItem({ item }) {
  const { text, tag, time } = item;
  const palette = TAG_COLORS[tag] || TAG_COLORS.system;

  return (
    <div className={styles.item}>
      <div className={styles.dotCol}>
        <div className={styles.dot} style={{ background: palette.dot }} />
        <div className={styles.line} />
      </div>
      <div className={styles.content}>
        <span className={styles.text}>{text}</span>
        <div className={styles.meta}>
          <Badge variant={tag}>{tag.toUpperCase()}</Badge>
          <span className={styles.time}>{time}</span>
        </div>
      </div>
    </div>
  );
}

export default function ActivityFeed({ activity = [], onViewAll }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Recent Activity</span>
        <Button variant="ghost" size="sm" onClick={onViewAll}>View All Activity</Button>
      </div>
      <div className={styles.list}>
        {activity.map(item => <ActivityItem key={item.id} item={item} />)}
      </div>
    </div>
  );
}
