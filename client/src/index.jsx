import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chart from 'chart.js';
import Graph from './components/Graph.jsx';
import InputBalance from './components/inputBalance.jsx';
import Clock from './components/clock.jsx';
import Weather from './components/weather.jsx';
import OneExpense from './components/oneExpense.jsx';
import RecExpense from './components/recExpense.jsx';
import LoginSignup from './components/loginSignup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    const jwtToken = window.localStorage.getItem('wealthwatch_token') || '';
    this.state = {
      budget: 5000,
      budgetInput: false,
      currentDate: new Date(),
      token: jwtToken,
      loggedIn: !!jwtToken,
    };
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.setLoginState = this.setLoginState.bind(this);
    this.setLogoutState = this.setLogoutState.bind(this);
    this.logout = this.logout.bind(this);
    this.renderChart = this.renderChart.bind(this);
  }

  renderChart() {
    // var days = [];
    // var month = this.state.currentDate.getMonth() + 1;
    // var year = this.state.currentDate.getFullYear();
    // var daysInMonth = this.daysInMonth(month, year);
    // for (var i = 0; i <= daysInMonth; i++) {
    //   days.push(i);
    // }
    // var ctx = document.getElementById('financeChart');
    // var myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: days,
    //     datasets: [
    //       {
    //         label: 'Current Monthly Balance ($)',
    //         data: [this.state.budget, 400, 200, 100, 50, 25, -10, -20, -40],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)'
    //         ],
    //         borderColor: [
    //           'rgba(255,99,132,1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)'
    //         ],
    //         borderWidth: 1
    //       }
    //     ]
    //   },
    //   options: {
    //     scales: {
    //       yAxes: [
    //         {
    //           ticks: {
    //             beginAtZero: true
    //           }
    //         }
    //       ]
    //     }
    //   }
    // });
  }

  componentDidMount() {
    this.renderChart();
  }

  getCurrentDate(date) {
    this.setState({ currentDate: date });
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  setLoginState(token) {
    this.setState({
      loggedIn: true,
      token: token,
    });
    // this.renderChart();
    window.localStorage.setItem('wealthwatch_token', token);
  }
  setLogoutState(event) {
    event.preventDefault();
    this.setState({
      loggedIn: false,
      token: '',
    });
    window.localStorage.removeItem('wealthwatch_token');
  }

  logout(e) {
    e.preventDefault();
    this.setState({ loggedIn: false });
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <LoginSignup setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} />
        </div>
      )
    } else {
      return (
        <div>
          <div className="widget">
            <Clock getCurrentDate={this.getCurrentDate} />
            <Weather />
          </div>
          <MuiThemeProvider>
            <Graph />
          </MuiThemeProvider>
          <InputBalance />
          <OneExpense currentEmail={this.state.currentEmail} />
          <RecExpense currentEmail={this.state.currentEmail} />
          <button onClick={this.setLogoutState} type="" className="btn btn-danger">Logout</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
