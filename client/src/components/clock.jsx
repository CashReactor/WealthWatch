import React from 'react';

class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      time: new Date()
    }
  }

  componentDidMount() {
    this.interval = setInterval(this.timer, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  timer() {
    this.setState({ time: new Date() })
  }

  render(){
    var hours = this.state.time.getHours();
    var minutes = this.state.time.getMinutes();
    var seconds = this.state.time.getSeconds();
    return(
      <div>
        D3 graph will go here
      </div>
    )
  }
}

export default Clock;