import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      budget: 8000,
    };
  }

  componentDidMount() {
    let days = [];
    let month = this.state.currentDate.getMonth() + 1;
    let year = this.state.currentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month, year);
    for (let i = 0; i <= daysInMonth; i++) {
      days.push(i);
    }
    let barCtx = document.getElementById('barChart');
    barCtx.style.backgroundColor = 'rgba(0,0,170, 0.1)'
    let updatedBudgets = [
      this.state.budget,
      4000,
      2000,
      1000,
      500,
      250,
      200,
      190,
      180,
      170,
      165,
      140,
      120,
      100,
      89,
      78,
      72,
      73,
      60,
      14,
      -10,
      -25,
      -100,
      -250,
      -800,
    ];
    let positiveColor = 'rgba(0,0,210, 0.5)'
    let color = updatedBudgets.map(budget => (budget > 0 ? positiveColor : 'rgba(255, 0, 0, 0.5)'));
    var barGraph = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: 'Current Monthly Balance ($)',
            data: updatedBudgets,
            backgroundColor: color,
            borderColor: color,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
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
