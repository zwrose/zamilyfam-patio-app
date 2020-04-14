var express = require('express');
var uuid = require('uuid/v4');
var router = express.Router();
var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);


router.get('/authCb', function(req, res, next) {
  console.log(req.query);
  res.sendStatus(200);  
});

router.post('/eventCb', function(req, res, next) {
  console.log(req.body);
  console.log(req.headers);
  res.sendStatus(204);  
});

module.exports = router;