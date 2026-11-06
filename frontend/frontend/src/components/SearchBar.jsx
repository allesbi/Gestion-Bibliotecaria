import { useState } from 'react';

export const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aplicar trimming para eliminar espacios al inicio y final
    const cleanedTerm = searchTerm.trim();
    onSearch(cleanedTerm);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '600px' }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Título, autor, ISBN o palabra clave"
        style={{
          flex: 1,
          padding: '10px 14px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 20px',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Buscar
      </button>
    </form>
  );
};