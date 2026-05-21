import { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, []);

  return (
    <div className={styles.wrapper}>
      <Search size={14} className={styles.icon} />
      <input
        ref={ref}
        className={styles.input}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange?.(e.target.value)}
        aria-label="Search"
      />
      <span className={styles.kbd}><kbd>⌘</kbd><kbd>K</kbd></span>
    </div>
  );
}
