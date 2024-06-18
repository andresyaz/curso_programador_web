var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

/* operaciones de login */
router.post('/', async (req, res, next) => {
  try {
    //captura datos del formulario
    var usuario = req.body.user;
    var password = req.body.password;

    console.log(req.body);

    //los busca en la base de datos
    var data = await usuariosModel.getUserAndPassword(usuario, password);

    //variables de session
    req.session.id_usuario = data.id; //nombre de la columna
    req.session.nombre = data.user;
    
    console.log('id:'+req.session.id_usuario);

    if (data != undefined) {
      res.redirect('/admin/main');
    } else {
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      })
    }//cierre else
  } catch (error) {
    console.log(error);
  }
})

/* Destruir session */
router.get('/logout', function (req, res, next) {
  req.session.destroy(); // destruir variables de session
  res.render('admin/login', {// vuelve hacia el login.hbs
    layout: 'admin/layout'
  });
});



module.exports = router;
