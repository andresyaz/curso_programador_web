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
    await inscriptosModel.deleteinscriptosById(id);
    res.redirect('/admin/inscriptos')
});


/* Operaciones de Agregar datos con validacion  */
router.post('/agregar', async (req, res, next) => {
    try {
    
        if (req.body.nameI != "" && req.body.emailI != "") {
            await inscriptosModel.insertarinscripto(req.body);
            
            res.redirect('/admin/inscriptos')
        } else {
            res.render('admin/inscriptos', {
                
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/inscriptos', {
          
            error: true,
            message: 'No se cargo el usuario'
        })
    }
});//cierra Get

/* ver la pagina Modificar*/
router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let inscripto = await inscriptosModel.getinscriptoById(id);   
    res.render('admin/modificarinscripto', { // modificarUsuario.hbs
        layout: 'admin/layout',
        inscripto
    })  
}); 

/* Accion modificar*/
router.post('/modificar', async (req, res, next) => {
    try {
        //console.log(req.body);
        let obj = {
            email: req.body.user,
           
        }

        await inscriptosModel.modificarInscriptoById(obj, req.body.id);
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