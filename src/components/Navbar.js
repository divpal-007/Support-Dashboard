// ============================================
// Navbar.js — Top navigation bar component
//
// CONCEPT: Components are like Java classes
// but they return UI instead of objects.
// This component has NO state — it's purely
// visual. We call these "presentational" components
// ============================================

import React from 'react';
import './Navbar.css';
import { useState} from 'react';
import {CreateTicketModal} from './TicketCreationUpdation';
// This component takes no props — it's static
function Navbar({onCreate}) {
  // For Modal opening and creation of new Tickets
    const [showCreate, setShowCreate] = useState(false);
    const [loading, setLoading] = useState(false);
 
  return (
    <>
    <nav className="navbar">

      {/* Left side — Logo and app name */}
      <div className="navbar-brand">
        {/* This is a simple emoji icon — in real app use SVG */}
        <span className="navbar-icon">🤖</span>
        <div className="navbar-title-group">
          <span className="navbar-title">TellMe</span>
          <span className="navbar-subtitle">Powered by AI</span>
        </div>
      </div>

      {/* Right side — User info */}
      <div className="navbar-right">
         {/* // Create btn for Tickets.. */}
      <div className="create-button">
      <button className="create-ticket-btn" onClick={() => setShowCreate(true)}>
        + New Ticket
      </button>
      </div>
        {/* Notification bell */}
        <button className="navbar-btn" title="Notifications">
          🔔
          {/* Red dot showing there are notifications */}
          <span className="notification-dot"></span>
        </button>

        {/* User avatar — shows initials */}
        <div className="navbar-avatar" title="Divyanshu Pal">
          DP
        </div>
      </div>

    </nav>
      {/* ── Modals ── */}
      {/* 🎓 LEARNING: Conditional rendering with && - only render
          when showCreate is true */}
      {showCreate && (
        <CreateTicketModal
          onClose={() => setShowCreate(false)}
          onCreate={onCreate}
          loading={loading}
        />
      )}
    </>
  );
}

export default Navbar;
