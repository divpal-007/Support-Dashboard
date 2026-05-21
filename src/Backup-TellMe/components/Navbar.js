// ============================================
// Navbar.js — Top navigation bar component
//
// CONCEPT: Components are like Java classes
// but they return UI instead of objects.
// This component has NO state — it's purely
// visual. We call these "presentational" components
// ============================================

import { useEffect, useRef} from 'react';
import { Search, Bell, HelpCircle, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext.js';
import styles from '../ComponentsStyle/Navbar.css';

// function useClock() {
//   const [time, setTime] = useState(() =>
//     new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
//   );
//   useEffect(() => {
//     const id = setInterval(() => {
//       setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
//     }, 30_000);
//     return () => clearInterval(id);
//   }, []);
//   return time;
// }
 
// const DATE_STR = new Date().toLocaleDateString('en-US', {
//   weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
// });
 
export default function Navbar({ onCreateClick }) {
  const { notifications, searchQuery, setSearchQuery } = useApp();
  // const time = useClock();
  const inputRef = useRef(null);
 
  // ⌘K shortcut
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
 
  return (
    <header className="navbar">
      {/* Search */}
      <div className="search">
        <span className="searchIcon">
          <Search size={13} />
        </span>
        <input
          ref={inputRef}
          className="searchInput"
          type="text"
          placeholder="Search tickets, users, teams…"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          aria-label="Search"
        />
        <span className="searchKbd">
          <kbd>⌘</kbd><kbd>K</kbd>
        </span>
      </div>
 
      {/* Date
      <div className={styles.dateInfo}>
        <span className={styles.onlineDot} />
        <span>{time}</span>
        <span style={{ color: 'var(--color-border-hover)' }}>·</span>
        <span>{DATE_STR}</span>
      </div> */}
 
      {/* Actions */}
      <div className="actions">
        <button className="iconBtn" aria-label="Help" title="Help">
          <HelpCircle size={16} />
        </button>
 
        <button className="iconBtn" aria-label="Notifications" title="Notifications">
          <Bell size={16} />
          {notifications > 0 && (
            <span className="badgeCount">
              {notifications > 99 ? '99+' : notifications}
            </span>
          )}
        </button>
 
        <div className="divider" />
 
        <button className="createBtn" onClick={onCreateClick}>
          <Plus size={14} strokeWidth={2.5} />
          Create
        </button>
      </div>
    </header>
  );
}