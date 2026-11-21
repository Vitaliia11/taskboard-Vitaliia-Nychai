const path = require('path');
const express = require('express');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const session = require('express-session');
const { requireAuth } = require('./middleware/auth');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boards');
const tasksRouter = require('./routes/tasks');

const app = express();
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use('/api/auth', authRouter);
app.use('/api/users', requireAuth, usersRouter);
app.use('/api/boards', requireAuth, boardsRouter);
app.use('/api/tasks', requireAuth, tasksRouter);

app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

app.use(express.static(path.join(__dirname)));

app.listen(3000, () => console.log('Serwer: http://localhost:3000'));