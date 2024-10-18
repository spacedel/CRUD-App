// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // to parse JSON bodies

// GET all items
app.get('/api/items', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM items ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET single item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM items WHERE id = $1', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST new item
app.post('/api/items', async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = await db.query(
      'INSERT INTO items (name) VALUES ($1) RETURNING *',
      [name]
    );
    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update item
app.put('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await db.query('UPDATE items SET name = $1 WHERE id = $2', [name, id]);
    res.send('Item was updated!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM items WHERE id = $1', [id]);
    res.send('Item was deleted!');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
