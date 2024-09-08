// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
const PORT = 4000; // Change the port if needed

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost', // Your MySQL host
    user: 'sampath',      // Your MySQL username
    password: 'Sampath@@2004',      // Your MySQL password
    database: 'education_db', // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public folder
app.use(express.static('public'));

// Route to handle contact form submissions
app.post('/contact', (req, res) => {
    const { email, message } = req.body;
    const query = 'INSERT INTO contacts (email, message) VALUES (?, ?)';
    db.query(query, [email, message], (err) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Error saving message to the database.' });
        } else {
            res.json({ message: 'Message sent successfully!' });
        }
    });
});

// Route to handle sign-up
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error hashing password:', err);
            res.status(500).json({ message: 'Error signing up.' });
            return;
        }
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        db.query(query, [name, email, hash], (err) => {
            if (err) {
                console.error('Error inserting data:', err);
                res.status(500).json({ message: 'Error signing up.' });
            } else {
                res.json({ message: 'Sign up successful!' });
            }
        });
    });
});

// Route to handle sign-in
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error querying data:', err);
            res.status(500).json({ message: 'Error signing in.' });
            return;
        }
        if (results.length === 0) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        bcrypt.compare(password, results[0].password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                res.status(500).json({ message: 'Error signing in.' });
                return;
            }
            if (result) {
                res.json({ message: 'Sign in successful!' });
            } else {
                res.status(401).json({ message: 'Invalid email or password.' });
            }
        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
