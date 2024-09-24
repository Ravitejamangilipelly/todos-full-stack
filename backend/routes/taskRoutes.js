const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, createTask);
router.get('/', authMiddleware, getTasks);
router.put('/:id/update', authMiddleware, updateTask);
router.delete('/:id/delete', authMiddleware, deleteTask);

module.exports = router;
