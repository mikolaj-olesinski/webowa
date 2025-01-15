const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

// Pobierz wszystkie wpisy
router.get('/', async (req, res) => {
  try {
    const [rows] = await connection.promise().query('SELECT * FROM entries');
    
    // Zapisz do pliku JSON
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
  const { name, email } = req.body;
  
  try {
    await connection.promise().execute(
      'INSERT INTO entries (name, email) VALUES (?, ?)',
      [name, email]
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

module.exports = router;