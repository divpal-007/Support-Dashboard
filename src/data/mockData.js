// ============================================
// mockData.js — Fake ticket data
// In real world this would come from an API
// For now we hardcode it so we can focus on
// learning React without needing a backend
// ============================================

// This is a JavaScript array of objects
// Each object = one support ticket
// export keyword makes it available to other files
export const mockTickets = [
  {
    id: 1042,
    title: "Unable to login after password reset",
    user: "Rahul Sharma",
    email: "rahul@example.com",
    status: "Open",         // Open | Pending | Resolved
    priority: "High",       // High | Medium | Low
    category: "Auth",
    createdAt: "2026-04-10",
    avatar: "RS"            // Initials for avatar circle
  },
  {
    id: 1041,
    title: "Payment gateway showing error on checkout",
    user: "Priya Mehta",
    email: "priya@example.com",
    status: "Open",
    priority: "High",
    category: "Payment",
    createdAt: "2026-04-10",
    avatar: "PM"
  },
  {
    id: 1040,
    title: "Dashboard not loading on mobile devices",
    user: "Amit Verma",
    email: "amit@example.com",
    status: "Pending",
    priority: "Medium",
    category: "UI",
    createdAt: "2026-04-09",
    avatar: "AV"
  },
  {
    id: 1039,
    title: "Export to PDF button not working",
    user: "Sneha Rao",
    email: "sneha@example.com",
    status: "Resolved",
    priority: "Low",
    category: "Feature",
    createdAt: "2026-04-09",
    avatar: "SR"
  },
  {
    id: 1038,
    title: "Email notifications not being received",
    user: "Vikram Singh",
    email: "vikram@example.com",
    status: "Pending",
    priority: "High",
    category: "Email",
    createdAt: "2026-04-08",
    avatar: "VS"
  },
  {
    id: 1037,
    title: "Account settings page throws 500 error",
    user: "Ananya Patel",
    email: "ananya@example.com",
    status: "Open",
    priority: "High",
    category: "Bug",
    createdAt: "2026-04-08",
    avatar: "AP"
  },
  {
    id: 1036,
    title: "Profile picture upload fails for PNG files",
    user: "Rohan Gupta",
    email: "rohan@example.com",
    status: "Resolved",
    priority: "Low",
    category: "Feature",
    createdAt: "2026-04-07",
    avatar: "RG"
  },
  {
    id: 1035,
    title: "Two factor authentication code not working",
    user: "Pooja Nair",
    email: "pooja@example.com",
    status: "Open",
    priority: "High",
    category: "Auth",
    createdAt: "2026-04-07",
    avatar: "PN"
  },
  {
    id: 1034,
    title: "Slow page load on reports section",
    user: "Karan Malhotra",
    email: "karan@example.com",
    status: "Pending",
    priority: "Medium",
    category: "Performance",
    createdAt: "2026-04-06",
    avatar: "KM"
  },
  {
    id: 1033,
    title: "Dark mode toggle not saving preference",
    user: "Divya Krishnan",
    email: "divya@example.com",
    status: "Resolved",
    priority: "Low",
    category: "UI",
    createdAt: "2026-04-06",
    avatar: "DK"
  },
  {
    id: 1032,
    title: "CSV import failing for large files",
    user: "Arjun Bose",
    email: "arjun@example.com",
    status: "Open",
    priority: "Medium",
    category: "Feature",
    createdAt: "2026-04-05",
    avatar: "AB"
  },
  {
    id: 1031,
    title: "Invoice generation shows wrong currency",
    user: "Meera Joshi",
    email: "meera@example.com",
    status: "Resolved",
    priority: "Medium",
    category: "Payment",
    createdAt: "2026-04-05",
    avatar: "MJ"
  },
];

// ── HELPER: Count tickets by status ──────────
// This is a utility function used by StatsCards
// Object.values() converts object values to array
export const getTicketStats = (tickets) => {
  return {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'Open').length,
    pending: tickets.filter(t => t.status === 'Pending').length,
    resolved: tickets.filter(t => t.status === 'Resolved').length,
  };
};
