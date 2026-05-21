import styles from '../ComponentsStyle/AppModules.css';

const STATS = [
  { label: 'Open Issues',    value: '48',   delta: '+12%', dir: 'up',   sub: 'vs yesterday' },
  { label: 'SLA Health',     value: '94.2%',delta: '+1.6%',dir: 'up',   sub: 'vs yesterday' },
  { label: 'Escalations',    value: '3',    delta: 'Critical', dir: 'danger', sub: '' },
  { label: 'Team Capacity',  value: '71%',  delta: '-3%',  dir: 'down', sub: 'vs yesterday' },
];

const QUEUES = [
  { name: 'Backend Ops',    open: 24, total: 32, risk: 'High',   oldest: '2h 41m', color: 'var(--color-danger)'  },
  { name: 'Platform Team',  open: 16, total: 32, risk: 'Medium', oldest: '1h 32m', color: 'var(--color-warning)' },
  { name: 'Frontend Team',  open: 12, total: 32, risk: 'Low',    oldest: '45m',    color: 'var(--color-success)' },
  { name: 'DevOps Team',    open: 8,  total: 32, risk: 'Low',    oldest: '32m',    color: 'var(--color-success)' },
];

const ACTIVITY = [
  { time: '10:42 AM', title: 'TK-2841 escalated to Tier 2',       sub: 'Backend Team · Priority: High', type: 'danger',  ago: '2m ago'  },
  { time: '10:37 AM', title: 'IEE™ reassigned 4 tickets',          sub: 'From Backend Ops to Platform Team', type: 'info', ago: '7m ago'  },
  { time: '10:31 AM', title: 'SLA risk detected in API Queue',     sub: '5 tickets at risk',             type: 'warning', ago: '13m ago' },
  { time: '10:28 AM', title: 'Incident resolved',                  sub: 'TK-2830 · Database connection issue', type: 'success', ago: '16m ago' },
];

const TEAM_PULSE = [
  { name: 'Backend Ops',   sub: 'High ticket volume', status: 'Overloaded', color: 'var(--color-danger)'  },
  { name: 'Platform Team', sub: 'Nearing capacity',   status: 'Busy',       color: 'var(--color-warning)' },
  { name: 'Frontend Team', sub: 'Normal load',        status: 'Healthy',    color: 'var(--color-success)' },
  { name: 'DevOps Team',   sub: 'Normal load',        status: 'Healthy',    color: 'var(--color-success)' },
];

const DAILY_SUMMARY = [
  { label: 'Tickets resolved',  value: '284',  delta: '+18%', dir: 'up'   },
  { label: 'Avg response time', value: '1.2m', delta: '-8%',  dir: 'up'   },
  { label: 'Escalations reduced', value: '18%',delta: '-18%', dir: 'down' },
  { label: 'SLA compliance',    value: '94.2%',delta: '+1.6%',dir: 'up'   },
];

function riskColor(risk) {
  return risk === 'High' ? 'var(--color-danger)'
       : risk === 'Medium' ? 'var(--color-warning)'
       : 'var(--color-success)';
}

function activityDot(type) {
  const map = { danger: 'var(--color-danger)', warning: 'var(--color-warning)', success: 'var(--color-success)', info: 'var(--color-info)' };
  return map[type] || 'var(--color-primary)';
}

