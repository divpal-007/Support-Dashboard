import styles from './StubPage.module.css';

function StubPage({ icon, title, description }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.desc}>{description}</div>
    </div>
  );
}

export function EscalationsPage() {
  return <StubPage icon="🚨" title="Escalations" description="Full escalation management coming next." />;
}
export function TicketsPage() {
  return <StubPage icon="🎫" title="Tickets" description="Ticket list with FilterBar and TicketCard." />;
}
export function IeePage() {
  return <StubPage icon="🤖" title="IEE™ Intelligence" description="AI pattern matching and recommendations." />;
}
export function WorkloadPage() {
  return <StubPage icon="📊" title="Workload" description="Team workload distribution and analytics." />;
}
export function ProblemsPage() {
  return <StubPage icon="⚠️" title="Problems" description="Problem management and root cause analysis." />;
}
export function ChangesPage() {
  return <StubPage icon="🔀" title="Changes" description="Change management and approval workflows." />;
}
export function AssetsPage() {
  return <StubPage icon="📦" title="Assets" description="Asset inventory and configuration management." />;
}
export function ReportsPage() {
  return <StubPage icon="📈" title="Reports" description="Analytics, SLA trends and performance data." />;
}
export function AutomationPage() {
  return <StubPage icon="⚡" title="Automation" description="Rules, triggers and automated workflows." />;
}
export function IntegrationsPage() {
  return <StubPage icon="🔌" title="Integrations" description="Jira, Slack, PagerDuty and more." />;
}
export function SettingsPage() {
  return <StubPage icon="⚙️" title="Settings" description="Workspace and account configuration." />;
}
