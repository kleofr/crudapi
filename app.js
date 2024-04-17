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
app.post('/login', (req,res)=> {
    const { username, password } = req.body;
    db.query('SELECT * FROM users_login WHERE username = ? AND password = ?', [username, password], (err, result) => {
        // Check if any rows were affected (if user with given ID existed)
        if(err) throw err;
        if (result.affectedRows === 0) {
            res.status(404).send('User with provided ID not found');
            return;
        }
        res.status(200).send('User logged in Successfully');
    })
})
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
    const { id, name, email } = req.body;
    // Check if ID, name, and email are provided
    if (!id || !name || !email) {
        res.status(400).send('ID, name, and email are required for updating user');
        return;
    }
    // Execute SQL query to update user data
    db.query('UPDATE users_table SET name = ?, email = ? WHERE id = ?', [name, email, id], (err, result) => {
        if (err) {
            res.status(500).send('Error updating user');
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('User with provided ID not found');
            return;
        }
        res.send('User updated successfully');
    });
});

// delete information
app.post('/delete', (req, res) => {
    const { id } = req.body;
    // Check if ID is provided
    if (!id) {
        res.status(400).send('ID is required for deleting user');
        return;
    }
    // Execute SQL query to delete user data
    db.query('DELETE FROM users_table WHERE id = ?', [id], (err, result) => {
        if (err) {
            res.status(500).send('Error deleting user');
            return;
        }
        // Check if any rows were affected (if user with given ID existed)
        if (result.affectedRows === 0) {
            res.status(404).send('User with provided ID not found');
            return;
        }
        res.send('User deleted successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
