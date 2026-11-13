const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:id', async (req, res) => {
    try {
        const [tasks] = await pool.query(
            'SELECT * FROM tasks WHERE id = ? AND isDeleted = 0',
            [req.params.id]
        );
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'Zadanie nie istnieje' });
        }
        res.json(tasks[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, description, status, priority, deadline, boardId, assigneeId } = req.body;

        if (!title || title.trim().length < 3 || title.trim().length > 100) {
            return res.status(400).json({ error: 'Nieprawidłowy tytuł' });
        }

        const ALLOWED_STATUSES = ['todo', 'in_progress', 'done'];
        const taskStatus = status || 'todo';
        if (!ALLOWED_STATUSES.includes(taskStatus)) {
            return res.status(400).json({ error: 'Nieprawidłowy status' });
        }

        const ALLOWED_PRIORITIES = ['low', 'medium', 'high'];
        if (priority && !ALLOWED_PRIORITIES.includes(priority)) {
            return res.status(400).json({ error: 'Nieprawidłowy priorytet' });
        }

        const [boards] = await pool.query(
            'SELECT id FROM boards WHERE id = ? AND isDeleted = 0',
            [boardId]
        );
        if (boards.length === 0) {
            return res.status(400).json({ error: 'Wybrana tablica nie istnieje' });
        }

        const [result] = await pool.query(
            `INSERT INTO tasks (title, description, status, priority, deadline, boardId, assigneeId) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [title.trim(), description, taskStatus, priority || 'low', deadline || null, boardId, assigneeId || null]
        );

        res.status(201).json({ id: result.insertId, message: 'Utworiono zadanie' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, description, status, priority, deadline, assigneeId } = req.body;
        
        const [tasks] = await pool.query('SELECT id FROM tasks WHERE id = ? AND isDeleted = 0', [req.params.id]);
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'Zadanie nie istnieje' });
        }

        if (title && (title.trim().length < 3 || title.trim().length > 100)) {
            return res.status(400).json({ error: 'Nieprawidłowy tytuł' });
        }

        await pool.query(
            `UPDATE tasks SET title = COALESCE(?, title), description = COALESCE(?, description), 
             status = COALESCE(?, status), priority = COALESCE(?, priority), 
             deadline = COALESCE(?, deadline), assigneeId = COALESCE(?, assigneeId) WHERE id = ?`,
            [title, description, status, priority, deadline, assigneeId, req.params.id]
        );

        res.json({ message: 'Zaktualizowano zadanie' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const [tasks] = await pool.query('SELECT id FROM tasks WHERE id = ? AND isDeleted = 0', [req.params.id]);
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'Zadanie nie istnieje' });
        }

        await pool.query(
            'UPDATE tasks SET isDeleted = 1, deletedAt = NOW() WHERE id = ?',
            [req.params.id]
        );

        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;