import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph.jsx';
import InputBalance from './components/inputBalance.jsx';
import Clock from './components/clock.jsx';
import Weather from './components/weather.jsx';
import OneExpense from './components/oneExpense.jsx';
import RecExpense from './components/recExpense.jsx';
import Chart from 'chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      budgetInput: false,
      currentDate: new Date()
    }
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  componentDidMount() {
    var days = [];
    var month = this.state.currentDate.getMonth() + 1;
    var year = this.state.currentDate.getFullYear();
    var daysInMonth = this.daysInMonth(month, year);
    for (var i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    var ctx = document.getElementById('financeChart');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: days,
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
  }

  getCurrentDate(date) {
    this.setState({ currentDate: date });
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  render() {
    return (
      <div>
        <div className="widget">
          <Clock getCurrentDate={this.getCurrentDate}/>
          <Weather/>
        </div>
        <Graph/>
        <InputBalance/>
        <OneExpense/>
        <RecExpense/>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);