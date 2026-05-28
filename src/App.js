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

import { ACTIONS, AppProvider, useAppStore } from './store/appStore';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Navbar from './components/layout/Navbar/Navbar';
import DashboardLayout from './components/layout/DashboardLayout/DashboardLayout';
import Dashboard from './pages/Dashboard/Dashboard';

import { TicketsPage, IeePage, WorkloadPage,
  ProblemsPage, ChangesPage, AssetsPage, ReportsPage,
  AutomationPage, IntegrationsPage, SettingsPage,
} from './pages/StubPages';
import { useEffect } from 'react';
import { authService } from './services/api';
import Hero from './home/ops-hero';
import EscalationsPage from './pages/Escalations/EscalationPage';

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
  const { state, navigate, setSearch,dispatch } = useAppStore();
  const { activeRoute, user, notifications, searchQuery } = state;

  //Step 1 - restore session on app load
  useEffect(() => {
    async function restoreSession() {
      dispatch({type:ACTIONS.AUTH_LOADING}); //set loading true
      try{
        const userData = await authService.me();
        dispatch({type:ACTIONS.SET_USER, payload:userData});
      }catch{
        dispatch({type:ACTIONS.LOGOUT});
      }
    }
    restoreSession();
  },[]);
    if(state.auth.loading){
      return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0b0f',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6366f1',
        fontSize: '14px',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '32px',
            height: '32px',
            border: '2px solid rgba(99,102,241,0.2)',
            borderTop: '2px solid #6366f1',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 12px',
          }} />
          Loading...
        </div>
      </div>
    );
    }
  //Step 2 - show Dashboard if authenticated
  if(!state.isAuthenticated){
    return <Hero/>;
  }

  //Step 3 - show Dashboard if authenticated
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
