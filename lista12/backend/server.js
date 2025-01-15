const express = require('express');
const cors = require('cors');
const entriesRoutes = require('./routes/entries');

const app = express();

app.use(cors());
app.use(express.json());


const connection = require('./config/database');
connection.execute(`
  CREATE TABLE IF NOT EXISTS entries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    city VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use('/api/entries', entriesRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});