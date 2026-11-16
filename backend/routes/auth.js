const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/register', async(req, res, next) =>{
    try{
        const { login, password, firstName, lastName } = req.body;
        if (!login || !firstName || !lastName || !password || password.length < 8){
            return res.status(400).json({ error:'Uzupełnij wszystkie pola, hasło min.8 znaków'});
        }
        const[exists] = await pool.query('SELECT id FROM users WHERE login = ?',[login]);
        if (exists.length > 0){
            return res.status(409).json({ error: 'Ten login jest już zajęty'});
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (login, passwordHash, firstName, lastName) VALUES (?, ?, ?, ?)',
            [login, passwordHash, firstName, lastName]
        );
        req.session.userId = result.insertId;
        res.status(201).json({ id: result.insertId, login, firstName, lastName});
    } catch(err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const {login, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM users WHERE login = ?',[login]);
        const user = rows[0];
        if (!user || !(await bcrypt.compare(password || ", user.passwordHash"))) {
            return res.status(401).json({ error: 'Nieprawidłowy login lub hasło'});
        }
        req.session.userId = user.id;
        res.json({ id: user.id, login: user.login, firstName: user.firstName, lastName: user.lastName});
    } catch (err) {
        next(err);
    }
});

router.post('/logout', async (req, res, next) => {
    req.session.destroy((err) => {
        if (err) return next(err);
        res.status(204).end(); 
    });
});

router.get('/me', requireAuth, async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT id, login, firstName, lastName FROM users WHERE id = ?', [req.session.userId]);
        const user = rows[0];
        if (!user) {
            return res.status(404).json({ error: 'Użytkownik nie został znaleziony' });
        }
        res.json(user);
    } catch (err) {
        next(err);
    }
});

module.exports = router;