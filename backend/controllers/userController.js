const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');

// Secret for JWT
const JWT_SECRET = 'your_jwt_secret';

// Signup User
exports.signup = (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = uuidv4();

    db.run(`INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`, [userId, name, email, hashedPassword], function (err) {
        if (err) {
            return res.status(400).json({ error: 'User creation failed' });
        }
        res.status(201).json({ message: 'User created successfully!' });
    });
};

// Login User
exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    });
};

// Get User Profile
exports.getProfile = (req, res) => {
    const userId = req.user.id;

    db.get(`SELECT id, name, email FROM users WHERE id = ?`, [userId], (err, user) => {
        if (err || !user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    });
};

// Update User Profile
exports.updateProfile = (req, res) => {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(`UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`, [name, email, hashedPassword, userId], function (err) {
        if (err) {
            return res.status(400).json({ error: 'Profile update failed' });
        }
        res.json({ message: 'Profile updated successfully' });
    });
};
