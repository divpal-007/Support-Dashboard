// ============================================
// FilterBar.js — Search input + filter buttons
//
// CONCEPT: TWO-WAY DATA BINDING
// When user types in search box:
// 1. onChange fires
// 2. setSearchTerm updates state in App.js
// 3. App.js re-renders with new filtered data
// 4. TicketList shows updated results
//
// This is called "lifting state up" in React —
// state lives in parent (App.js) so both
// FilterBar and TicketList can share it
// ============================================

import React from 'react';
import './FilterBar.css';

// We receive 4 props from App.js:
// searchTerm    = current search text (read)
// setSearchTerm = function to update search text (write)
// activeFilter  = current filter button selected (read)
// setActiveFilter = function to change filter (write)
function FilterBar({ searchTerm, setSearchTerm, activeFilter, setActiveFilter }) {

  // These are the filter button options
  // 'All' shows everything, others filter by status
  const filters = ['All', 'Open', 'Pending', 'Resolved'];

  return (
    <div className="filter-bar">

      {/* ── SEARCH INPUT ── */}
      <div className="search-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search tickets by title or user..."

          /* value={searchTerm} makes this a "controlled input" */
          /* React controls what's shown in the input */
          value={searchTerm}

          /* onChange fires every time user types a character */
          /* e = event object, e.target.value = what user typed */
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Show X button only if user has typed something */}
        {/* This is conditional rendering using && operator */}
        {/* If searchTerm is not empty → show the button */}
        {searchTerm && (
          <button
            className="search-clear"
            onClick={() => setSearchTerm('')}
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── FILTER BUTTONS ── */}
      <div className="filter-buttons">

        {/* .map() loops through the filters array */}
        {/* For each filter, it creates a button */}
        {/* This is like a for-each loop in Java */}
        {filters.map(filter => (
          <button
            key={filter}  // React needs unique 'key' when rendering lists
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            // If this filter is the active one → add 'active' CSS class
            // Ternary operator: condition ? valueIfTrue : valueIfFalse

            onClick={() => setActiveFilter(filter)}
            // When clicked → update activeFilter state in App.js
          >
            {/* Show colored dot based on filter type */}
            {filter === 'Open' && <span className="dot dot-red"></span>}
            {filter === 'Pending' && <span className="dot dot-yellow"></span>}
            {filter === 'Resolved' && <span className="dot dot-green"></span>}
            {filter}
          </button>
        ))}

      </div>

    </div>
  );
}

export default FilterBar;
