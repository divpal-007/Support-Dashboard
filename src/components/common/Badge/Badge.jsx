import styles from './Badge.module.css';

export default function Badge({ variant = 'info', children, className = '' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
