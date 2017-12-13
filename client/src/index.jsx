import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chart from 'chart.js';
import Graph from './components/Graph.jsx';
import InputBalance from './components/inputBalance.jsx';
import Clock from './components/clock.jsx';
import Weather from './components/weather.jsx';
import LoginSignup from './components/loginSignup.jsx';
import axios from 'axios';
import Expenses from './components/expenses.jsx'

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
      currentEmail: ''
    };
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.setLoginState = this.setLoginState.bind(this);
    this.setLogoutState = this.setLogoutState.bind(this);
    this.getCurrentEmail = this.getCurrentEmail.bind(this);
  }

  getCurrentEmail(email) {
    this.setState({ currentEmail: email })
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

  render() {
    // console.log('index::::::', this.state.currentEmail)
    if (!this.state.loggedIn) {
      return (
        <div>
          <MuiThemeProvider>
            <LoginSignup getCurrentEmail={this.getCurrentEmail} setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} />
          </MuiThemeProvider>
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
            <br/>
            <InputBalance />
            <Expenses currentEmail={this.state.currentEmail}/>
          </MuiThemeProvider>
          <br/>
          <button onClick={this.setLogoutState} type="" className="btn btn-danger">Logout</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
