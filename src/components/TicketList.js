// ============================================
// TicketList.js — Renders list of tickets
//
// CONCEPT: LIST RENDERING
// In React we use .map() to render lists
// Each item needs a unique 'key' prop
// React uses key to track which items changed
// (like a primary key in database)
// ============================================

import React from 'react';
import TicketCard from './TicketCard';
import './TicketList.css';

function TicketList({ tickets }) {

  // ── CONDITIONAL RENDERING ────────────────────
  // If no tickets match the filter/search
  // show an empty state message instead
  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No tickets found</h3>
        <p>Try adjusting your search or filter</p>
      </div>
    );
  }

  return (
    <div className="ticket-list">

      {/* Header row */}
      <div className="ticket-list-header">
        <span>Ticket</span>
        <span>User</span>
        <span>Category</span>
        <span>Priority</span>
        <span>Status</span>
        <span>Date</span>
      </div>

      {/* Loop through tickets and render a TicketCard for each */}
      {/* tickets.map() = like forEach in Java but returns new array */}
      {tickets.map(ticket => (
        // key={ticket.id} is required — helps React track changes efficiently
        <TicketCard key={ticket.id} ticket={ticket} />
      ))}

      {/* Footer showing count */}
      <div className="ticket-list-footer">
        Showing {tickets.length} ticket{tickets.length !== 1 ? 's' : ''}
      </div>

    </div>
  );
}

export default TicketList;
