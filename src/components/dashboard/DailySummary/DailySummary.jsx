import styles from './DailySummary.module.css';

function DonutChart({ breakdown, total }) {
  const R = 54, CX = 64, CY = 64, STROKE = 12;
  const circumference = 2 * Math.PI * R;
  let offset = 0;

  const segments = breakdown.map(item => {
    const length = (item.pct / 100) * circumference;
    const seg = { ...item, offset, length };
    offset += length;
    return seg;
  });

  return (
    <div className={styles.donutWrapper}>
      <svg width="128" height="128" viewBox="0 0 128 128">
        {/* Track */}
        <circle cx={CX} cy={CY} r={R} fill="none"
          stroke="var(--bg-overlay)" strokeWidth={STROKE} />
        {/* Segments */}
        {segments.map(seg => (
          <circle
            key={seg.label}
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke={seg.color}
            strokeWidth={STROKE}
            strokeDasharray={`${seg.length} ${circumference - seg.length}`}
            strokeDashoffset={-(seg.offset - circumference / 4)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 0.6s cubic-bezier(0.16,1,0.3,1)' }}
          />
        ))}
        {/* Center text */}
        <text x={CX} y={CY - 6} textAnchor="middle" fill="var(--text-primary)"
          fontSize="22" fontWeight="800" fontFamily="Inter,sans-serif">
          {total}
        </text>
        <text x={CX} y={CY + 12} textAnchor="middle" fill="var(--text-muted)"
          fontSize="9" fontFamily="Inter,sans-serif">
          Total Resolved
        </text>
      </svg>
    </div>
  );
}

export default function DailySummary({ data, period = 'Today', onPeriodChange }) {
  if (!data) return null;
  const { total, breakdown = [], message } = data;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>Daily Summary</span>
        <button className={styles.periodBtn} onClick={onPeriodChange}>
          {period} ▾
        </button>
      </div>

      <div className={styles.body}>
        <DonutChart breakdown={breakdown} total={total} />

        <div className={styles.legend}>
          {breakdown.map(item => (
            <div key={item.label} className={styles.legendItem}>
              <div className={styles.legendDot} style={{ background: item.color }} />
              <span className={styles.legendLabel}>{item.label}</span>
              <span className={styles.legendCount}>{item.count}</span>
              <span className={styles.legendPct}>({item.pct}%)</span>
            </div>
          ))}
        </div>
      </div>

      {message && (
        <div className={styles.footer}>
          <span className={styles.footerText}>{message}</span>
          <span style={{ color: 'var(--color-low)', fontSize: 16 }}>↗</span>
        </div>
      )}
    </div>
  );
}
