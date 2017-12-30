import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chart from 'chart.js';
import $ from 'jquery';
import axios from 'axios';
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';
import Graph from './Graph.jsx';
import ExpenseTable from './expenseTable.jsx';
import InputBalance from './inputBalance.jsx';
import Clock from './clock.jsx';
import Weather from './weather.jsx';
import LoginSignup from './loginSignup.jsx';
import Expenses from './expenses.jsx'
import NPVCalculator from './npvCalculator.jsx'
import ForgotPassword from './forgotPassword.jsx';
import ResetPassword from './resetPassword.jsx';
import Plaid from './plaidConsole.jsx';
import Avatar from 'material-ui/Avatar';
import BarGraph from './barGraph.jsx';
import LineGraph from './lineGraph.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    const jwtToken = window.localStorage.getItem('wealthwatch_token') || '';
    const email = window.localStorage.getItem('user_email');
    this.state = {
      budget: 7000,
      bankBudget: '',
      one: [],
      bankOne: [],
      rec: [],
      bankName: '',
      budgetInput: false,
      currentDate: new Date(),
      daysInMonth: '',
      token: jwtToken,
      loggedIn: !!jwtToken,
      currentEmail: email,
      currentBarGraph: null,
      currentLineGraph: null,
      currentBankGraph: null,
      currentBankLineGraph: null,
      currentAverageDoughnutGraph: null,
      currency: '',
      bank: false,
      loading: false,
      avatar: '',
      totalOneExpense: '',
      totalRecExpense: '',
    };
    this.getCurrentDate = this.getCurrentDate.bind(this);
    this.setLoginState = this.setLoginState.bind(this);
    this.setLogoutState = this.setLogoutState.bind(this);
    this.getCurrentEmail = this.getCurrentEmail.bind(this);
    this.renderGraph = this.renderGraph.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.resetUser = this.resetUser.bind(this);
    this.currencySymbols = this.currencySymbols.bind(this);
    this.updateCurrency = this.updateCurrency.bind(this);
    this.updateBankInfo = this.updateBankInfo.bind(this);
    this.renderBankGraph = this.renderBankGraph.bind(this);
    this.routerGraph = this.routerGraph.bind(this);
  }

  componentDidMount() {
    this.updateUser();
    console.log('THIS IS THE WINDOW LOCATION', window.location.href);
    console.log('THIS IS THE TOKENNNNN', this.state.currentEmail);
    $(document).on('click', 'a[href^="#"]', function(event) {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top,
        },
        700
      );
    });

    console.log('THIS IS THE ONETIME EXPENSES UPON LOADING', this.state.one);
    console.log('THIS IS THE RECURRING EXPENSES UPON LOADING', this.state.rec);

    // var url = window.location.href.split('/');
    // var urlLength = url.length;
    // var tab = url[urlLength - 1];

    // if (tab === 'expense') {
    //   $('.bar .bar-item:nth-child(1)').toggleClass('bar-select');
    //   $('.bar .bar-item:nth-child(2)').toggleClass('bar-select');
    // } else if (tab === 'bank') {
    //   $('.bar .bar-item:nth-child(1)').toggleClass('bar-select');
    //   $('.bar .bar-item:nth-child(3)').toggleClass('bar-select');
    // } else if (tab == 'investor') {
    //   $('.bar .bar-item:nth-child(1)').toggleClass('bar-select');
    //   $('.bar .bar-item:nth-child(4)').toggleClass('bar-select');
    // }
  }

  w3Click(e) {
    $('.bar-select').toggleClass('bar-select');
    e.target.className = 'bar-item bar-select';
  }

  updateBankInfo(budget, name, transactions) {
    this.setState({
      bankBudget: budget,
      bankName: name,
      bankOne: transactions,
    })
    console.log('the bank information is updated', this.state.bankBudget, this.state.bankOne, this.state.bankName);
    console.log()
  }

  // updateBankName(name) {
  //   this.setState({
  //     bankName: name
  //   })
  // }

  // updateBankBudget(budget) {
  //   this.setState({
  //     bankBudget: budget
  //   })
  // }

  // updateBankOne(transactions) {
  //   this.setState({
  //     bankOne: transactions
  //   })
  // }

  resetUser() {
    axios.post('/reset', { email: this.state.currentEmail })
    .then((response) => {
      this.updateUser();
    })
  }

  updateCurrency(currency) {
    this.setState({ currency: currency });
  }

  updateUser() {
    axios.post('/user', { email: this.state.currentEmail }).then((response) => {
      console.log('RESPONSE DATAAAA', response.data);
      if (!response.data.budget) {
        response.data.budget = '7777';
      }
      this.setState({
        budget: Number(response.data.budget),
        one: response.data.oneTime,
        rec: response.data.recurring,
        currency: response.data.currency,
        avatar: response.data.gravatar,
      });
      console.log('THIS IS THE CURRENCY WE RECEIVE FROM THER SERVER', response.data.currency);

      var totalOneExpense = this.state.one.map(function(expense) {
        return expense.amount;
      }).reduce((acc, cur) => (acc + cur));
      var totalRecExpense = this.state.rec.map(function(expense) {
        return expense.amount;
      }).reduce((acc, cur) => (acc + cur));

      this.setState({
        totalOneExpense,
        totalRecExpense
      })

      this.renderGraph();
    })


  }

  renderBankGraph() {
    $('.loader').toggle();
    $('.companyLogo').toggle();
    $('.bankInfo').css('display', 'grid');
    if (this.state.currentBankGraph) {
      this.state.currentBankGraph.destroy();
    }

    if (this.state.currentBankLineGraph) {
      this.state.currentBankLineGraph.destroy();
    }

    var bankBudget = 0;
    var that = this;
    this.state.bankBudget.forEach(function(account) {
      // console.log('THIS IS THE STATE BANKBUDGET', that.state.bankBudget);
      if (account.balances.available !== null) {
        bankBudget += account.balances.available;
      } else {
        bankBudget += account.balances.current;
      }
    })

    let days = [];
    let budget = [];
    let expenses = [];
    let day = this.state.currentDate.getDate();
    let month = this.state.currentDate.getMonth() + 1;
    let year = this.state.currentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month, year);

    for (let i = 0; i <= daysInMonth; i++) {
      days.push(i);
    }
    for (let i = 0; i <= daysInMonth; i++) {
      budget.push(bankBudget);
      expenses.push(0);
    }
    for (let i = 0; i < this.state.bankOne.length; i++) {
      var expenseAmount = this.state.bankOne[i].amount;
      var date = this.state.bankOne[i].date.split('-');
      var expenseYear = Number(date[0]);
      var expenseMonth = Number(date[1]);
      var expenseDay = Number(date[2]);
      if (expenseYear === year && expenseMonth === month) {
        expenses[expenseDay] += expenseAmount;
        for (let k = 0; k <= daysInMonth; k++) {
          //this step is to start the budget from expenses over the month all added to the available & current balance
          budget[k] += expenseAmount;
        }
        for (let j = expenseDay; j <= daysInMonth; j++) {
          budget[j] = budget[j] - expenseAmount;
        }
      }
    }
    console.log('THIS IS THE EXPENSE ARRAY', expenses);
    let barCtx = document.getElementById('bankBarChart');
    let lineCtx = document.getElementById('bankLineChart');

    // console.log(barCtx)
    let updatedBudgets = budget;
    let positiveColor = 'rgba(54, 162, 235, 0.7)';

    let color = updatedBudgets.map((budget, index) => {
      if (budget > 0) {
        if (index <= this.state.currentDate.getDate()) {
          return positiveColor;
        } else {
          return 'rgba(54, 162, 235, 0.3)';
        }
      } else {
        return 'rgba(255, 0, 0, 0.5)';
      }
    });

    var lineGraph = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: `Current Monthly Expenditure of ${this.state.bankName.institution.name} ($)`,
            data: expenses,
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            borderWidth: 1,
            fill: false,
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

    var barGraph = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: `Current Monthly Balance of ${this.state.bankName.institution.name} ($)`,
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
    this.setState({
      currentBankGraph: barGraph,
      currentBankLineGraph: lineGraph
    });
    $('#bankBarChart').css('display', 'inline-block');
    $('#bankLineChart').css('display', 'inline-block');
  }

  renderGraph() {
    if (this.state.currentBarGraph) {
      this.state.currentBarGraph.destroy();
    }
    if (this.state.currentLineGraph) {
      this.state.currentLineGraph.destroy();
    }
    let days = [];
    let budget = [];
    let expenses = [];
    let day = this.state.currentDate.getDate();
    let month = this.state.currentDate.getMonth() + 1;
    let year = this.state.currentDate.getFullYear();
    let totalRecExp = 0;
    console.log('THIS IS THE CURRENT DAY AND MONTH FOR THE STATE', day, '//', month, '//', year)
    let daysInMonth = this.daysInMonth(month, year);
    this.setState({
      daysInMonth
    });
    for (let i = 0; i <= daysInMonth; i++) {
      days.push(i);
    }
    for (let i = 0; i <= daysInMonth; i++) {
      budget.push(this.state.budget);
      expenses.push(0);
    }
    for (let i = 0; i < this.state.one.length; i++) {
      var expenseAmount = this.state.one[i].amount;
      console.log('THIS STATE ONE', new Date(this.state.one[i].date).getDate());
      var expenseDay = new Date(this.state.one[i].date).getDate();
      console.log('THIS IS THE EXPENSE DAY', expenseDay);
      var expenseMonth = new Date(this.state.one[i].date).getMonth() + 1;
      var expenseYear = new Date(this.state.one[i].date).getFullYear();
      console.log(
        'THIS IS THE CURRENT DAY AND MONTH AND YEAR FOR THE EXPENSES',
        expenseDay,
        '//',
        expenseMonth,
        '//',
        expenseYear
      );
      if (expenseYear === year && expenseMonth === month) {
        expenses[expenseDay] += expenseAmount;
        for (let j = expenseDay; j <= daysInMonth; j++) {
          budget[j] = budget[j] - expenseAmount;
        }
      }
    }
    for (let i = 0; i < this.state.rec.length; i++) {
      var expenseAmount = this.state.rec[i].amount;
      totalRecExp = totalRecExp + expenseAmount;
      for (let j = 1; j < budget.length; j++) {
        budget[j] = budget[j] - expenseAmount;
      }
    }
    expenses[1] = totalRecExp;
    console.log(budget);
    let barCtx = document.getElementById('barChart');
    let lineCtx = document.getElementById('lineChart');
    let updatedBudgets = budget;
    let positiveColor = 'rgba(54, 162, 235, 0.7)';

    let color = updatedBudgets.map((budget, index) => {
      if (budget > 0) {
        if (index <= this.state.currentDate.getDate()) {
          return positiveColor;
        } else {
          return 'rgba(54, 162, 235, 0.3)';
        }
      } else {
        return 'rgba(255, 0, 0, 0.5)';
      }
    });

    var lineGraph = new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: `Current Monthly Expenditure (${this.state.currency})`,
            data: expenses,
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            borderWidth: 1,
            fill: false,
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

    var barGraph = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: days,
        datasets: [
          {
            label: `Current Monthly Balance (${this.state.currency})`,
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
    this.setState({
      currentBarGraph: barGraph,
      currentLineGraph: lineGraph
    });
  }

  renderDoughnutGraph() {

  }

  currencySymbols() {
    switch(this.state.currency) {
      case '':
        return <span>&nbsp;&nbsp;</span>;
      case 'USD':
        return <span>&#36;</span>;
      case 'AUD':
        return <span>&#36;</span>;
      case 'BRL':
        return <span>R&#36;</span>;
      case 'CAD':
        return <span>&#36;</span>;
      case 'CZK':
        return <span>&#x4b;&#x10d;</span>;
      case 'DKK':
        return <span>&#x6b;&#x72;</span>;
      case 'EUR':
        return <span>&#x20ac;</span>;
      case 'HKD':
        return <span>&#36;</span>;
      case 'HUF':
        return <span>&#x46;&#x74;</span>;
      case 'ILS':
        return <span>&#x20aa;</span>;
      case 'KOR':
        return <span>&#x20a9;</span>;
      case 'JPY':
        return <span>&#xa5;</span>;
      case 'MYR':
        return <span>&#x52;&#x4d;</span>;
      case 'MXN':
        return <span>&#x24;</span>;
      case 'VND':
        return <span>&#x20ab;</span>;
      case 'IDR':
        return <span>&#x52;&#x70;</span>;
      case 'NOK':
        return <span>&#x6b;&#x72;</span>;
      case 'NZD':
        return <span>&#x24;</span>;
      case 'PHP':
        return <span>&#x20b1;</span>;
      case 'PLN':
        return <span>&#x7a;&#x142;</span>;
      case 'GBP':
        return <span>&#xa3;</span>;
      case 'SGD':
        return <span>&#x53;&#x24;</span>;
      case 'SEK':
        return <span>&#x6b;&#x72;</span>;
      case 'CHF':
        return <span>&#x43;&#x48;&#x46;</span>;
      case 'TWD':
        return <span>&#x4e;&#x54;&#x24;</span>;
      case 'THB':
        return <span>&#xe3f;</span>;
      case 'TRY':
        return <span>&#x54;&#x4c;</span>;
      case 'CNY':
        return <span>&#xa5;</span>;
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
    window.localStorage.setItem('currency', currency);
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

  routerGraph() {
    return (
      <div>
        <Graph renderBankGraph={this.renderBankGraph} updateBankInfo={this.updateBankInfo} one={this.state.one} rec={this.state.rec} currentEmail={this.state.currentEmail} />
      </div>
    )
  }

  calculateExpensePerDay() {
    return Math.round((this.state.totalOneExpense + this.state.totalRecExpense) / (new Date()).getDate());
  }

  calculateBalanceLeft() {
    return Math.round((this.state.budget - this.state.totalOneExpense - this.state.totalRecExpense) / (this.state.daysInMonth - (new Date()).getDate()));
  }

  render() {
    console.log('Avatar is: ', this.state.avatar);
    if (!this.state.loggedIn) {
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <Switch>
                <Route exact path="/" render={() => (<LoginSignup updateUser={this.updateUser} getCurrentEmail={this.getCurrentEmail} setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} />)} />
                <Route path="/forgot" component={ForgotPassword} />
                <Route path="/reset/:token" component={ResetPassword} />
              </Switch>
            </div>
          </MuiThemeProvider>
        </div>
      );
    } else {
      return (
        <div>
          <MuiThemeProvider>
          <div id="widget" className="widget">
            <Clock getCurrentDate={this.getCurrentDate} />
            <Weather getAuthentication={this.getAuthentication} />
          </div>
<<<<<<< HEAD
            <Avatar size={97} src="https://www.sideshowtoy.com/photo_903079_thumb.jpg" style={{transform:  'translate(-50%, -50%)', marginLeft:'50%', marginRight:'50%'}}/>
=======
            <Avatar size={97} src={this.state.avatar} style={{transform:  'translate(-50%, -50%)', marginLeft:'50%', marginRight:'50%'}}/>
>>>>>>> Add server routes and client-side requests for storing / fetching linked & stored bank accounts
          <Switch>
            <Route exact path="/" render={() => (
              <div>
                {/*<i style={{'font-size':'100px'}} className="material-icons">keyboard_arrow_right</i>*/}
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar">
                  <Link onClick={this.w3Click} to="/" className="bar-item bar-select">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item">Investors</Link>
                  <br/><br/><br/>
                </div>
                <InputBalance currency={this.state.currency} updateCurrency={this.updateCurrency} currencySymbols={this.currencySymbols} updateUser={this.updateUser} currentEmail={this.state.currentEmail} /><br />
                <h2 style={{display: 'inline-block', padding: '7px', marginLeft:'10%', width: '80%', color:'rgba(0,150,136 ,1)'}}>You have spent daily on average <span style={{color: 'rgba(48,63,159 ,1)'}}>{this.currencySymbols()}{this.calculateExpensePerDay()}</span><span style={{color:'red'}}>.</span></h2>
                <h2 style={{display: 'inline-block', padding: '7px',marginLeft:'10%', width: '80%', color:'rgba(0,150,136 ,1)'}}>You have on average <span style={{color: 'rgba(48,63,159 ,1)'}}>{this.currencySymbols()}{this.calculateBalanceLeft()}</span> to spend daily for the rest of the month<span style={{color:'red'}}>.</span></h2><br /><br />
                <Graph renderGraph={this.renderGraph} loading={this.state.loading} renderBankGraph={this.renderBankGraph} updateBankInfo={this.updateBankInfo} one={this.state.one} rec={this.state.rec} currentEmail={this.state.currentEmail} />
                <canvas id='averageDoughnutChart'/>
              </div>
            )} />
            <Route path="/expense" render={() => (
              <div>
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar">
                  <Link onClick={this.w3Click} to="/" className="bar-item">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item bar-select">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item">Investors</Link>
                </div>
                <br/><br/><br/>
                <Expenses currencySymbols={this.currencySymbols} updateUser={this.updateUser} currentEmail={this.state.currentEmail} />
                <br /><br />
                <ExpenseTable currencySymbols={this.currencySymbols} one={this.state.one} rec={this.state.rec} />
              </div>
            )}/>
            <Route path="/investor" render={() => (
              <div>
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar">
                  <Link onClick={this.w3Click} to="/" className="bar-item">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item bar-select">Investors</Link>
                </div>
                <br/><br/><br/>
                <NPVCalculator currency={this.currencySymbols(this.state.currency)} />
              </div>
            )}/>
            <Route path="/bank" render={() => (
              <div>
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar">
                  <Link onClick={this.w3Click} to="/" className="bar-item">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item bar-select">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item">Investors</Link>
                </div>
                <br/><br/><br/>
                <Plaid loading={this.loading} renderBankGraph={this.renderBankGraph} updateBankInfo={this.updateBankInfo} email={ this.state.currentEmail }/>
              </div>
            )} />
          </Switch>
          <br /><br /><br /><br />
          <button onClick={this.setLogoutState} type="" className="btn btn-danger">Logout</button>
          <a href="#widget" style={{margin:'7px'}} onClick={this.resetUser} className="btn btn-default">Reset Expenses</a>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

export default App;
