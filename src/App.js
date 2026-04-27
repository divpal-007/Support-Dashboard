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
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import FilterBar from './components/FilterBar';
import TicketList from './components/TicketList';
import { getTickets,deleteTicket,updateTicket,createTicket } from "./api/ticketApi";
// Step 3: Import CSS for this component
import './App.css';

// Step 4: Import mock data (fake tickets for now — no backend needed)
//import { mockTickets } from './data/mockData';

// ============================================
// This is a FUNCTIONAL COMPONENT
// In React, components are just functions
// that return HTML-like code called JSX
// ============================================
function App() {

  // ── STATE (data that can change) ──────────────
  // useState('') means: create a variable called searchTerm
  // Initial value = '' (empty string)
  // setSearchTerm = function to UPDATE searchTerm
  // Syntax: const [variable, setVariable] = useState(initialValue)
  const [searchTerm, setSearchTerm] = useState('');
  const [tickets,setTickets]= useState([]);
  const [loading, setLoading] = useState(false);
  // This stores which filter button is active
  // 'All' is selected by default
  const [activeFilter, setActiveFilter] = useState('All');

  // ── DERIVED DATA (computed from state) ────────
  // This runs every time searchTerm or activeFilter changes
  // It filters the tickets based on what user typed or clicked
  const filteredTickets = tickets.filter(ticket => {

    // Check if ticket matches the search term
    // .toLowerCase() makes search case-insensitive
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase())
      || ticket.userName.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if ticket matches the active filter
    // If filter is 'All' → show everything
    // Otherwise → only show tickets with matching status
    const matchesFilter = activeFilter === 'All' || ticket.status === activeFilter;

    // Return true only if BOTH conditions match
    return matchesSearch && matchesFilter;
  });
  
    const fetchTickets = async () => {
        setLoading(true);
      try {
        const res = await getTickets();
        const data = await res.json();
        setTickets(data);
      } catch (err) {
        console.error(err);
      }finally{
        setLoading(false);
      }
    };

    const handleCreate = async (data) => {
    try {
      await createTicket(data);
      await fetchTickets();
    }catch (err) {
      console.error(err);
    }
    };

    const handleDelete = async (id) => {
    await deleteTicket(id);
    await fetchTickets(); // refresh UI
    console.log("Refetched tickets");
  };
  const handleUpdate = async (id, ticket,status) => {
    ticket.status=status;
    await updateTicket(id, ticket);
    await fetchTickets();
    console.log("Refetched tickets");
  };
    useEffect(() => {
      fetchTickets();
      }, []);
  useEffect(() => {
    // querySelector searches for link attribute 
    // if not found the createElement creates it
    const iconTitle = document.querySelector("link[rel='icon']") || document.createElement('link');
    iconTitle.rel = 'icon';
    iconTitle.href = 'https://cdn.jsdelivr.net/npm/twemoji@14.0.2/assets/72x72/1f916.png';
    document.head.appendChild(iconTitle);
    // Dynamic Title for Total Tickets Count with App Name
    document.title = `${filteredTickets.length} Tickets | TellMe`;
  }, [filteredTickets]);
  
  // ── JSX (what gets shown on screen) ───────────
  // JSX looks like HTML but it's actually JavaScript
  // Rules:
  // 1. Use className instead of class (class is reserved in JS)
  // 2. Every JSX must have ONE parent element
  // 3. Use {} to write JavaScript inside JSX
  return (
    <>
        {loading && (
    <div className="overlay">
      <div className="loader-box">
      <div className="spinner"></div>
      <p>loading...</p>
      </div>
    </div>
      )}
    <div className="app">
      {/* Navbar — just shows the top bar */}
      <Navbar onCreate={handleCreate} loading={loading}/>

      {/* Main content area */}
      <main className="main-content">

        {/* Stats cards — shows ticket counts */}
        {/* We pass 'tickets' as a PROP (like a parameter in Java) */}
        <StatsCards tickets={tickets} />

        {/* Filter and search bar */}
        {/* We pass state values AND setter functions as props */}
        <FilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* Ticket list — shows filtered results */}
        <TicketList tickets={filteredTickets} onDelete={handleDelete} onUpdate={handleUpdate} />

      </main>
    </div>
    </>
  );
} 

// Always export your component so other files can use it
export default App;
