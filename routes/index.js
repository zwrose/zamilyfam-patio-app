var express = require('express');
var uuid = require('uuid/v4');
var router = express.Router();
var Redis = require('ioredis');
var redis = new Redis(process.env.REDIS_URL);
var request = require('request');

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
  var itemId = uuid();
  var ts = Math.round((new Date()).getTime() / 1000);

  var thisItem = {
    data: [
      {
        meta: {
          id: itemId,
          timestamp: ts
        }
      }
    ]
  };

  redis.get(req.body.onOff, function(err, result) { 
    // console.log("what is in Redis:", result);
    // console.log("is the 'data' present? if this is undefined, then no:", JSON.parse(result).data)
    // console.log("is 'data' an array?", Array.isArray(JSON.parse(result).data));
    if (err) { // error occurred
      resultOutput.description = err;

      res.render('index', {
        title: 'Zamily Patio Control',
        result: resultOutput
      });

    } else if (JSON.parse(result).data && Array.isArray(JSON.parse(result).data)) { // add to the existing array, trim if >50
      // console.log("did exist", JSON.parse(result))
      
      // console.log("data array that was in redis", JSON.parse(result).data);

      var newItems = JSON.parse(result).data;

      // console.log("before unshift, should be same as redis", newItems);

      newItems.unshift(thisItem.data[0]);

      // console.log("after unshift",newItems);

      // console.log("length of array", newItems.length);

      if (newItems.length > 50) {
        newItems = newItems.slice(0,50);
      }
      // console.log("stringified before back to redis", JSON.stringify(newItems));
      redis.set(req.body.onOff, JSON.stringify(newItems));


    } else { // create array, didn't exist
      // console.log("none existed")

      redis.set(req.body.onOff, JSON.stringify(thisItem));


    }
    // TODO send Realtime notification to IFTTT
    //request options
    var requestId = uuid();
    var options = {
      url: "https://realtime.ifttt.com/v1/notifications",
      method: "POST",
      headers: {
        'IFTTT-Service-Key': process.env.IFTTT_SERVICE_KEY,
        'Accept': "application/json",
        'Accept-Charset': "utf-8",
        'Accept-Encoding': "gzip, deflate",
        'Content-Type': "application/json",
        'X-Request-ID': requestId
      },
      body: JSON.stringify({
        data: [{user_id: "77956024"}]
      })
    };
    // console.log(options);
    request(options, function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the body of the return

      // render response
      resultOutput.success = true;
      resultOutput.description = "great success!"
      res.render('index', {
        title: 'Zamily Patio Control',
        result: resultOutput
      });
    });
  });
});

module.exports = router;
