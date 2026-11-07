const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Endpoint: GET /api/v1/libros/buscar?q={query}
app.get('/api/v1/libros/buscar', async (req, res) => {
  try {
    const { q } = req.query;

    if (q === undefined || q === null || q.trim() === '') {
      const allBooks = await pool.query(
        'SELECT id, titulo, autor, isbn, palabras_clave, descripcion FROM libros ORDER BY id ASC'
      );
      return res.json(allBooks.rows);
    }

    const searchTerm = `%${q.trim()}%`;
    const queryText = `
      SELECT id, titulo, autor, isbn, palabras_clave, descripcion 
      FROM libros 
      WHERE titulo ILIKE $1 
         OR autor ILIKE $1 
         OR isbn ILIKE $1 
         OR palabras_clave ILIKE $1
         OR descripcion ILIKE $1
      ORDER BY id ASC
    `;

    const result = await pool.query(queryText, [searchTerm]);
    return res.json(result.rows);

  } catch (error) {
    console.error('Error al consultar libros:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
});

// Endpoint: POST /api/v1/prestamos (Solicitar Préstamo de un libro)
app.post('/api/v1/prestamos', async (req, res) => {
  try {
    const { libro_id } = req.body;

    if (!libro_id) {
      return res.status(400).json({ mensaje: 'El ID del libro es requerido' });
    }

    const newLoan = await pool.query(
      'INSERT INTO prestamos (libro_id) VALUES ($1) RETURNING *',
      [libro_id]
    );

    return res.status(201).json({
      mensaje: 'Préstamo solicitado exitosamente',
      prestamo: newLoan.rows[0]
    });
  } catch (error) {
    console.error('Error al solicitar préstamo:', error);
    return res.status(500).json({ mensaje: 'Error interno al registrar el préstamo' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});