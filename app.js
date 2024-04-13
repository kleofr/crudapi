const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'users'
});

// Connect to MySQL
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors());

// CRUD Routes
// Get all users

// Add new user
app.post('/create', (req, res) => {
    const {id, name, email } = req.body;
    db.query('INSERT INTO users_table (id, name, email) VALUES (?, ?, ?)', [id, name, email], (err, result) => {
        if (err) throw err;
        res.send('User added successfully');
    });
});

// Get information
app.get('/read', (req, res) => {
    db.query('SELECT * FROM users_table', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// update information
app.post('/update', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users_table (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) throw err;
        res.send('User updated successfully');
    });
});

// delete information
app.post('/delete', (req, res) => {
    const { name, email } = req.body;
    db.query('INSERT INTO users_table (name, email) VALUES (?, ?)', [name, email], (err, result) => {
        if (err) throw err;
        res.send('User deleted successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
