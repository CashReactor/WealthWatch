import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chart from 'chart.js';
import Graph from './components/Graph';
import InputBalance from './components/inputBalance';
import Clock from './components/clock';
import Weather from './components/weather';
import OneExpense from './components/oneExpense';
import RecExpense from './components/recExpense';
import LoginSignup from './components/loginSignup';

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
  }

  componentDidMount() {}

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
    window.localStorage.setItem('wealthwatch_token', token);
  }
  setLogoutState(event) {
    this.setState({
      loggedIn: false,
      token: '',
    });
    window.localStorage.removeItem('wealthwatch_token');
  }

  render() {
    return (
      <div>
        <div className="widget">
          <Clock getCurrentDate={this.getCurrentDate} />
          <Weather />
          <br />
        </div>
        <MuiThemeProvider>
          <Graph />
        </MuiThemeProvider>
        <InputBalance />
        <OneExpense currentEmail={this.state.currentEmail} />
        <RecExpense currentEmail={this.state.currentEmail} />
        <LoginSignup />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
