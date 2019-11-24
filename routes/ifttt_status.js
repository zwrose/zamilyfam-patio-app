var express = require('express');
var router = express.Router();

router.get('/ifttt/v1/status', function(req, res, next) {
  res.send('OK')

});

module.exports = router;