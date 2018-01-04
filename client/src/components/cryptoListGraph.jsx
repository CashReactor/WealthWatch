import React from 'react';

class CryptoListGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.lineGraph = this.lineGraph.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps::::::::', nextProps);
    this.lineGraph(nextProps);
  }

  lineGraph(propsData) {
    const recentSeries = propsData.pickedCurrency.recentSeries || [];
    // console.log('recentSeries:::::::::::', recentSeries)
    const date = recentSeries.map(element => element.date).reverse();
    const prices = recentSeries.map(element => element.price).reverse();

    const ctx = document.getElementById('listGraph');
    const listChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
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
    console.log('here is the data::::', this.props.pickedCurrency);
    return (
      <div>
        <canvas id="listGraph" />
      </div>
    );
  }
}

export default CryptoListGraph;
