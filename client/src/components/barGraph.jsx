import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const style = {
  border: {
    border: 'solid',
    borderWidth: '3px',
    borderColor: 'lightblue',
    width: '70%',
    padding: '7px',
    margin: '7px auto',
  },
}

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <canvas id="balanceChart" />
      </div>
    );
  }
}

export default BarGraph;
