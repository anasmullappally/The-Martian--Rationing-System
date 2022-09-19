var express = require('express');
var router = express.Router();
var controller = require('../Controller/controller')

/* GET home page. */
router.get('/', function(req, res, next) {
  let sup = [{a:'1',b:2},{a:'1',b:2},{a:'1',b:2}]
  res.render('index', { title: 'Express',supplies:sup });
});

module.exports = router;
