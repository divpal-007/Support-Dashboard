import Sparkline from '../../common/Sparkline/Sparkline';
import styles from './StatsGrid.module.css';

function StatCard({ stat }) {
  const { label, value, delta, trend, color, data } = stat;
  const isUp = trend === 'up';

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        <span className={`${styles.delta} ${isUp ? styles.up : styles.down}`}>
          {isUp ? '↑' : '↓'} {delta}
        </span>
      </div>
      <div className={styles.value} style={{ color }}>{value}</div>
      <div className={styles.sub}>vs yesterday</div>
      <div className={styles.sparklineWrap}>
        <Sparkline data={data} color={color} width={120} height={40} />
      </div>
    </div>
  );
}

export default function StatsGrid({ stats = [] }) {
  return (
    <div className={styles.grid}>
      {stats.map(stat => <StatCard key={stat.id} stat={stat} />)}
    </div>
  );
}
