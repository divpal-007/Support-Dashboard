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

// This component takes no props — it's static
function Navbar() {
  return (
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
  );
}

export default Navbar;
