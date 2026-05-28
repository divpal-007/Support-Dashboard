
import { useState }       from 'react';
import { useEscalations } from '../../hooks/useEscalations';
import styles from './EscalationPage.module.css';

export default function EscalationsPage() {
  const {
    escalations,
    loading,
    error,
    create,
    resolve,
  } = useEscalations();

  const [showForm,    setShowForm]    = useState(false);
  const [submitting,  setSubmitting]  = useState(false);
  const [formError,   setFormError]   = useState('');
  const [title,       setTitle]       = useState('');
  const [description, setDescription] = useState('');
  const [resolvingId, setResolvingId] = useState(null);
  const [resolution,  setResolution]  = useState('');
  const [resolving,   setResolving]   = useState(false);

  // ── Severity badge class ────────────────────────────
  const severityClass = {
    critical: styles.badgeCritical,
    high:     styles.badgeHigh,
    medium:   styles.badgeMedium,
    low:      styles.badgeLow,
  };

  // ── Create ──────────────────────────────────────────
  const handleSubmit = async () => {
    if (!title.trim()) { setFormError('Title is required'); return; }
    setSubmitting(true);
    setFormError('');
    try {
      await create({
        title:       title.trim(),
        description: description.trim(),
        createdBy:   'engineer@operix.com',
      });
      setTitle('');
      setDescription('');
      setShowForm(false);
    } catch (err) {
      setFormError(typeof err === 'string'
        ? err : 'Failed to create ticket');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Resolve ─────────────────────────────────────────
  const handleResolve = async () => {
    if (!resolution.trim()) return;
    setResolving(true);
    try {
      await resolve(resolvingId, resolution.trim());
      setResolvingId(null);
      setResolution('');
    } finally {
      setResolving(false);
    }
  };

  // ── Render ───────────────────────────────────────────
  if (loading) return (
    <div className={styles.centered}>
      <div className={styles.spinner} />
      <p>Loading escalations...</p>
    </div>
  );

  if (error) return (
    <div className={styles.centered}>
      <p style={{ color: 'var(--color-critical)' }}>{error}</p>
    </div>
  );

  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Escalations</h1>
          <p className={styles.subtitle}>
            {escalations.filter(e => e.status === 'open').length} open
            · AI classified · IEE learning
          </p>
        </div>
        <button
          className={styles.createBtn}
          onClick={() => setShowForm(!showForm)}
        >
          + New Ticket
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className={styles.form}>
          <h3 className={styles.formTitle}>
            New Escalation
            <span className={styles.aiTag}>⚡ Gemini will classify</span>
          </h3>

          <input
            className={styles.input}
            placeholder="Title — what is the issue?"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <textarea
            className={styles.input}
            placeholder="Description — more detail = higher AI confidence"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          {formError && (
            <p className={styles.formError}>{formError}</p>
          )}

          <div className={styles.formActions}>
            <button
              className={styles.cancelBtn}
              onClick={() => { setShowForm(false); setFormError(''); }}
            >
              Cancel
            </button>
            <button
              className={styles.submitBtn}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Classifying...' : 'Submit Ticket'}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {escalations.length === 0 ? (
        <div className={styles.empty}>
          <p>No escalations found 🎉</p>
        </div>
      ) : (
        <div className={styles.list}>
          {escalations.map(item => (
            <div key={item.id} className={styles.card}>

              {/* Top row */}
              <div className={styles.cardTop}>
                <div className={styles.cardLeft}>
                  <span className={`${styles.badge}
                    ${severityClass[item.severity]}`}>
                    {item.severity?.toUpperCase()}
                  </span>

                  {item.priority && (
                    <span className={styles.priorityBadge}>
                      {item.priority}
                    </span>
                  )}

                  {item.aiClassified && (
                    <span className={styles.aiBadge}>⚡ AI</span>
                  )}

                  <span className={styles.cardTitle}>
                    {item.title}
                  </span>
                </div>

                <div className={styles.cardRight}>
                  <span className={styles.age}>{item.age}</span>

                  {item.status === 'open' && (
                    <button
                      className={styles.resolveBtn}
                      onClick={() => setResolvingId(item.id)}
                    >
                      Resolve
                    </button>
                  )}

                  {item.status === 'resolved' && (
                    <span className={styles.resolvedLabel}>
                      ✓ Resolved
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom row */}
              <div className={styles.cardBottom}>
                {item.category && (
                  <span className={styles.category}>
                    {item.category}
                  </span>
                )}
                {item.aiConfidence != null && (
                  <span className={styles.confidence}>
                    AI confidence: {item.aiConfidence}%
                  </span>
                )}
                {item.aiReasoning && (
                  <span className={styles.reasoning}>
                    {item.aiReasoning}
                  </span>
                )}
              </div>

              {/* IEE Suggestion */}
              {item.suggestedResolution && item.status === 'open' && (
                <div className={styles.suggestion}>
                  <span className={styles.suggestionLabel}>
                    💡 IEE Suggestion:
                  </span>
                  <span className={styles.suggestionText}>
                    {item.suggestedResolution}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Resolve Modal */}
      {resolvingId && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>
              Resolve Escalation
            </h3>
            <p className={styles.modalSubtitle}>
              What fixed it? IEE will learn from this.
            </p>

            <textarea
              className={styles.input}
              placeholder="Describe what resolved the issue..."
              value={resolution}
              onChange={e => setResolution(e.target.value)}
              autoFocus
            />

            <div className={styles.formActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => {
                  setResolvingId(null);
                  setResolution('');
                }}
              >
                Cancel
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleResolve}
                disabled={resolving || !resolution.trim()}
              >
                {resolving ? 'Saving...' : 'Mark Resolved'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}