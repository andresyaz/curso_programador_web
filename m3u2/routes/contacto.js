var express = require('express');
var router = express.Router();

var nodemailer = require("nodemailer");

/* GET Contacto page. */
router.get('/', function(req, res, next) {
  res.render('contacto', { title: 'Contacto' });
});

/* Motor del Formulario. */
router.post('/', async(req,res,next)=> {

    console.log(req.body.nombre);

    var nombre = req.body.nombre;
    var email = req.body.email;
    var tel = req.body.tel;
    var mensaje = req.body.mensaje;


    var obj = {
        to: 'andresyaz@gmail.com',
        subject: 'Desde Contacto',
        html: nombre + " se contacto a traves de la web, nos dejo su email: " + email + ". <br> Ademas nos envia el mensaje: "+ mensaje +". <br> Su tel es: " + tel 
    }

    var transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

    var info = await transport.sendMail(obj);

    res.render('contacto', {
        message:'Mensaje enviado correctamente!!'
    });

});

module.exports = router;
