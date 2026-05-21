import styles from './StatusDot.module.css';

export default function StatusDot({ status = 'active', pulse = false, label }) {
  return (
    <span className={styles.wrapper}>
      <span className={`${styles.dot} ${styles[status]} ${pulse ? styles.pulse : ''}`} />
      {label && <span className={styles.label}>{label}</span>}
    </span>
  );
}
