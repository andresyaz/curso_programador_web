var express = require('express');
var router = express.Router();
var inscriptosModel = require('./../../models/inscriptosModel');

/* GET inscriptos page. */
router.get('/', async function (req, res, next) {
 
    var inscriptos = await inscriptosModel.getInscriptos(); 
 
    res.render('admin/inscriptos', {
      layout: 'admin/layout',
      inscriptos
    });
  });


  /* Borrar Inscrito */
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await inscriptosModel.deleteInscriptoById(id);
    res.redirect('/admin/inscriptos')
});


/* Operaciones de Agregar datos con validacion  */
router.post('/agregar', async (req, res, next) => {
    try {
    
        if (req.body.nameI != "" && req.body.emailI != "") {

            let obj = {
                nombre: req.body.nameI,
                email: req.body.emailI,
                tipo: req.body.typeI
            }

            await inscriptosModel.insertarInscripto(obj);
            
            res.redirect('/admin/inscriptos');

        } else {
            res.render('admin/inscriptos', {
                layout: 'admin/layout',
                error: true,
                message: 'Todos los campos son requeridos'
            });
        }
    } catch (error) {
        console.log(error);
        res.render('admin/inscriptos', {
            layout: 'admin/layout',
            error: true,
            message: 'No se cargo el usuario'
        })
    }
});//cierra Get

/* ver la pagina Modificar*/
router.get('/modificar/:idInscripto', async (req, res, next) => {
    let idInscripto = req.params.idInscripto;
    let inscripto = await inscriptosModel.getInscriptoById(idInscripto);   
    res.render('admin/modificarInscripto', { // modificarUsuario.hbs
        layout: 'admin/layout',
        inscripto
    })  
}); 

/* Accion modificar*/
router.post('/modificar', async (req, res, next) => {
    try {
        //console.log(req.body);
        let obj = {
            nombre: req.body.nameI,
            email: req.body.emailI,
            tipo: req.body.typeI
        }

        await inscriptosModel.modificarInscriptoById(obj, req.body.idInscripto);
        res.redirect('/admin/inscriptos');

    } catch (error) {
        console.log(error);
        res.render('admin/modificarInscripto', {
            layout: 'admin/layout',
            error: true,
            message: 'No se modifico el inscripto'
        })
    }
});//cierra Get

  
module.exports = router;