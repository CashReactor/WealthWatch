import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      weather: '',
      temperature: '',
    };
  }

  makeCelcius(number) {
    var number = Math.round(Number(number));
    return String(Math.round(number - 273.1));
  }

  componentDidMount() {
    var scope = this;
    navigator.geolocation.getCurrentPosition(function (position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      axios
        .post('/weather', {
          lat: lat,
          lon: lon,
        })
        .then(function (response) {
          var weather = response.data;
          scope.setState(weather);
        });
    });
  }

  render() {
    if (this.state.state) {
      return (
        <div className="weather">
          {this.state.state}
          <br />
          {this.makeCelcius(this.state.temperature)} &#8451;<br />
          {this.state.weather}
          <br />
        </div>
      );
    } else {
      return <div className="weather">Loading weather...</div>;
    }
  }
}

export default Weather;
