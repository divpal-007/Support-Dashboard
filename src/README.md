# 🤖 SupportAI Dashboard

A responsive AI-powered support ticket management dashboard built with React.js.

## 🌐 Live Demo
[View Live on Vercel](#) ← Add your Vercel link here after deploying

## 📸 Screenshot
<!-- Add screenshot after running the project -->

## ✨ Features
- 📊 Real-time ticket statistics (Total, Open, Pending, Resolved)
- 🔍 Live search by ticket title or user name
- 🔘 Filter tickets by status (All, Open, Pending, Resolved)
- 📋 Expandable ticket rows with full details
- 📱 Fully responsive — works on mobile, tablet, desktop
- 🎨 Clean, accessible UI with priority and status color coding

## 🛠️ Tech Stack
- **React.js** — Component-based UI
- **JavaScript (ES6+)** — useState, array methods, destructuring
- **CSS3** — Flexbox, CSS Grid, CSS Variables, Responsive Design
- **Vercel** — Deployment

## 🚀 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/support-dashboard.git

# Navigate to project
cd support-dashboard

# Install dependencies
npm install

# Start development server
npm start

# Open browser at http://localhost:3000
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.js        # Top navigation bar
│   ├── StatsCards.js    # Ticket count summary cards
│   ├── FilterBar.js     # Search + filter buttons
│   ├── TicketList.js    # List container
│   └── TicketCard.js    # Individual ticket row
├── data/
│   └── mockData.js      # Mock ticket data + helper functions
├── App.js               # Root component + state management
└── App.css              # Global styles + CSS variables
```

## 💡 React Concepts Used
- `useState` — managing search, filter, and expanded state
- Props — passing data from parent to child components
- Conditional rendering — showing empty state, expanded details
- List rendering — `.map()` to render ticket cards
- Controlled inputs — search input controlled by React state
- Component composition — reusable StatCard inside StatsCards

## 🔮 Planned Improvements
- [ ] Connect to real REST API backend
- [ ] Add JWT authentication
- [ ] Dark mode toggle
- [ ] Ticket creation modal
- [ ] Charts showing ticket trends (Chart.js)
- [ ] Docker containerization
- [ ] Deploy backend on AWS EC2

## 👨‍💻 Author
**Divyanshu Pal** — Full Stack Engineer | 2x AWS Certified
- LinkedIn: [linkedin.com/in/divyanshu_pal](https://linkedin.com/in/divyanshu_pal)