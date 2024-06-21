var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config(); // utiliza el .env
var session = require('express-session');

// RUTAS SIN SESSION
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inscripcionesRouter= require('./routes/inscripciones'); // inscripciones.js
var suscripcionesRouter= require('./routes/suscripciones'); // suscripciones.js

// RUTAS INTERNAS CON SESSION
var loginRouter = require('./routes/admin/login');
var mainRouter = require('./routes/admin/main');

var usuariosRouter = require('./routes/admin/usuarios');
var modificarUsuarioRouter = require('./routes/admin/usuarios');

var inscriptosRouter = require('./routes/admin/inscriptos');
var modificarInscriptoRouter = require('./routes/admin/usuarios');
 
var suscriptoresRouter = require('./routes/admin/suscriptores');
var modificarSuscriptorRouter = require('./routes/admin/usuarios');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'123456789abcdefg',
  resave:false,
  saveUninitialized:true
}))

secured = async (req, res, next) => {
  try {
    console.log(req.session.id.usuario);
    if (req.session.id_usuario) { 
      next(); 
    } else { 
      res.redirect('/admin/login') 
    }
  } catch (error) { 
    console.log(error); 
  }
}


app.use('/', indexRouter);
// Desde el los formularios de Inscripcion y Formulario de Suscripcion
app.use('/inscripciones', inscripcionesRouter);
app.use('/suscripciones', suscripcionesRouter);

app.use('/users', usersRouter);

app.use('/admin/login', loginRouter); //llama al admin/login.js
app.use('/admin/main', secured, mainRouter);

app.use('/admin/usuarios', secured, usuariosRouter);
app.use('/admin/modificarUsuario', secured, modificarUsuarioRouter);

app.use('/admin/inscriptos', secured, inscriptosRouter);
app.use('/admin/modificarInscripto', secured, modificarInscriptoRouter);

app.use('/admin/suscriptores', secured, suscriptoresRouter);
app.use('/admin/modificarSuscriptor', secured, modificarSuscriptorRouter);
 



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
