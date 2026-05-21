import styles from '../ComponentsStyle/AppModules.css';

function StubPage({ title, description }) {
  return (
    <div className={styles.comingSoon}>
      <div className={styles.comingSoonTitle}>{title}</div>
      <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{description}</p>
      <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4, opacity: 0.6 }}>
        Coming in next step →
      </p>
    </div>
  );
}

export function OperationsPage()   { return <StubPage title="Operations"       description="TicketList + FilterBar" />; }
export function EscalationsPage()  { return <StubPage title="Escalations"      description="Escalation queue & priority view" />; }
export function CoordinationPage() { return <StubPage title="Coordination"     description="Team coordination & assignments" />; }
export function IeePage()          { return <StubPage title="IEE™ Intelligence" description="AI-powered insights & recommendations" />; }
export function AutomationsPage()  { return <StubPage title="Automations"      description="Automation rules & triggers" />; }
export function IntegrationsPage() { return <StubPage title="Integrations"     description="Jira, Slack & more" />; }
export function ReportsPage()      { return <StubPage title="Reports"          description="Analytics & performance reports" />; }
export function SettingsPage()     { return <StubPage title="Settings"         description="Workspace configuration" />; }