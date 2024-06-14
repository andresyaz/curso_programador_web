var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Proyecto Jornadas' });
});

/* FORMULARIO DE CONTACTO */

router.post('/', async (req, res, next) => { //funcion asincronica

  console.log(req.body.name);
  
  var name = req.body.name;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;
 
  var obj = {
    to: 'andresyaz@gmail.com',
    subject:'Contacto desde Jornadas',
    html: 'Asunto: '+ subject +'<br>'+ name + ' ' + 'se contacto desde su correo '+ email +
    '<br> nos envia el siguiente mensaje: <br> '+ message,

  } // cierra el obj

  var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  }) // cierrael transporter

  var info = await transporter.sendMail(obj);

  res.render('index',{
    messageOK:'Mensaje enviado correctamente!',
  });



});




module.exports = router;
