import React from 'react';

class LineGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }
  componentDidMount() {
  }

  render() {
    return (
      <div id="LineChart">
        <canvas id="lineChart" />
      </div>
    );
  }
}

export default LineGraph;
