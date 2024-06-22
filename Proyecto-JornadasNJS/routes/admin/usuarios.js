var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* GET usuarios page. */
router.get('/', async function (req, res, next) {
 
    var usuarios = await usuariosModel.getUsuarios(); 
     res.render('admin/usuarios', {
      layout: 'admin/layout',
      usuario:req.session.nombre,
      usuarios
    });
  });

  /* Borrar Usuario */
router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await usuariosModel.deleteUsuarioById(id);
    res.redirect('/admin/usuarios')
});

/* Ver la pagina Agregar Usuario  
router.get('/agregarUsuario', async (req, res, next) => {
    res.render('admin/agregarUsuario', { // agregar.hbs
        layout: 'admin/layout'
    })  
});*/

/* Operaciones de Agregar datos con validacion  */
router.post('/agregar', async (req, res, next) => {
    try {
            if (req.body.user != "" && req.body.password != "") {
            await usuariosModel.insertarUsuario(req.body);
            res.redirect('/admin/usuarios')
        } else {
            res.render('admin/usuarios', {
                error: true,
                message: 'Todos los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/usuarios', {
            error: true,
            message: 'No se cargo el usuario'
        })
    }
});

/* busca datos a modificar*/
router.get('/modificar/:id', async (req, res, next) => {
    let id = req.params.id;
    let usuario = await usuariosModel.getUsuarioById(id);   
 
// enviar datos a la vista
 
    res.render('admin/modificarUsuario', { // modificarUsuario.hbs
        layout: 'admin/layout',
        usuario
    });  
 
/*para cargar en el modal de modificar
      res.render('admin/usuarios', {
      layout: 'admin/layout',
      usuario
    });
      */

}); 

/* Accion modificar*/
router.post('/modificar', async (req, res, next) => {
    try {
      
        let obj = {
            user: req.body.user,
            password: req.body.password
        }

        await usuariosModel.modificarUsuarioById(obj, req.body.id);
        res.redirect('/admin/usuarios');

    } catch (error) {
        console.log(error);
        res.render('admin/modificarUsuario', {
            layout: 'admin/layout',
            error: true, message: 'No se modifico el usuario'
        });
    }
});//cierra Get
  
module.exports = router;