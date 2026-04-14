// ============================================
// TicketCard.js — Single ticket row
//
// CONCEPT: PROPS DRILLING
// App.js → TicketList → TicketCard
// Data flows DOWN through props
// Each level passes what the child needs
// ============================================

import React, { useState } from 'react';
import './TicketCard.css';

function TicketCard({ ticket }) {

  // Local state — only this card knows if it's expanded
  // Each card has its own independent expanded state
  const [isExpanded, setIsExpanded] = useState(false);

  // ── HELPER FUNCTIONS ─────────────────────────

  // Returns CSS class based on status
  // Used to color the status badge
  const getStatusClass = (status) => {
    // switch is cleaner than multiple if-else for this
    switch (status) {
      case 'Open': return 'status-open';
      case 'Pending': return 'status-pending';
      case 'Resolved': return 'status-resolved';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  // Format date nicely
  // new Date() converts string to Date object
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Generate a color for avatar based on initials
  const getAvatarColor = (initials) => {
    const colors = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#22c55e', '#3b82f6'];
    // Use char code to pick consistent color for same initials
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      {/* Main ticket row */}
      <div
        className={`ticket-card ${isExpanded ? 'expanded' : ''}`}
        onClick={() => setIsExpanded(!isExpanded)}
        // !isExpanded toggles between true and false
        // This is how we toggle/expand rows on click
      >

        {/* Ticket ID + Title */}
        <div className="ticket-main">
          <span className="ticket-id">#{ticket.id}</span>
          <span className="ticket-title">{ticket.title}</span>
        </div>

        {/* User with avatar */}
        <div className="ticket-user">
          <div
            className="avatar"
            style={{ backgroundColor: getAvatarColor(ticket.avatar) }}
          >
            {ticket.avatar}
          </div>
          <span className="user-name">{ticket.user}</span>
        </div>

        {/* Category badge */}
        <div className="ticket-category">
          <span className="category-badge">{ticket.category}</span>
        </div>

        {/* Priority badge */}
        <div className="ticket-priority">
          <span className={`priority-badge ${getPriorityClass(ticket.priority)}`}>
            {ticket.priority}
          </span>
        </div>

        {/* Status badge */}
        <div className="ticket-status">
          <span className={`status-badge ${getStatusClass(ticket.status)}`}>
            {ticket.status}
          </span>
        </div>

        {/* Date */}
        <div className="ticket-date">
          {formatDate(ticket.createdAt)}
        </div>

      </div>

      {/* Expanded details — only shown when isExpanded is true */}
      {/* && operator: if left is true → render right side */}
      {isExpanded && (
        <div className="ticket-details">
          <div className="detail-row">
            <span className="detail-label">📧 Email:</span>
            <span className="detail-value">{ticket.email}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">📅 Created:</span>
            <span className="detail-value">{formatDate(ticket.createdAt)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🏷️ Category:</span>
            <span className="detail-value">{ticket.category}</span>
          </div>
          <div className="ticket-actions">
            <button className="action-btn btn-resolve">✅ Mark Resolved</button>
            <button className="action-btn btn-pending">🟡 Mark Pending</button>
            <button className="action-btn btn-close">✕ Close</button>
          </div>
        </div>
      )}
    </>
    // <> </> is called a Fragment
    // React needs ONE parent element
    // Fragment is an invisible wrapper — doesn't add extra HTML
  );
}

export default TicketCard;
