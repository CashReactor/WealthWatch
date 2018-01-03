import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class CryptoModalGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeSeries: {},
    };
    this.lineGraph = this.lineGraph.bind(this);
  }

  componentDidMount() {
    this.setState({
      timeSeries: this.props['timeSeries']
    });
  }

  componentWillReceiveProps(nextProps) {
    // this.lineGraph();
    this.setState(
      { timeSeries: nextProps['timeSeries'] },
      () => this.lineGraph(),
    );
  }

  lineGraph() {
    const { timeSeries } = this.state;
    const xLabels = Object.keys(timeSeries).slice(0, 32).reverse();
    const prices = [];
    xLabels.forEach((element) => {
      prices.push(timeSeries[element]['4b. close (USD)']);
    });

    const ctx = document.getElementById('modalLine');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: xLabels,
        datasets: [{
          label: 'Price',
          data: prices,
          backgroundColor: 'rgba(0,0,255,0.5)',
          borderColor: 'rgba(0,0,255,0.5)',
          fill: false,
        }],
      },
    });
  }

  render() {
    return (
      <div>
        <canvas id="modalLine" />
      </div>
    );
  }
}

export default CryptoModalGraph;