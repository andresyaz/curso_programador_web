const express = require('express');
const router = express.Router();
const suscriptoresModel = require('./../models/suscriptoresModel');

/* GET users listing. *
router.get('/', function(req, res, next) {
    res.send('suscripciones');
  });
*/

router.post('/', async (req, res, next) => {

    const emailI = req.body.email;
    // Creo el objeto inscripto
    const suscriptor = {

        Email: emailI,

    };

    console.log(suscriptor);

    // Validar los datos del formulario
    if (!emailI) {
        // Redireccionar con un mensaje de error si la validación falla
        return res.render('index', { error: 'Todos los campos son obligatorios.' });
    }
    //conecta con la DB
    await suscriptoresModel.insertarSuscriptor(suscriptor);

    res.render('index', { error: null });





});//cierra Get

module.exports = router;