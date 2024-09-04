// import { DatabaseSync } from 'node:sqlite';
// const database = new DatabaseSync(':memory:');

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require('better-sqlite3')('database.db');

const app = express()
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

app.get('/',(req, res) => {
    const movies = {
        id: 1,
        title: "Akeelah and the Bee",
        year: 1994,
        genre: "Drama",
    }
    res.json(movies)
    // res.send('Hello Everyone!')
})

app.get('/test', (req, res) =>{
    // res.send('Hello Everyone!')
})

// Create the table
const createTable = () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER
        )
    `;
    db.prepare(sql).run();
};
createTable();

// Insert a new user
app.post('/users', (req, res) => {
    const { name, age } = req.body;
    const sql = `
        INSERT INTO user (name, age)
        VALUES (?, ?)
    `;
    const info = db.prepare(sql).run(name, age);
    res.status(201).json({ id: info.lastInsertRowid });
});

// Get all users
app.get('/users', (req, res) => {
    const sql = `
        SELECT * FROM user
    `;
    const rows = db.prepare(sql).all();
    res.json(rows);
});

// Get a user by id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        SELECT * FROM user
        WHERE id = ?
    `;
    const row = db.prepare(sql).get(id);
    if (row) {
        res.json(row);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Update a user by id
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const sql = `
        UPDATE user
        SET name = ?, age = ?
        WHERE id = ?
    `;
    const info = db.prepare(sql).run(name, age, id);
    if (info.changes > 0) {
        res.json({ message: 'User updated successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete a user by id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = `
        DELETE FROM user
        WHERE id = ?
    `;
    const info = db.prepare(sql).run(id);
    if (info.changes > 0) {
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});




app.listen(5000, () => {
    console.log(`Server running on http://localhost:${5000}`);
  });