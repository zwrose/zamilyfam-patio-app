var express = require('express');
var uuid = require('uuid/v4');
var router = express.Router();
var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);

var authCheck = function(req, res, next) {
  var serviceKey = req.get('IFTTT-Service-Key');
  var channelKey = req.get('IFTTT-Channel-Key');
  var realKey = process.env.IFTTT_SERVICE_KEY;

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
  res.send({
    data: {
      samples: {}
    }
  });
});

router.post('/trigger/lights_off', function(req, res, next) {

});

router.post('/trigger/lights_on', function(req, res, next) {
  redis.get("on", function(err, result) { 
    if (JSON.parse(result).data && Array.isArray(JSON.parse(result).data)) { 
      res.send(JSON.parse(result));
    } else {
      
    }
  });
});

module.exports = router;