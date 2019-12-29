const express = require('express');
const router = express.Router();

const pool = require('../database');

//Añadir link a DB 
router.get('/add', (req, res) => {
    res.render('links/add');
});


router.post('/add', async (req, res) => {
    const {tittle, url, description} = req.body;
    const newLink = {
        tittle,
        url,
        description
    }
    await pool.query('INSERT INTO links set ?', [newLink]);
    res.send('Link agregado');	
});


//INTENTO DE REGISTRO
router.get('/signup', (req, res) => {
    res.render('links/signup');
    });
    
    router.post('/signup', async (req, res) => {
        const {username,fullname, password} = req.body;
        const newUser = {
          username,
          fullname,
          password
        }
    
        await pool.query('INSERT INTO users set ?', [newUser]);
        res.send('Registrado correctamente');	
    });

module.exports = router;
