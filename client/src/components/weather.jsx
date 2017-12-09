import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      state: '',
      weather: '',
      temperature: ''
    }
  }

  makeCelcius(number) {
    var number = Math.round(Number(number));
    return String(Math.round(number-273.1));
  }

  componentDidMount() {
    var scope = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      axios.post('/weather', {
        lat: lat,
        lon: lon
      }).then(function(response) {
        console.log(response.data);
        var weather = response.data;
        scope.setState(weather);
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&${lon}&APPID=${process.env.WEATHER_API}`;
      axios.get(url).then(function(response) {
      })
    })
  }

  render() {
    if (this.state.state) {
      return(
        <div className="weather">
          {this.state.state}<br></br>
          {this.makeCelcius(this.state.temperature)} &#8451;<br></br>
          {this.state.weather}<br></br>
        </div>
      )
    } else {
      return(
        <div className="weather">
        Loading weather...
        </div>
      )
    }
  }

}

export default Weather;