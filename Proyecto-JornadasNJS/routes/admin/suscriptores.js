const express = require('express');
const router = express.Router();
const suscriptoresModel = require('./../../models/suscriptoresModel');

/* GET suscriptores page. */
router.get('/', async function (req, res, next) {
 
    var suscriptores = await suscriptoresModel.getSuscriptores(); 
 
    res.render('admin/suscriptores', {
      layout: 'admin/layout',
      //suscriptor:req.session.email,
      suscriptores
    });
  });


  /* Borrar Usuario */
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await suscriptoresModel.deleteSuscriptoresById(id);
    res.redirect('/admin/suscriptores')
});

/* Ver la pagina Agregar Usuario */
router.get('/agregarSuscriptores', async (req, res, next) => {
    res.render('admin/agregarSuscriptores', { // agregar.hbs
        layout: 'admin/layout'
    })  
});//cierra Get

/* Operaciones de Agregar datos con validacion  */
router.post('/agregar', async (req, res, next) => {
    try {
        //console.log(req.body);
        if (req.body.user != "" && req.body.password != "") {
            await suscriptoresModel.insertarSuscriptor(req.body);
            
            res.redirect('/admin/suscriptores')
        } else {
            res.render('admin/agregarSuscriptores', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregarSuscriptores', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo el usuario'
        })
    }
});//cierra Get

/* ver la pagina Modificar*/
router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let suscriptor = await suscriptoresModel.getSuscriptorById(id);   
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
});//cierra Get

  
module.exports = router;