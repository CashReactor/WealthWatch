import React from 'react';
import axios from 'axios';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state = {
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


  render(){
    return(
      <div className="weather">

      </div>
    )
  }
}

export default Weather;