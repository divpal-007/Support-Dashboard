import Badge from '../../common/Badge/Badge';
import Button from '../../common/Button/Button';
import styles from './PriorityBanner.module.css';

export default function PriorityBanner({ incident }) {
  const {
    title = 'Database Performance Degradation',
    severity = 'critical',
    impact = 'High impact on customer experience',
    age = '23 min ago',
    description = 'Our AI has detected this issue is similar to 12 previous incidents. Recommended action available with 89% success rate.',
    aiConfidence = 89,
    onInvestigate,
    onViewSimilar,
  } = incident || {};

  return (
    <div className={styles.banner}>
      {/* Glow orbs */}
      <div className={styles.orb1} />
      <div className={styles.orb2} />

      <div className={styles.left}>
        <div className={styles.eyebrow}>
          <span className={styles.crownIcon}>👑</span>
          <span className={styles.eyebrowText}>IEE™ PRIORITY</span>
        </div>

        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          <Badge variant={severity}>{severity.toUpperCase()}</Badge>
        </div>

        <p className={styles.meta}>
          {impact}
          <span className={styles.dot}>•</span>
          {age}
        </p>

        <p className={styles.description}>{description}</p>

        <div className={styles.actions}>
          <Button variant="primary" size="md" onClick={onInvestigate}>
            Investigate Now
          </Button>
          <Button variant="secondary" size="md" onClick={onViewSimilar}>
            View Similar Incidents
          </Button>
        </div>
      </div>

      <div className={styles.right}>
        {/* AI orb visual */}
        <div className={styles.aiOrb}>
          <div className={styles.aiOrbInner} />
          <div className={styles.aiOrbCore} />
        </div>
        <div className={styles.confidence}>
          <span className={styles.confidenceLabel}>AI CONFIDENCE</span>
          <span className={styles.confidenceValue}>↑ {aiConfidence}%</span>
        </div>
      </div>
    </div>
  );
}
