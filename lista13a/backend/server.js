const express = require('express');
const cors = require('cors');
const schedulesRoutes = require('./routes/schedules');

const app = express();

app.use(cors());
app.use(express.json());

const connection = require('./config/database');

connection.execute(`
  CREATE TABLE IF NOT EXISTS schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day VARCHAR(20) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    start_time VARCHAR(10) NOT NULL,
    duration INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use('/api/schedules', schedulesRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});