var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); //variables de session

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Sessiones
app.use(session({
  secret: '123456789abcdefghi',
  resave: false,
  saveUninitialized: true
}));


//Ruteos

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// Sessiones

app.get('/', function (req, res, next) {
  var conocido = Boolean(req.session.nombre);

  res.render('index', {
    title: 'Sessiones en Express.js',
    conocido: conocido,
    nombre: req.session.nombre
  });
});

app.post('/ingresar', function (req, res, next) {
  if (req.body.nombre) {
    req.session.nombre = req.body.nombre
  }
  res.redirect('/');
});

app.get('/salir', function (req, res, next) {
    req.session.destroy();
    res.redirect('/');
});


/* Ejemplo de Middleware
Las funciones middleware suelen ser utilizadas como mecanismo para verificar                   
niveles de acceso antes de entrar en una ruta, manejo de errores, validación de                           
datos, etc.
 */
app.use(function (req, res, next){
  // si no existe la variable de sesion vistas la guarda como objeto vacio
  if (!req.session.vistas) {
    req.session.vistas = {};
  }
//busca si hay una clave en session.vistas igual a la url actual 
  if (!req.session.vistas[req.originalUrl]) {
    req.session.vistas[req.originalUrl] = 1; //no existe le da valor 1
  } else {
    req.session.vistas[req.originalUrl]++; // si existe la incrementa
  }
  console.log(req.session.vistas);
  next();
});

app.get('/pagina1', function (req, res) {
  res.render('pagina', {
    nombre: 'pagina1',
    vistas: req.session.vistas[req.originalUrl]
  });

});



















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
