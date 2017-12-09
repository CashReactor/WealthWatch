//Import your routes here
// ***********************
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
  var url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&${lon}&APPID=${process.env.WEATHER_API}`;
  axios.get(url).then(function(response) {
    var  weather = {
      state: response.name,
      weather: response.weather.main + ': ' + response.weather.description,
      temperature: response.main.temp
    }
    res.send(weather);
    res.end();
  })
})
