import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <div style={styles.inputWrapper}>
        <svg
          style={styles.searchIcon}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Título, autor, ISBN o palabra clave..."
          style={styles.input}
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            style={styles.clearButton}
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" style={styles.button}>
        Buscar
      </button>
    </form>
  );
};

const styles = {
  formContainer: {
    display: 'flex',
    gap: '12px',
    width: '100%',
    maxWidth: '720px',
  },
  inputWrapper: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    width: '20px',
    height: '20px',
    color: '#64748b',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '12px 40px 12px 44px',
    fontSize: '15px',
    color: '#0f172a',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    outline: 'none',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
  },
  clearButton: {
    position: 'absolute',
    right: '12px',
    background: 'none',
    border: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    fontSize: '14px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#1e40af',
    color: '#ffffff',
    fontWeight: '600',
    fontSize: '15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(30, 64, 175, 0.2)',
  },
};