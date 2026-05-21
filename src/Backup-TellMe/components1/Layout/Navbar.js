import { Bell, MessageSquare, HelpCircle, ChevronDown } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import styles from './Navbar.module.css';

export default function Navbar({ user, notifications = 0, searchValue = '', onSearchChange }) {
  return (
    <header className={styles.navbar}>
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search tickets, assets, knowledge…"
      />

      <div className={styles.actions}>
        {/* Notifications */}
        <button className={styles.iconBtn} aria-label="Notifications">
          <Bell size={16} />
          {notifications > 0 && (
            <span className={styles.notifBadge}>{notifications > 9 ? '9+' : notifications}</span>
          )}
        </button>

        {/* Messages */}
        <button className={styles.iconBtn} aria-label="Messages">
          <MessageSquare size={16} />
        </button>

        {/* Help */}
        <button className={styles.iconBtn} aria-label="Help">
          <HelpCircle size={16} />
        </button>

        <div className={styles.divider} />

        {/* User */}
        <button className={styles.userProfile}>
          <div className={styles.avatar}>
            {user?.avatarUrl
              ? <img src={user.avatarUrl} alt={user.name} />
              : (user?.name?.slice(0, 2) || 'AD')}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user?.name || 'Arjun Dev'}</div>
            <div className={styles.userRole}>{user?.role || 'SRE Manager'}</div>
          </div>
          <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: 2 }} />
        </button>
      </div>
    </header>
  );
}