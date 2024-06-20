const express = require('express');
const router = express.Router();
const inscriptosModel = require('./../models/inscriptosModel');

/* GET users listing.  
router.post('/', function(req, res, next) {
    res.send('inscripciones');
  });
*/
router.post('/', async (req, res, next) => {

    const { nameI, emailI, typeI } = req.body;

  // Creo el objeto inscripto
  const inscripto = {
    nombre: nameI,
    email: emailI,
    tipo: typeI
};
/*
try {
    const result = await insertarInscripto(inscripto);
    res.status(201).json({ message: 'Inscripción exitosa', result });
} catch (error) {
    res.status(500).json({ message: 'Error al inscribir', error });
}
    

 */
console.log(inscripto);
     
         // Validar los datos del formulario
        if (!inscripto.nombre || !inscripto.email || !inscripto.tipo) {
            // Redireccionar con un mensaje de error si la validación falla
            return res.render('index', { error: 'Todos los campos son obligatorios.' });
        }
        //conecta con la DB
        await inscriptosModel.insertarInscripto(inscripto);

        res.render('index', { error: null });

       
            
        
    
});//cierra Get

module.exports = router;