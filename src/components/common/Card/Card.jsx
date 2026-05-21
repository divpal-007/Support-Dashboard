import styles from './Card.module.css';

export default function Card({ children, padding = 'padded', className = '', style }) {
  return (
    <div className={`${styles.card} ${styles[padding]} ${className}`} style={style}>
      {children}
    </div>
  );
}

export function CardHeader({ title, action }) {
  return (
    <div className={styles.header}>
      <span className={styles.title}>{title}</span>
      {action}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`${styles.body} ${className}`}>{children}</div>;
}
