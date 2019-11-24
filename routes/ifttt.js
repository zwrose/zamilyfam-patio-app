var express = require('express');
var router = express.Router();

var authCheck = function(req, res, next) {
  var serviceKey = req.get('IFTTT-Service-Key');
  var channelKey = req.get('IFTTT-Channel-Key');
  var realKey = 'VPZA9GURJmf1SQ5joYgzQMZskTGHzzsBfjW3KUbg03roPhqWoOXIAQStTb8Zswc-';

  if (serviceKey == realKey || channelKey == realKey) {
    next();
  } else {
    res.sendStatus(401);
  }
}

router.use(authCheck);

router.get('/status', function(req, res, next) {
  res.sendStatus(200);  
});

router.post('/test/setup', function(req, res, next) {

});

router.post('/trigger/lights_off', function(req, res, next) {

});

router.post('/trigger/lights_on', function(req, res, next) {

});

module.exports = router;