import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      budget: 7777,
      currentGraph: null,
    };
  }

  componentDidMount() {

  }


  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  render() {
    return (
      <div>
        <canvas id="barChart" />
      </div>
    );
  }
}

export default BarGraph;
