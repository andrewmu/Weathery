var express = require('express');
var router = express.Router();

const fetch = require("node-fetch");


var config = require('../config');

/* GET weather data */
router.get('/', function(req, res, next) {

  let apiKey = config.WEATHER_API_KEY;

  console.log("doing weather proxy call", req.params);

  var queryString = "q=London,uk";
  if (req.query.city && req.query.country) {
    let city = encodeURIComponent(req.query.city);
    let country = encodeURIComponent(req.query.country).toLowerCase();
    queryString = `q=${city},${country}`;
  }
  else if (req.query.lat && req.query.lon) {
    queryString = `lat=${encodeURIComponent(req.query.lat)}&lon=${encodeURIComponent(req.query.lon)}`;
  }

  console.log("fetch", `http://api.openweathermap.org/data/2.5/forecast?${queryString}&appid=${apiKey}`);

  fetch(`http://api.openweathermap.org/data/2.5/forecast?${queryString}&units=metric&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      console.log("city", data.city);
      res.json(data);
    })
    .catch((err) => {
      console.log("Didn't work because: ", err);
    });

});

module.exports = router;
