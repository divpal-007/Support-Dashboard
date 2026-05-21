import styles from './Greeting.module.css';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function Greeting({ name = 'Arjun', sub }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>
        {getGreeting()}, {name} 👋
      </h1>
      <p className={styles.sub}>{sub || "Here's what's happening with your operations today."}</p>
    </div>
  );
}
