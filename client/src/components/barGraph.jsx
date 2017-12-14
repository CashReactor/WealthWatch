import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

class BarGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      budget: 7777,
      one: [],
      rec: []
    };
  }

  componentDidMount() {
    this.renderGraph();
    axios.post('/user', { email: this.props.currentEmail })
    .then((response) => {
      if (!response.data.budget) {
        response.data.budget = "7777";
      }
      this.setState({ budget: Number(response.data.budget), one: response.data.oneTime, rec: response.data.recurring });
      console.log('THIS IS THE CURRENT BUDGET', this.state.budget);
      console.log('THIS IS THE BAR GRAPH ONETIME EXPENSES', this.state.one);
      console.log('THIS IS THE BAR GRAPH RECURRING EXPENSES', this.state.rec);
      this.renderGraph();
    })
  }

  renderGraph() {
    let days = [];
    let budget = [];
    let month = this.state.currentDate.getMonth() + 1;
    let year = this.state.currentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month, year);
    for (let i = 0; i <= daysInMonth; i++) {
      days.push(i);
    }
    for (let i = 0; i <= daysInMonth; i++) {
      budget.push(this.state.budget)
    }
    for (let i = 0; i < this.state.one.length; i++) {
      var expenseAmount = this.state.one[i].amount;
      var expenseDay = this.state.one[i].getDate();
      var expenseMonth = this.state.one[i].getMonth() + 1;
      var expenseYear = this.state.one[i].getFullYear();
      if (expenseYear === year && expenseMonth === month && expenseDay === day) {
        for (let j = expenseDay; j <= daysInMonth; j++) {
          budget[expenseDay] = budget[expenseDay] - expenseAmount;
        }
      }
    }
    for (let i = 0; i < this.state.rec.length; i++) {
      var expenseAmount = this.state.rec[i].amount;
      budget[1] = budget[1] - expenseAmount;
    }
    let barCtx = document.getElementById('barChart');
    barCtx.style.backgroundColor = '#FAFAFA'
    let updatedBudgets = budget;
    let positiveColor = 'rgba(54, 162, 235, 0.7)'

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
