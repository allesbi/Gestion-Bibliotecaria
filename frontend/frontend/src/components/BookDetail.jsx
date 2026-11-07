import { useState } from 'react';
import axios from 'axios';

export const BookDetailModal = ({ libro, onClose }) => {
  const [loadingAction, setLoadingAction] = useState(''); // 'prestamo' o 'reserva'
  const [actionSuccess, setActionSuccess] = useState(''); // mensaje de confirmación

  if (!libro) return null;

  const handleRequestLoan = async () => {
    setLoadingAction('prestamo');
    try {
      await axios.post('http://localhost:5000/api/v1/prestamos', {
        libro_id: libro.id,
      });
      setActionSuccess('¡Solicitud de préstamo registrada con éxito! Puedes recoger el ejemplar en el mostrador principal.');
    } catch (error) {
      console.error('Error al solicitar el préstamo:', error);
      alert('Ocurrió un error al procesar la solicitud de préstamo.');
    } finally {
      setLoadingAction('');
    }
  };

  const handleRequestReservation = async () => {
    setLoadingAction('reserva');
    try {
      await axios.post('http://localhost:5000/api/v1/reservas', {
        libro_id: libro.id,
      });
      setActionSuccess('¡Reserva registrada con éxito! Te notificaremos cuando el ejemplar esté disponible.');
    } catch (error) {
      console.error('Error al solicitar la reserva:', error);
      alert('Ocurrió un error al procesar la solicitud de reserva.');
    } finally {
      setLoadingAction('');
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header style={styles.header}>
          <span style={styles.badge}>Ficha Bibliográfica</span>
          <button style={styles.closeButton} onClick={onClose}>✕</button>
        </header>

        <main style={styles.body}>
          <h2 style={styles.title}>{libro.titulo}</h2>
          <p style={styles.author}>✍️ <strong>Autor:</strong> {libro.autor}</p>

          <div style={styles.infoGrid}>
            <div style={styles.infoItem}>
              <span style={styles.label}>ISBN</span>
              <span style={styles.value}>{libro.isbn}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.label}>ID de Registro</span>
              <span style={styles.value}>#{libro.id}</span>
            </div>
          </div>

          <div style={styles.section}>
            <span style={styles.label}>Sinopsis / Descripción</span>
            <p style={styles.descriptionText}>
              {libro.descripcion || 'Sin descripción disponible para este recurso.'}
            </p>
          </div>

          <div style={{ ...styles.section, marginTop: '16px' }}>
            <span style={styles.label}>Palabras Clave</span>
            <div style={styles.tagsGroup}>
              {libro.palabras_clave?.split(',').map((tag, idx) => (
                <span key={idx} style={styles.tag}>
                  {tag.trim()}
                </span>
              ))}
            </div>
          </div>

          {actionSuccess && (
            <div style={styles.successBanner}>
              ✅ {actionSuccess}
            </div>
          )}
        </main>

        <footer style={styles.footer}>
          <button style={styles.secondaryButton} onClick={onClose}>
            {actionSuccess ? 'Cerrar' : 'Cancelar'}
          </button>
          {!actionSuccess && (
            <>
              <button
                style={styles.reserveButton}
                onClick={handleRequestReservation}
                disabled={Boolean(loadingAction)}
              >
                {loadingAction === 'reserva' ? 'Reservando...' : '📌 Solicitar Reserva'}
              </button>
              <button
                style={styles.primaryButton}
                onClick={handleRequestLoan}
                disabled={Boolean(loadingAction)}
              >
                {loadingAction === 'prestamo' ? 'Procesando...' : '📖 Solicitar Préstamo'}
              </button>
            </>
          )}
        </footer>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '560px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
  },
  header: {
    padding: '20px 24px 12px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: '6px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    color: '#64748b',
    cursor: 'pointer',
    padding: '4px',
  },
  body: {
    padding: '0 24px 24px 24px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '8px 0',
    lineHeight: '1.3',
  },
  author: {
    fontSize: '15px',
    color: '#475569',
    marginBottom: '16px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    backgroundColor: '#f8fafc',
    padding: '14px 16px',
    borderRadius: '10px',
    marginBottom: '16px',
  },
  infoItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  label: {
    fontSize: '11px',
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  value: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#1e293b',
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  descriptionText: {
    fontSize: '14px',
    color: '#334155',
    lineHeight: '1.5',
    margin: 0,
    backgroundColor: '#fafafa',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #f1f5f9',
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
    padding: '3px 8px',
    borderRadius: '4px',
  },
  successBanner: {
    marginTop: '16px',
    backgroundColor: '#dcfce7',
    color: '#15803d',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    border: '1px solid #bbf7d0',
  },
  footer: {
    padding: '16px 24px',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '8px',
  },
  secondaryButton: {
    padding: '10px 14px',
    backgroundColor: '#ffffff',
    color: '#475569',
    fontWeight: '600',
    fontSize: '14px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  reserveButton: {
    padding: '10px 16px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '14px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  primaryButton: {
    padding: '10px 16px',
    backgroundColor: '#1e40af',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '14px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};