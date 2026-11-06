import { useState } from 'react';
import axios from 'axios';
import { SearchBar } from './components/SearchBar';

function App() {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (query) => {
    // Si la búsqueda viene vacía tras el trim, reseteamos resultados
    if (!query) {
      setLibros([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/libros/buscar?q=${encodeURIComponent(query)}`);
      setLibros(response.data);
    } catch (error) {
      console.error('Error al consultar el catálogo:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1e293b', marginBottom: '24px' }}>Catálogo de la Biblioteca</h1>

      {/* Componente principal de la Historia de Usuario GB-05 */}
      <SearchBar onSearch={handleSearch} />

      {/* Resultados de búsqueda */}
      <div style={{ marginTop: '32px' }}>
        {loading && <p style={{ color: '#64748b' }}>Buscando recursos en el catálogo...</p>}

        {!loading && searched && libros.length === 0 && (
          <p style={{ color: '#64748b' }}>No se encontraron recursos bibliográficos que coincidan con la búsqueda.</p>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
          {libros.map((libro) => (
            <div
              key={libro.id}
              style={{
                padding: '16px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                backgroundColor: '#f8fafc'
              }}
            >
              <h3 style={{ margin: '0 0 8px 0', color: '#1e3a8a' }}>{libro.titulo}</h3>
              <p style={{ margin: '4px 0', color: '#334155' }}><strong>Autor:</strong> {libro.autor}</p>
              <p style={{ margin: '4px 0', color: '#334155' }}><strong>ISBN:</strong> {libro.isbn}</p>
              <p style={{ margin: '4px 0', color: '#64748b', fontSize: '14px' }}>
                <strong>Palabras clave:</strong> {libro.palabras_clave}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;