export default function HomePage() {
  return (
    <div style={{ display: 'flex', gap: 24 }}>
      {/* Left column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* IEE Priority Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #0f1428 0%, #131830 60%, #1a1040 100%)',
          border: '1px solid rgba(79,110,247,0.2)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          marginBottom: 20,
          display: 'flex',
          gap: 24,
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Glow orb */}
          <div style={{
            position: 'absolute', top: -40, left: -40,
            width: 160, height: 160,
            background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Brain icon */}
          <div style={{
            width: 80, height: 80, flexShrink: 0,
            background: 'radial-gradient(circle at 40% 40%, rgba(124,58,237,0.35), rgba(79,110,247,0.15))',
            border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 32px rgba(124,58,237,0.2)',
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(180,160,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.04-4.79 2.5 2.5 0 0 1 0-3.5 2.5 2.5 0 0 1 1.04-4.79A2.5 2.5 0 0 1 9.5 2Z"/>
              <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.04-4.79 2.5 2.5 0 0 0 0-3.5 2.5 2.5 0 0 0-1.04-4.79A2.5 2.5 0 0 0 14.5 2Z"/>
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                ✦ IEE™ Priority
              </span>
              <span style={{ fontSize: 11, background: 'rgba(34,197,94,0.15)', color: 'var(--color-success)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 99, padding: '1px 8px', fontWeight: 600 }}>
                Active
              </span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.3 }}>
              IEE™ detected rising escalation risk in{' '}
              <span style={{ color: 'var(--color-primary)' }}>Backend Operations.</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 16 }}>
              6 tickets are likely to breach SLA within 22 minutes.
            </div>

            <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--color-primary)', fontWeight: 600, marginBottom: 4 }}>Recommended Action</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Reassign 3 tickets to Platform Team and review API Queue.</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--color-primary)', fontWeight: 600, marginBottom: 4 }}>Potential Impact</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>↓ SLA risk will reduce by 76%</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Avatars */}
              <div style={{ display: 'flex' }}>
                {['AM','PT','SK'].map((ini, i) => (
                  <div key={ini} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: `linear-gradient(135deg, hsl(${220 + i*30},70%,55%), hsl(${250 + i*30},65%,45%))`,
                    border: '2px solid var(--color-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700, color: '#fff',
                    marginLeft: i === 0 ? 0 : -8, zIndex: 3 - i,
                  }}>{ini}</div>
                ))}
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--color-surface-3)', border: '2px solid var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--text-muted)', marginLeft: -8 }}>+2</div>
              </div>
              <button style={{
                height: 34, padding: '0 18px', background: 'var(--color-primary)',
                color: '#fff', borderRadius: 'var(--radius-md)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer', border: 'none',
                fontFamily: 'var(--font-body)',
              }}>Review Recommendation</button>
              <button style={{ fontSize: 13, color: 'var(--text-accent)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                View Details →
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid} style={{ marginBottom: 20 }}>
          {STATS.map((s, i) => (
            <div key={s.label} className={styles.statCard} style={{ animationDelay: `${i * 0.05}s` }}>
              <div className={styles.statLabel}>{s.label}</div>
              <div className={styles.statValue} style={s.dir === 'danger' ? { color: 'var(--color-danger)' } : {}}>
                {s.value}
              </div>
              <div className={
                s.dir === 'up' ? styles.statDeltaUp
                : s.dir === 'down' ? styles.statDeltaDown
                : styles.statDeltaDown
              }>
                {s.dir === 'danger' ? '● ' : s.dir === 'up' ? '↑ ' : '↓ '}
                {s.delta} {s.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Operational Queues */}
        <div style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15 }}>Operational Queues</div>
            <button style={{ fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Queue','Open','SLA Risk','Oldest Ticket',''].map(h => (
                  <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--color-border)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {QUEUES.map((q, i) => (
                <tr key={q.name} style={{ borderBottom: i < QUEUES.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: q.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{q.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 4, background: 'var(--color-surface-3)', borderRadius: 99, maxWidth: 80 }}>
                        <div style={{ width: `${(q.open / q.total) * 100}%`, height: '100%', background: q.color, borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{q.open}/{q.total}</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: riskColor(q.risk) }}>{q.risk}</span>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{q.oldest}</span>
                  </td>
                  <td style={{ padding: '12px 20px' }}>
                    <button style={{ fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>→</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Right Panel */}
      <div style={{ width: 280, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Daily Summary */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14 }}>Daily Summary</div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Yesterday</span>
          </div>
          {DAILY_SUMMARY.map(s => (
            <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: '1px solid var(--color-border)' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: s.dir === 'up' ? 'var(--color-success)' : 'var(--color-danger)' }}>
                {s.dir === 'up' ? '↑' : '↓'} {s.delta}
              </span>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14 }}>Recent Activity</div>
            <button style={{ fontSize: 11, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
          </div>
          {ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderBottom: i < ACTIVITY.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: activityDot(a.type), flexShrink: 0, marginTop: 5 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', marginBottom: 2 }}>{a.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.sub}</div>
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', flexShrink: 0 }}>{a.ago}</span>
            </div>
          ))}
        </div>

        {/* Team Pulse */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--color-border)' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14 }}>Team Pulse</div>
            <button style={{ fontSize: 11, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer' }}>View all</button>
          </div>
          {TEAM_PULSE.map((t, i) => (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px', borderBottom: i < TEAM_PULSE.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--color-surface-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{t.sub}</div>
              </div>
              <span style={{
                fontSize: 11, fontWeight: 600,
                color: t.color,
                background: `${t.color}18`,
                border: `1px solid ${t.color}33`,
                padding: '2px 8px', borderRadius: 99,
              }}>{t.status}</span>
            </div>
          ))}
        </div>

        {/* Connected */}
        <div style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: '14px 16px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 14, marginBottom: 12 }}>Connected</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            {['Jira','Slack'].map(name => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 10px', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-success)' }} />
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
              </div>
            ))}
          </div>
          <button style={{ fontSize: 12, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
            View all integrations
          </button>
        </div>
      </div>
    </div>
  );
}