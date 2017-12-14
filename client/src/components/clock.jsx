import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date(),
    };
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer() {
    var date = new Date();
    this.setState({ time: date });
    // this.props.getCurrentDate(date);
  }

  render() {
    var hours = this.state.time.getHours();
    var minutes = this.state.time.getMinutes();
    var seconds = this.state.time.getSeconds();
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    return (
      <div id="clock">
        Time: {hours}:{minutes}:{seconds}
        <br />
        Date: {this.state.time.toDateString()}
      </div>
    );
  }
}

export default Clock;
