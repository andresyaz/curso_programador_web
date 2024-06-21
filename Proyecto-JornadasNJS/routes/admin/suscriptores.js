const express = require('express');
const router = express.Router();
const suscriptoresModel = require('./../../models/suscriptoresModel');

/* GET suscriptores page. Listar en pagina suscriptores */
router.get('/', async function (req, res, next) {
    var suscriptores = await suscriptoresModel.getSuscriptores(); 
    res.render('admin/suscriptores', {
      layout: 'admin/layout',
      suscriptores
    });
});

 /* Borrar Suscriptor */
router.get('/eliminar/:idSuscriptor', async (req, res, next) => {
    var idSuscriptor = req.params.idSuscriptor;
    await suscriptoresModel.deleteSuscriptorById(idSuscriptor);
    res.redirect('/admin/suscriptores')
});

/* Operaciones de Agregar datos con validacion  */
router.post('/agregar', async (req, res, next) => {
    try {
        //console.log(req.body);
        if (req.body.Email != "") {
            await suscriptoresModel.insertarSuscriptor(req.body);
            res.redirect('/admin/suscriptores')
        } else {
            res.render('/admin/suscriptores', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
          res.render('admin/suscriptores', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo el usuario'
        })
    }
});

/* ver la pagina Modificar*/
router.get('/modificar/:idSuscriptor', async (req, res, next) => {
    let idSuscriptor = req.params.idSuscriptor;
    let suscriptor = await suscriptoresModel.getSuscriptorById(idSuscriptor);   
    res.render('admin/modificarSuscriptor', { // modificarUsuario.hbs
        layout: 'admin/layout',
        suscriptor
    })  
}); 

/* Accion modificar*/
router.post('/modificar', async (req, res, next) => {
    try {
        //console.log(req.body);
        let obj = {
            email: req.body.user,
           
        }

        await suscriptoresModel.modificarSuscriptorById(obj, req.body.id);
        res.redirect('/admin/suscriptores');

    } catch (error) {
        console.log(error);
        res.render('admin/modificarSuscriptor', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico el suscriptor'
        })
    }
});
  
module.exports = router;