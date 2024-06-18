var express = require('express');
var router = express.Router();

/* GET main page. */
router.get('/', function (req, res, next) {
  res.render('admin/main', {// hacia el main.hbs
    layout: 'admin/layout',
    persona: req.session.nombre
  });
});



module.exports = router;