const { v4: uuidv4 } = require('uuid');
const db = require('../db/db');

// Create Task
exports.createTask = (req, res) => {
    const { title, description, status } = req.body;
    const taskId = uuidv4();
    const userId = req.user.id;

    db.run(`INSERT INTO tasks (id, userId, title, description, status) VALUES (?, ?, ?, ?, ?)`, [taskId, userId, title, description, status], function (err) {
        if (err) {
            return res.status(400).json({ error: 'Failed to create task' });
        }
        res.status(201).json({ message: 'Task created successfully!' });
    });
};

// Get All Tasks
exports.getTasks = (req, res) => {
    const userId = req.user.id;

    db.all(`SELECT * FROM tasks WHERE userId = ?`, [userId], (err, tasks) => {
        if (err) {
            return res.status(400).json({ error: 'Failed to retrieve tasks' });
        }
        res.json(tasks);
    });
};

// Update Task
exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    db.run(`UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`, [title, description, status, id], function (err) {
        if (err) {
            return res.status(400).json({ error: 'Task update failed' });
        }
        res.json({ message: 'Task updated successfully' });
    });
};

// Delete Task
exports.deleteTask = (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
        if (err) {
            return res.status(400).json({ error: 'Failed to delete task' });
        }
        res.json({ message: 'Task deleted successfully' });
    });
};
