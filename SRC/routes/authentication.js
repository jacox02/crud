const express = require('express');
const router = express.Router();
const passport = require('passport');
//REGISTRO -Muestra de formulario
router.get('/signup', async (req, res) => {
    res.render('auth/signup');
});

//Registro -OBTENCION DE DATOS
    router.post('/signup', passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

router.get('/profile', (req, res) => {
    res.send('THIS IS YOUR PROFILE');
});

module.exports = router; 