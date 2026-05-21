// ============================================
// App.js — This is the ROOT component
// Think of it like the MAIN method in Java
// Every other component is used inside this
// ============================================

// Step 1: Always import React when building components
// import React, { useState,useEffect } from 'react';
// useState is a HOOK — it lets us store data that can change
// Think of it like a variable that React watches for changes
// When it changes → React automatically re-renders the UI

// Step 2: Import child components (we will create these)

import { AppProvider, useAppStore } from './store/appStore';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Navbar/Navbar';
import DashboardLayout from './components/layout/DashboardLayout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';

import {
  EscalationsPage, TicketsPage, IeePage, WorkloadPage,
  ProblemsPage, ChangesPage, AssetsPage, ReportsPage,
  AutomationPage, IntegrationsPage, SettingsPage,
} from './pages/StubPages';

const ROUTE_MAP = {
  overview:     <Dashboard />,
  escalations:  <EscalationsPage />,
  tickets:      <TicketsPage />,
  iee:          <IeePage />,
  workload:     <WorkloadPage />,
  problems:     <ProblemsPage />,
  changes:      <ChangesPage />,
  assets:       <AssetsPage />,
  reports:      <ReportsPage />,
  automation:   <AutomationPage />,
  integrations: <IntegrationsPage />,
  settings:     <SettingsPage />,
};

function AppShell() {
  const { state, navigate, setSearch } = useAppStore();
  const { activeRoute, user, notifications, searchQuery } = state;

  return (
    <DashboardLayout
      sidebar={
        <Sidebar
          activeRoute={activeRoute}
          onNavigate={navigate}
        />
      }
      navbar={
        <Navbar
          user={user}
          notifications={notifications}
          searchValue={searchQuery}
          onSearchChange={setSearch}
        />
      }
    >
      {ROUTE_MAP[activeRoute] || <Dashboard />}
    </DashboardLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
