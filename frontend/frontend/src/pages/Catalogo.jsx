import { useState, useEffect } from 'react';
import axios from 'axios';
import { SearchBar } from '../components/SearchBar';
import { BookCard } from '../components/Bookcard';

export const Catalogo = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  // Carga inicial y consulta al backend
  const fetchLibros = async (query = '') => {
    setLoading(true);
    const cleanQuery = query.trim();
    setLastQuery(cleanQuery);

    try {
      // Si hay término de búsqueda se envía ?q=..., de lo contrario se consulta /buscar para obtener todo
      const url = cleanQuery !== ''
        ? `http://localhost:5000/api/v1/libros/buscar?q=${encodeURIComponent(cleanQuery)}`
        : `http://localhost:5000/api/v1/libros/buscar`;

      const response = await axios.get(url);
      setLibros(response.data);
    } catch (error) {
      console.error('Error al consultar el catálogo:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar catálogo completo por defecto al renderizar el componente
  useEffect(() => {
    fetchLibros('');
  }, []);

  const handleSearch = (query) => {
    fetchLibros(query);
  };

  return (
    <div style={styles.layout}>
      {/* Sidebar Lateral */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>📚</div>
          <h2 style={styles.logoTitle}>BiblioTech</h2>
        </div>
        <nav style={styles.nav}>
          <a href="#catalogo" style={{ ...styles.navItem, ...styles.navItemActive }}>
            🔍 Catálogo Principal
          </a>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.pageTitle}>Catálogo Bibliográfico</h1>
            <p style={styles.pageSubtitle}>
              Explora todos los recursos disponibles o filtra mediante la barra de búsqueda.
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </header>

        <section style={styles.resultsContainer}>
          <div style={styles.resultsHeader}>
            <h3 style={styles.resultsSummary}>
              {lastQuery ? (
                <>Resultados para: <span style={styles.queryHighlight}>"{lastQuery}"</span></>
              ) : (
                'Todos los libros disponibles'
              )}
            </h3>
            <span style={styles.badgeCount}>{libros.length} recursos encontrados</span>
          </div>

          {loading && (
            <div style={styles.stateContainer}>
              <p style={{ color: '#64748b' }}>Consultando base de datos...</p>
            </div>
          )}

          {!loading && libros.length === 0 && (
            <div style={styles.stateContainer}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📭</div>
              <p style={styles.emptyTitle}>Sin resultados</p>
              <p style={styles.emptySubtitle}>
                No se encontraron recursos que coincidan con <strong>"{lastQuery}"</strong>. Intenta con otro término.
              </p>
            </div>
          )}

          {!loading && libros.length > 0 && (
            <div style={styles.grid}>
              {libros.map((libro) => (
                <BookCard key={libro.id} libro={libro} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

const styles = {
  layout: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#0f172a',
    color: '#ffffff',
    padding: '24px 16px',
    display: 'flex',
    flexDirection: 'column',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    paddingLeft: '8px',
  },
  logoIcon: {
    fontSize: '24px',
  },
  logoTitle: {
    fontSize: '20px',
    fontWeight: '700',
    margin: 0,
    color: '#38bdf8',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  navItem: {
    color: '#94a3b8',
    textDecoration: 'none',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '500',
  },
  navItemActive: {
    backgroundColor: '#1e293b',
    color: '#ffffff',
  },
  main: {
    flex: 1,
    padding: '32px 48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    borderBottom: '1px solid #e2e8f0',
    paddingBottom: '24px',
  },
  pageTitle: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 4px 0',
  },
  pageSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  resultsSummary: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#334155',
    margin: 0,
  },
  queryHighlight: {
    color: '#2563eb',
  },
  badgeCount: {
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
    padding: '4px 12px',
    borderRadius: '16px',
    fontSize: '13px',
    fontWeight: '600',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '20px',
  },
  stateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '64px 0',
    textAlign: 'center',
  },
  emptyTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#334155',
    margin: '0 0 4px 0',
  },
  emptySubtitle: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
    maxWidth: '400px',
  },
};