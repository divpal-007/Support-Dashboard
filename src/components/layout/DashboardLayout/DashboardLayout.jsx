import styles from './DashboardLayout.module.css';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

export default function DashboardLayout({ sidebar, navbar, children }) {
  return (
    <div className={styles.root}>
      {sidebar}
      {navbar}
      {/* <Sidebar/> */}
      {/* <Navbar/> */}
      <main className={styles.main}>{children}</main>
    </div>
  );
}
