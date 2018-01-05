import React from 'react';

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
        <canvas id="balanceLineChart" />
      </div>
    );
  }
}

export default LineGraph;
