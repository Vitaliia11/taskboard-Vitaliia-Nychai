const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async(req, res, next) =>{
    try{
        const[rows] = await pool.query(
            'SELECT id, name, description, ownerld, createdAt FROM boards WHERE isDeleted=0'
        );
        res.json(rows);

    } catch (err){
        next(err);
    }
});


router.post('/', async(req, res, next) =>{
    try{
        const name = (req.body.name || '').trim();
        if (name.length<1|| name.length > 80){
            return res.status(400).json({error:'Nazwa masi miec od 1 do 80 znakow'});
        }
        const ownerld = 1;// do poniedzialku 3 na sztywno, potem z sesji
        const [result]=await pool.query(
            'INSERT INTO boards (name, description, ownerld) VALUES (?,?,?)',
            [name, req.body.description || null, ownerld]
        );
        res.status(201).json({id: result.insertld, name});
    } catch(err) {
        next(err);
    }

try {
    const [result] = await pool.query(
        'UPDATE boards SET isDELETED=1, deletesAt = NOW() WHERE id =? AND isDeleted=0',
        [req.params.id]
    );
    if (result.affectedRows===0){
        return res.status(404).json({error: 'Nie znaleziono tablicy'});
    }
    res.status(204).end();
    }catch(err) {
        next(err);
    }

});

module.exports = router;