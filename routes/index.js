var express = require('express');
var router = express.Router();
var {addFood, addWater, homePage} = require('../Controller/controller')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'RATION SYSTEM'});
// });
router.get('/',homePage)

router.post('/food',addFood)
router.post('/water',addWater)

module.exports = router;
