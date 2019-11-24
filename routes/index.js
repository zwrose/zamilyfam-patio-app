var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Zamily Patio Control',
    result: false
  });
});

router.post('/', function(req, res, next) {
  var resultOutput = {
    success: false,
    description: "not set"
  };
  console.log(req.body.onOff);



  res.render('index', {
     title: 'Zamily Patio Control',
     result: resultOutput
  });
});

module.exports = router;
