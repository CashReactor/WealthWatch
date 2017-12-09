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

  componentDidMount() {
    var scope = this;
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      var url = `api.openweathermap.org/data/2.5/weather?lat=${lat}&${lon}&APPID=${process.env.WEATHER_API}`;
      axios.get(url).then(function(response) {
        scope.setState(
          {
            state: response.name,
            weather: response.weather.main + ': ' + response.weather.description,
            temperature: response.main.temp
          }
        )
      })
    })
  }


  render(){
    return(
      <div className="weather">
        {this.state.state}<br></br>
        {this.state.temperature}<br></br>
        {this.state.weather}<br></br>
      </div>
    )
  }
}

export default Weather;