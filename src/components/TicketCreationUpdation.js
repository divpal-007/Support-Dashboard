import { useState} from 'react'; 
// ─── CREATE TICKET MODAL ─────────────────────────────────────
// 🎓 LEARNING: This is a "controlled component" - all inputs are
//    managed by React state, not the DOM directly.
function CreateTicketModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    customerName: "",
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🎓 LEARNING: One handler for all inputs using computed property [name]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // Basic validation if fields are empty
    if (!form.title.trim() || !form.description.trim() || !form.customerName.trim()) {
      setError("All fields are required.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      // 🎓 LEARNING: Build the new ticket object to pass up to parent
      const newTicket = {
        title:form.title,
        description:form.description,
        userName:form.customerName,
        createdAt: new Date().toISOString(),
        status:"Open",
        avatar:form.customerName.split(" ")[0].charAt(0)+form.customerName.split(" ")[1].charAt(0) != undefined ? form.customerName.split(" ")[1].charAt(0):"" 
      };

      await onCreate(newTicket);
      onClose();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 🎓 LEARNING: onClick on overlay closes modal; stopPropagation
    //    on inner div prevents clicks inside from bubbling up
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <span style={styles.modalTitle}>🎫 New Support Ticket</span>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Customer Name</label>
          <input
            style={styles.input}
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="e.g. Priya Sharma"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Issue Title</label>
          <input
            style={styles.input}
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Payment not processing"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Description</label>
          <textarea
            style={{ ...styles.input, height: 100, resize: "vertical" }}
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the issue in detail..."
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}
        <div style={styles.aiNote}>
           AI Agent will auto-assign category, priority & sentiment
        </div>
        <div style={styles.modalFooter}>
          <button style={styles.cancelBtn} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            style={{ ...styles.createBtn, opacity: loading ? 0.7 : 1 }}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "⏳ Analyzing..." : "✨ Create Ticket"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DeleteConfirmModal({ ticket, onConfirm, onCancel }) {
  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={{ ...styles.modal, maxWidth: 400 }} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalHeader}>
          <span style={{ ...styles.modalTitle, color: "#d32f2f" }}>🗑️ Delete Ticket</span>
          <button style={styles.closeBtn} onClick={onCancel}>✕</button>
        </div>
        <p style={{ margin: "0 0 8px", color: "#555", lineHeight: 1.6 }}>
          Are you sure you want to delete ticket:
        </p>
        <p style={{ margin: "0 0 24px", fontWeight: 700, color: "#111" }}>
          "{ticket.title}"
        </p>
        <p style={{ margin: "0 0 24px", color: "#888", fontSize: 13 }}>
          This action cannot be undone.
        </p>
        <div style={styles.modalFooter}>
          <button style={styles.cancelBtn} onClick={onCancel}>Keep it</button>
          <button
            style={{ ...styles.createBtn, background: "#d32f2f" }}
            onClick={() => onConfirm(ticket.id)}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
// ─── STYLES ───────────────────────────────────────────────────
// 🎓 LEARNING: Inline styles in React use camelCase and JS objects.
//    For larger projects, use Tailwind CSS or CSS Modules instead.
const styles = {
  root: {
    minHeight: "100vh",
    background: "#f8fafc",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    padding: "24px",
    maxWidth: 1200,
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 12,
  },
  heading: { margin: 0, fontSize: 28, fontWeight: 800, color: "#111827" },
  subheading: { margin: "4px 0 0", color: "#6b7280", fontSize: 14 },
  statsBar: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  statCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: "12px 20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 80,
    boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
  },
  statValue: { fontSize: 26, fontWeight: 800, lineHeight: 1 },
  statLabel: { fontSize: 12, color: "#9ca3af", marginTop: 4 },
  toolbar: {
    display: "flex",
    gap: 12,
    marginBottom: 20,
    flexWrap: "wrap",
    alignItems: "center",
  },
  search: {
    flex: 1,
    minWidth: 200,
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    background: "#fff",
  },
  filterGroup: { display: "flex", gap: 6 },
  filterBtn: {
    border: "none",
    borderRadius: 8,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: 16,
  },
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: "18px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    transition: "box-shadow 0.2s",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  badge: {
    fontSize: 11,
    fontWeight: 700,
    padding: "3px 10px",
    borderRadius: 20,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  deleteBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: 16,
    padding: 2,
    borderRadius: 6,
    opacity: 0.6,
    transition: "opacity 0.15s",
  },
  cardTitle: { margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" },
  cardDesc: { margin: 0, fontSize: 13, color: "#6b7280", lineHeight: 1.6 },
  cardFooter: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    borderTop: "1px solid #f3f4f6",
    paddingTop: 10,
  },
  footerItem: { fontSize: 12, color: "#9ca3af" },
  empty: {
    textAlign: "center",
    color: "#9ca3af",
    padding: "60px 0",
    fontSize: 16,
  },
  // Modal styles
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    padding: 28,
    width: "100%",
    maxWidth: 520,
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: 800, color: "#111827" },
  closeBtn: {
    background: "#f3f4f6",
    border: "none",
    borderRadius: 8,
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: 14,
    color: "#374151",
  },
  field: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  input: {
    padding: "10px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    fontSize: 14,
    outline: "none",
    fontFamily: "inherit",
    width: "100%",
    boxSizing: "border-box",
  },
  error: { color: "#d32f2f", fontSize: 13, margin: 0 },
  aiNote: {
    background: "#f0f4ff",
    border: "1px solid #c7d2fe",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    color: "#4338ca",
  },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: 10 },
  cancelBtn: {
    background: "#f3f4f6",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    color: "#374151",
  },
  createBtn: {
    background: "#6366f1",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
  },
};
export {CreateTicketModal,DeleteConfirmModal};
