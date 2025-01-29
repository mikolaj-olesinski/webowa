const express = require('express');
const router = express.Router();
const connection = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

// Pobieranie harmonogramów dla konkretnego dnia
router.get('/:day', async (req, res) => {
  try {
    const [rows] = await connection.promise().query(
      'SELECT * FROM schedules WHERE day = ? ORDER BY start_time', 
      [req.params.day]
    );
    
    await fs.writeFile(
      path.join(__dirname, '../schedules.json'),
      JSON.stringify(rows, null, 2)
    );
    
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Dodawanie nowego przedmiotu do harmonogramu
router.post('/', async (req, res) => {
  const { day, name, startTime, duration } = req.body;
  
  try {
    await connection.promise().execute(
      'INSERT INTO schedules (day, subject_name, start_time, duration) VALUES (?, ?, ?, ?)',
      [day, name, startTime, duration]
    );
    
    const [rows] = await connection.promise().query(
      'SELECT * FROM schedules WHERE day = ? ORDER BY start_time', 
      [day]
    );
    
    await fs.writeFile(
      path.join(__dirname, '../schedules.json'),
      JSON.stringify(rows, null, 2)
    );
    
    res.json({ message: 'Przedmiot został dodany' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Usuwanie przedmiotu z harmonogramu
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await connection.promise().query(
      'SELECT day FROM schedules WHERE id = ?', 
      [req.params.id]
    );
    
    const day = result[0].day;
    
    await connection.promise().execute(
      'DELETE FROM schedules WHERE id = ?',
      [req.params.id]
    );
    
    const [rows] = await connection.promise().query(
      'SELECT * FROM schedules WHERE day = ? ORDER BY start_time', 
      [day]
    );
    
    await fs.writeFile(
      path.join(__dirname, '../schedules.json'),
      JSON.stringify(rows, null, 2)
    );
    
    res.json({ message: 'Przedmiot został usunięty' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// Backend (Express.js)
router.put('/:id', async (req, res) => {
  const { name, startTime, duration } = req.body;
  try {
    await connection.promise().execute(
      'UPDATE schedules SET subject_name = ?, start_time = ?, duration = ? WHERE id = ?',
      [name, startTime, duration, req.params.id]
    );

    const [rows] = await connection.promise().query(
      'SELECT * FROM schedules WHERE day = ? ORDER BY start_time',
      [req.body.day]
    );

    await fs.writeFile(
      path.join(__dirname, '../schedules.json'),
      JSON.stringify(rows, null, 2)
    );

    res.json({ message: 'Przedmiot został zaktualizowany' });
  } catch (error) {
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

module.exports = router;