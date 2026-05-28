import Greeting from '../../components/dashboard/Greeting/Greeting';
import PriorityBanner from '../../components/dashboard/PriorityBanner/PriorityBanner';
import StatsGrid from '../../components/dashboard/StatsGrid/StatsGrid';
import EscalationList from '../../components/dashboard/EscalationList/EscalationList';
import QueuePanel from '../../components/dashboard/QueuePanel/QueuePanel';
import ActivityFeed from '../../components/dashboard/ActivityFeed/ActivityFeed';
import DailySummary from '../../components/dashboard/DailySummary/DailySummary';
import { useDashboard } from '../../hooks/useDashboard';
import { useAppStore } from '../../store/appStore';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const { state, navigate } = useAppStore();
  const { stats, priorityIncident, escalations, queues, activity, dailySummary, loading,error } = useDashboard();
  // const {stats, priorityIncident, queues, escalations, loading, error} = useDashboard();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <span>Loading dashboard…</span>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Greeting name={state.user?.name?.split(' ')[0] || 'Arjun'} />

      {priorityIncident && (
        <PriorityBanner
          incident={priorityIncident}
          onInvestigate={() => navigate('escalations')}
          onViewSimilar={() => navigate('iee')}
        />
      )}

      <StatsGrid stats={stats} />

      {/* Bottom grid: left = escalations + activity, right = queues + summary */}
      <div className={styles.grid}>
        <div className={styles.left}>
          <EscalationList
            escalations={escalations}
            onViewAll={() => navigate('escalations')}
          />
          <div style={{ marginTop: 16 }}>
            <ActivityFeed
              activity={activity}
              onViewAll={() => navigate('escalations')}
            />
          </div>
        </div>

        <div className={styles.right}>
          <QueuePanel queues={queues} onViewAll={() => navigate('tickets')} />
          <div style={{ marginTop: 16 }}>
            <DailySummary data={dailySummary} />
          </div>
        </div>
      </div>
    </div>
  );
}
