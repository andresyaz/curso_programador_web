var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('USERS!! probando manejadores de rutas');
});

module.exports = router;
