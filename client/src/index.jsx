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
import Paper from 'material-ui/Paper';
import $ from 'jquery';


class App extends React.Component {
  constructor(props) {
    super(props);
    const jwtToken = window.localStorage.getItem('wealthwatch_token') || '';
    const email = window.localStorage.getItem('user_email');
    this.state = {
      budget: 5000,
      budgetInput: false,
      currentDate: new Date(),
      token: jwtToken,
      loggedIn: !!jwtToken,
      currentEmail: email,
      rec: [],
      one: []
    };
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.setLoginState = this.setLoginState.bind(this);
    this.setLogoutState = this.setLogoutState.bind(this);
    this.getCurrentEmail = this.getCurrentEmail.bind(this);
  }

  componentDidMount() {
    console.log('THIS IS THE TOKENNNNN', this.state.currentEmail);
    $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 700);
    });

    if (this.state.loggedIn) {
      axios.post('/fetchOneExpenses', { email: this.state.currentEmail })
      .then((response) => {
      this.setState({ rec: response.data });
        console.log('THIS IS THE RECURRING EXPENSES', this.state.rec);
      })
      axios.post('/fetchRecExpenses', { email: this.state.currentEmail })
      .then((response) => {
        this.setState({ one: response.data });
        console.log('THIS IS THE ONE-TIME EXPENSES', this.state.one);
      })
    }


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

  setLoginState(token, email) {
    this.setState({
      loggedIn: true,
      token: token,
      currentEmail: email
    });
    // this.renderChart();
    window.localStorage.setItem('wealthwatch_token', token);
    window.localStorage.setItem('user_email', email);
  }

  setLogoutState(event) {
    event.preventDefault();
    this.setState({
      loggedIn: false,
      token: '',
    });
    window.localStorage.removeItem('wealthwatch_token');
    window.localStorage.removeItem('user_email');
  }

  getAuthentication() {
    return this.state.token;
  }

  render() {
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
          <div id="widget" className="widget">
            <Clock getCurrentDate={this.getCurrentDate} />
            <Weather getAuthentication={this.getAuthentication} />
          </div>
          <MuiThemeProvider>
            <Graph currentEmail={this.state.currentEmail} />
            <br/>
            <InputBalance currentEmail={this.state.currentEmail} />
            <Expenses currentEmail={this.state.currentEmail} />
          </MuiThemeProvider>
          <br/>
          <a onClick={console.log('HELLO WORLD')} className="btn btn-info" href="#widget">Graph</a>
          <button onClick={this.setLogoutState} type="" className="btn btn-danger">Logout</button>
        </div>
      );
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
