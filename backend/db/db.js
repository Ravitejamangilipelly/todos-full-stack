const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/todo.db', (err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to SQLite database.');
    }
});

db.serialize(() => {
    // Create Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )`);

    // Create Tasks table
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        userId TEXT,
        title TEXT,
        description TEXT,
        status TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
    )`);
});

module.exports = db;
