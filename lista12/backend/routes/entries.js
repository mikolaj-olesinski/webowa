const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

// Pobierz wszystkie wpisy
router.get('/', async (req, res) => {
  try {
    const { search, sortBy, sortOrder } = req.query;
    let query = 'SELECT * FROM entries';
    
    if (search) {
      query += ` WHERE name LIKE '%${search}%' 
                 OR email LIKE '%${search}%' 
                 OR city LIKE '%${search}%'`;
    }
    
    if (sortBy) {
      query += ` ORDER BY ${sortBy} ${sortOrder || 'ASC'}`;
    }
    
    const [rows] = await connection.promise().query(query);
    
    await fs.writeFile(
      path.join(__dirname, '../data.json'),
      JSON.stringify(rows, null, 2)
    );
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Dodaj nowy wpis
router.post('/', async (req, res) => {
  const { name, email, birthDate, city } = req.body;
  
  try {
    await connection.promise().execute(
      'INSERT INTO entries (name, email, birth_date, city) VALUES (?, ?, ?, ?)',
      [name, email, birthDate, city]
    );
    
    const [rows] = await connection.promise().query('SELECT * FROM entries');
    await fs.writeFile(
      path.join(__dirname, '../data.json'),
      JSON.stringify(rows, null, 2)
    );
    
    res.json({ message: 'Dane zostały zapisane' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Usuń wpis
router.delete('/:id', async (req, res) => {
  try {
    await connection.promise().execute(
      'DELETE FROM entries WHERE id = ?',
      [req.params.id]
    );
    
    const [rows] = await connection.promise().query('SELECT * FROM entries');
    await fs.writeFile(
      path.join(__dirname, '../data.json'),
      JSON.stringify(rows, null, 2)
    );
    
    res.json({ message: 'Wpis został usunięty' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

module.exports = router;