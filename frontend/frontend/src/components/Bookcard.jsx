export const BookCard = ({ libro, onSelectBook }) => {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <span style={styles.categoryBadge}>Libro</span>
        <span style={styles.isbnBadge}>ISBN: {libro.isbn}</span>
      </div>
      <h3 style={styles.bookTitle}>{libro.titulo}</h3>
      <p style={styles.author}>✍️ {libro.autor}</p>

      <div style={styles.keywordsContainer}>
        <strong style={styles.keywordsLabel}>Palabras clave:</strong>
        <div style={styles.tagsGroup}>
          {libro.palabras_clave?.split(',').map((tag, idx) => (
            <span key={idx} style={styles.tag}>
              {tag.trim()}
            </span>
          ))}
        </div>
      </div>

      <button 
        onClick={() => onSelectBook(libro)}
        style={styles.detailButton}
      >
        Ver detalles
      </button>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid #e2e8f0',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '12px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  categoryBadge: {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: '11px',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  isbnBadge: {
    fontSize: '12px',
    color: '#94a3b8',
  },
  bookTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#0f172a',
    margin: 0,
    lineHeight: '1.4',
  },
  author: {
    fontSize: '14px',
    color: '#475569',
    margin: 0,
  },
  keywordsContainer: {
    marginTop: 'auto',
    paddingTop: '8px',
    borderTop: '1px solid #f1f5f9',
  },
  keywordsLabel: {
    display: 'block',
    fontSize: '12px',
    color: '#94a3b8',
    marginBottom: '6px',
  },
  tagsGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
  },
  tag: {
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    fontSize: '12px',
    padding: '2px 8px',
    borderRadius: '4px',
  },
  detailButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#f1f5f9',
    color: '#1e293b',
    fontWeight: '600',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '8px',
  },
};