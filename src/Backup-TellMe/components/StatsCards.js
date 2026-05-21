// ============================================
// StatsCards.js — Shows ticket count summary
//
// CONCEPT: PROPS
// Props = Properties passed from parent to child
// Like method parameters in Java
//
// Parent (App.js) passes: tickets={mockTickets}
// Child (this file) receives: { tickets }
// ============================================

import React from 'react';
import { getTicketStats } from '../data/mockData';
import './StatsCards.css';

// We receive 'tickets' as a PROP from App.js
// { tickets } is called "destructuring"
// It's the same as writing: function StatsCards(props) { const tickets = props.tickets }
function StatsCards({ tickets }) {

  // Calculate stats from the tickets array
  // This function is defined in mockData.js
  const stats = getTicketStats(tickets);

  // ── CONCEPT: Reusable inner component ────────
  // Instead of writing the same card HTML 4 times,
  // we define a mini component inside this function
  // title = card label, count = number, color = accent color, icon = emoji
  const StatCard = ({ title, count, color, icon, subtitle }) => (
    <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
      <div className="stat-icon" style={{ color }}>{icon}</div>
      <div className="stat-info">
        {/* {} means: evaluate this JavaScript and show result */}
        <div className="stat-count" style={{ color }}>{count}</div>
        <div className="stat-title">{title}</div>
        {subtitle && <div className="stat-subtitle">{subtitle}</div>}
      </div>
    </div>
  );

  return (
    <div className="stats-container">

      {/* We reuse StatCard 4 times with different props */}
      {/* This is the power of React components — reusability */}

      <StatCard
        title="Total Tickets"
        count={stats.total}
        color="#6366f1"
        icon="🎫"
        subtitle="All time"
      />
      <StatCard
        title="Open"
        count={stats.open}
        color="#ef4444"
        icon="🔴"
        subtitle="Needs attention"
      />
      <StatCard
        title="Pending"
        count={stats.pending}
        color="#f59e0b"
        icon="🟡"
        subtitle="In progress"
      />
      <StatCard
        title="Resolved"
        count={stats.resolved}
        color="#22c55e"
        icon="✅"
        subtitle="Completed"
      />

    </div>
  );
}

export default StatsCards;
