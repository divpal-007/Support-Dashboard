// ============================================
// App.js — This is the ROOT component
// Think of it like the MAIN method in Java
// Every other component is used inside this
// ============================================

// Step 1: Always import React when building components
import React, { useState,useEffect } from 'react';
// useState is a HOOK — it lets us store data that can change
// Think of it like a variable that React watches for changes
// When it changes → React automatically re-renders the UI

// Step 2: Import child components (we will create these)
import { AppProvider, useApp } from './context/AppContext.js';
import Sidebar from './components/SideBar.js';
import Navbar from './components/Navbar.js';
import HomePage from './components/Homepage.js';
import {
  OperationsPage, EscalationsPage, CoordinationPage,
  IeePage, AutomationsPage, IntegrationsPage, ReportsPage, SettingsPage
} from './components/Stubpages.js';
import styles from './ComponentsStyle/AppModules.css';

const PAGE_TITLES = {
  home:         { greeting: 'Good morning, Alex 👋', sub: "Here's what's happening with your operations today." },
  operations:   { greeting: 'Operations',        sub: 'Manage and triage your operational queues.' },
  escalations:  { greeting: 'Escalations',       sub: 'Review and resolve critical escalations.' },
  coordination: { greeting: 'Coordination',      sub: 'Coordinate across teams and assignments.' },
  iee:          { greeting: 'IEE™ Intelligence', sub: 'AI-powered insights and recommendations.' },
  automations:  { greeting: 'Automations',       sub: 'Configure rules, triggers and workflows.' },
  integrations: { greeting: 'Integrations',      sub: 'Manage your connected tools and services.' },
  reports:      { greeting: 'Reports',           sub: 'Analytics, SLA trends and performance data.' },
  settings:     { greeting: 'Settings',          sub: 'Workspace and account configuration.' },
};

function RouterView() {
  const { activeRoute } = useApp();
  const map = {
    home:         <HomePage />,
    operations:   <OperationsPage />,
    escalations:  <EscalationsPage />,
    coordination: <CoordinationPage />,
    iee:          <IeePage />,
    automations:  <AutomationsPage />,
    integrations: <IntegrationsPage />,
    reports:      <ReportsPage />,
    settings:     <SettingsPage />,
  };
  return map[activeRoute] || <HomePage />;
}

function DashboardLayout() {
  const { activeRoute } = useApp();
  const meta = PAGE_TITLES[activeRoute] || PAGE_TITLES.home;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <Navbar onCreateClick={() => console.log('Create clicked')} />
      <main className={styles.main}>
        {/* Page header — shown on all routes except home (home has its own inline) */}
        {activeRoute !== 'home' && (
          <div className={styles.pageHeader}>
            <div className={styles.greeting}>{meta.greeting}</div>
            <div className={styles.greetingSub}>{meta.sub}</div>
          </div>
        )}
        {activeRoute === 'home' && (
          <div className={styles.pageHeader}>
            <div className={styles.greeting}>{meta.greeting}</div>
            <div className={styles.greetingSub}>{meta.sub}</div>
          </div>
        )}
        <RouterView />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <DashboardLayout />
    </AppProvider>
  );
}
