const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    // Create orders table
    db.run(`CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      phone TEXT NOT NULL,
      wilaya TEXT NOT NULL,
      baladiya TEXT NOT NULL,
      modelId TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// API Routes
app.post('/api/orders', (req, res) => {
  const { fullName, phone, wilaya, baladiya, modelId } = req.body;
  
  const sql = `INSERT INTO orders (fullName, phone, wilaya, baladiya, modelId) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [fullName, phone, wilaya, baladiya, modelId], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID, message: 'Order placed successfully' });
  });
});

app.get('/api/orders', (req, res) => {
  const sql = `SELECT * FROM orders ORDER BY createdAt DESC`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ orders: rows });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
