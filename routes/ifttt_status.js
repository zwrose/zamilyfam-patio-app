var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var serviceKey = req.get('IFTTT-Service-Key');
  var channelKey = req.get('IFTTT-Channel-Key');
  var realKey = 'VPZA9GURJmf1SQ5joYgzQMZskTGHzzsBfjW3KUbg03roPhqWoOXIAQStTb8Zswc-';

  if (serviceKey == realKey || channelKey == realKey) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
  

});

module.exports = router;