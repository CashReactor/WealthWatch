//Import your routes here
// ***********************
var axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.set('port', process.env.PORT || 1337);
const port = app.get('port');

app.use(express.static(__dirname + '/../client/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use Routes here.....

app.listen(port, () => {
  console.log('Express is listening on port 1337');
});

app.post('/weather', function(req, res) {
  console.log(req.body);
  var lat = req.body.lat;
  var lon = req.body.lon;
  var url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=fe22cf91271784d706fc84ca44d54cc3`;
  axios.get(url).then(function(response) {
    var data = response.data;
    console.log('THIS IS THE WEATHER', response.data);
    var  weather = {
      state: data.name,
      weather: data.weather[0].main + ': ' + data.weather[0].description,
      temperature: data.main.temp
    }
    res.send(weather);
    res.end();
  })
})
