// hooks/useDashboard.js
import { useEffect } from 'react';
import { useAppStore, ACTIONS } from '../store/appStore';
import { dashboardService } from '../services/api';

// ── Mock data (remove once Spring endpoints are live) ──────
// const MOCK = {
//   stats: [
//     { id: 'open',     label: 'Open Issues',    value: 48,  delta: '+12%', trend: 'up',   color: '#6366f1', data: [30,28,35,32,40,38,44,42,46,48] },
//     { id: 'critical', label: 'Critical',       value: 7,   delta: '+40%', trend: 'up',   color: '#ef4444', data: [2,3,4,3,5,4,6,5,6,7] },
//     { id: 'sla',      label: 'SLA At Risk',    value: 15,  delta: '+8%',  trend: 'up',   color: '#f97316', data: [8,9,10,11,10,12,13,12,14,15] },
//     { id: 'resolved', label: 'Resolved Today', value: 32,  delta: '+18%', trend: 'up',   color: '#22c55e', data: [18,20,22,24,22,26,28,27,30,32] },
//   ],
//   priorityIncident: {
//     id: 'INC-2024-001',
//     title: 'Database Performance Degradation',
//     severity: 'critical',
//     impact: 'High impact on customer experience',
//     age: '23 min ago',
//     description: 'Our AI has detected this issue is similar to 12 previous incidents. Recommended action available with 89% success rate.',
//     aiConfidence: 89,
//   },
//   escalations: [
//     { id: 'DB-MASTER-01', title: 'Database Performance Degradation', category: 'Performance', severity: 'critical', age: '23m ago', assignees: ['AD','RS'], extraAssignees: 2 },
//     { id: 'PAY-SERVICE-02', title: 'Payment Gateway Timeout',        category: 'Integration',  severity: 'high',     age: '45m ago', assignees: ['KP','MN'], extraAssignees: 1 },
//     { id: 'API-GATEWAY-01', title: 'Memory Leak in API Service',     category: 'Performance', severity: 'medium',   age: '1h ago',  assignees: ['DS','PT'], extraAssignees: 3 },
//     { id: 'WEB-PROXY-01',   title: 'SSL Certificate Expiring Soon',  category: 'Security',    severity: 'low',      age: '3h ago',  assignees: ['AM'],      extraAssignees: 1 },
//     { id: 'FILE-SERVER-02', title: 'Disk Space Running Low',         category: 'Infrastructure', severity: 'low',   age: '5h ago',  assignees: ['VJ','SR'], extraAssignees: 2 },
//   ],
//   queues: [
//     { id: 'critical-esc',    label: 'Critical Escalations', count: 7,  color: '#ef4444', pct: 85 },
//     { id: 'high-priority',   label: 'High Priority',        count: 18, color: '#f97316', pct: 65 },
//     { id: 'iee-suggestions', label: 'IEE™ Suggestions',     count: 5,  color: '#8b5cf6', pct: 30 },
//     { id: 'pending-approvals',label:'Pending Approvals',    count: 9,  color: '#6366f1', pct: 45 },
//     { id: 'routine',         label: 'Routine Tasks',        count: 24, color: '#22c55e', pct: 55 },
//   ],
//   activity: [
//     { id: 1, text: 'IEE™ detected pattern match for Database Performance Degradation', tag: 'iee',        time: '23m ago' },
//     { id: 2, text: 'Auto-assigned escalation DB-MASTER-01 to Database Team',           tag: 'system',     time: '24m ago' },
//     { id: 3, text: 'Similar incident resolved successfully (INC-2024-1456)',           tag: 'iee',        time: '1h ago'  },
//     { id: 4, text: 'Workaround executed for Payment Gateway Timeout',                  tag: 'automation', time: '2h ago'  },
//     { id: 5, text: 'Change CHG-2024-892 approved by Rahul Sharma',                    tag: 'system',     time: '3h ago'  },
//   ],
//   dailySummary: {
//     total: 32,
//     breakdown: [
//       { label: 'Critical', count: 5,  pct: 16, color: '#ef4444' },
//       { label: 'High',     count: 8,  pct: 25, color: '#f97316' },
//       { label: 'Medium',   count: 12, pct: 37, color: '#eab308' },
//       { label: 'Low',      count: 7,  pct: 22, color: '#22c55e' },
//     ],
//     message: "Great job! You've resolved 18% more issues than yesterday.",
//   },
// };


export function useDashboard() {
  const { state, dispatch } = useAppStore();

  useEffect(() => {
    // cancelled flag - prevents state update if component
    // unmounts before the API call finishes
    // without this React throws:
    // Can't perform state update on unmounted component
    let cancelled = false;
    async function fetchDashboard() {
      // tell store it is loading
      // Dashboard shows spinner while this is true
      dispatch({ type: ACTIONS.DASHBOARD_LOADING });
      try {
        // single call to spring boot
        // return stats, priorityIncident, queus, escalations
        const data = await dashboardService.getSummary();
        // only update state if component is still mounted
        if (!cancelled) {
          dispatch({ type: ACTIONS.DASHBOARD_SUCCESS, 
            payload: {
              stats:data.stats || [],
              priorityIncident:data.priorityIncident || null,
              queues:data.queues || [],
              escalations:data.escalations || []
            } });
        }
      } catch(err) {
        // Fall back to mock data while backend is being built
        if (!cancelled) {
          dispatch({
            type: ACTIONS.DASHBOARD_ERROR,
            payload: typeof err === 'string' ? err : 'Failed to load dashboard data'
          });
        }
      }
    }
    fetchDashboard();
    //cleanup function - runs when component umnounts
    // sets cancelled = true so in-flight requests
    // don't update state after unmount
    return () => { cancelled = true; };

    //empty array - runs once on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // dispatch never changes — it's stable across renders. But adding it to the array causes an ESLint warning that tempts you to add more dependencies which causes re-fetching loops. Empty array with the eslint comment is intentional and correct here — it means fetch once on mount, never again unless the component unmounts and remounts.
  }, []);
    // return the dashboard slice from store
    // components destructure what they need

  return state.dashboard;
}
