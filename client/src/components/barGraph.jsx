import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

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
