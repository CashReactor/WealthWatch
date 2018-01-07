import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chart from 'chart.js';
import $ from 'jquery';
import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';
import Graph from './Graph.jsx';
import ExpenseTable from './expenseTable.jsx';
import InputBalance from './inputBalance.jsx';
import Clock from './clock.jsx';
import Weather from './weather.jsx';
import LoginSignup from './loginSignup.jsx';
import Expenses from './expenses.jsx'
// import ExpenseGraph from './expenseGraph.jsx';
import NPVCalculator from './npvCalculator.jsx'
import ForgotPassword from './forgotPassword.jsx';
import ResetPassword from './resetPassword.jsx';
import Plaid from './plaidConsole.jsx';
import Avatar from 'material-ui/Avatar';
import BarGraph from './barGraph.jsx';
import LineGraph from './lineGraph.jsx';
import RetirementCalculator from './retirementCalculator.jsx';
import Ionicon from 'react-ionicons'

import CryptoCurrency from './cryptoCurrency.jsx'

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
      currency: '',
      bank: false,
      loading: false,
      avatar: '',
      totalOneExpense: 0,
      totalRecExpense: 0,
      banks: {},
      graphs: {},
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
    this.updateBanks = this.updateBanks.bind(this);
    this.renderSelectGraph = this.renderSelectGraph.bind(this);
    this.analyzeExpenditure = this.analyzeExpenditure.bind(this);
    this.analyzeBalance = this.analyzeBalance.bind(this);
    this.updateExpenseList = this.updateExpenseList.bind(this);
    this.filterNavbar = this.filterNavbar.bind(this);
    this.welcomeUser = this.welcomeUser.bind(this);
    this.toggleExpensePie = this.toggleExpensePie.bind(this);
  }

  componentDidMount() {
    this.updateUser();
    $(document).on('click', 'a[href^="#"]', function(event) {
      event.preventDefault();

      $('html, body').animate(
        {
          scrollTop: $($.attr(this, 'href')).offset().top,
        },
        700
      );
    });

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
    });
  }

  updateBanks(banks) {
    this.setState({ banks });
  }

  resetUser() {
    axios.post('/reset', { email: this.state.currentEmail })
      .then((response) => {
        this.updateUser();
      });
  }

  updateCurrency(currency) {
    this.setState({ currency: currency });
  }

  updateExpenseList(type, id) {
    if (type === 'one') {
      const { one } = this.state;
      for (let i = 0; i < one.length; i++) {
        if (one[i]._id === id) {
          one.splice(i, 1);
          this.setState({ one });
        }
      }
    } else if (type === 'recurring') {
      const { rec } = this.state;
      for (let i = 0; i < rec.length; i++) {
        if (rec[i]._id === id) {
          rec.splice(i, 1);
          this.setState({ rec });
        }
      }
    }
  }

  updateUser() {
    axios.post('/user', { email: this.state.currentEmail }).then((response) => {
      if (!response.data.budget) {
        response.data.budget = '0';
      }
      this.setState({
        budget: Number(response.data.budget),
        one: response.data.oneTime,
        rec: response.data.recurring,
        currency: response.data.currency,
        avatar: response.data.gravatar,
      });

      var totalOneExpense = 0, totalRecExpense = 0;

      if (this.state.one.length !== 0) {
        console.log('this part should not be hit but is hit');
        totalOneExpense = this.state.one.map((expense) => {
          if (new Date(expense.date).getMonth() + 1 === this.state.currentDate.getMonth() + 1) {
            return expense.amount;
          } else {
            return 0;
          }
        }).reduce((acc, cur) => (acc + cur));
      }

      if (this.state.rec.length !== 0) {
        totalRecExpense = this.state.rec.map(function(expense) {
          return expense.amount;
        }).reduce((acc, cur) => (acc + cur));
      }

      this.setState({
        totalOneExpense,
        totalRecExpense,
      });
      //if (window.location.href.slice(21) === '/') {
      this.renderGraph();
      this.renderAverageExpensePie();
      //
    });
  }

  renderSelectGraph(bank, accounts, transactions) {
    // $(`.loader${bank}`).toggle();
    // $(`.companyLogo${bank}`).toggle();
    // $(`.bankInfo${bank}`).css('display', 'grid');

    if (this.state.graphs[bank]) {
      this.state.graphs[bank][0].destroy();
      this.state.graphs[bank][1].destroy();
    }

    let days = [];
    let budget = [];
    let expenses = [];
    let day = this.state.currentDate.getDate();
    let month = 12 //this.state.currentDate.getMonth() + 1;
    let year = 2017 //this.state.currentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month, year);

    var totalBalance = 0;

    accounts.forEach(function(account) {
      if (account.balances.available) {
        totalBalance += account.balances.available;
      } else {
        totalBalance += account.balances.current;
      }
    })

    for (let i = 0; i <= daysInMonth; i++) {
      days.push(i);
      budget.push(totalBalance);
      expenses.push(0);
    }

    transactions.forEach(function(transaction) {
      var trAmount = transaction.amount;
      var date = transaction.date.split('-');
      var trYear = Number(date[0])
      var trMonth = Number(date[1]);
      var trDay = Number(date[2]);
      if (year === trYear && month === trMonth) {
        expenses[trDay] += trAmount;
        //this is to start the budget previous to expenses being charged
        for (var k = 0; k <= daysInMonth; k++) {
          budget[k] += trAmount;
        }
        //this is to apply expenses for the respective days they occurred
        for (var i = trDay; i <= daysInMonth; i++) {
          budget[i] -= trAmount;
        }
      }
    })

    let barCtx = document.getElementById(`${bank}Chart`);
    let lineCtx = document.getElementById(`${bank}LineChart`)

    let positiveColor = 'rgba(54, 162, 235, 0.7)';

    let color = budget.map((balance, index) => {
      if (balance > 0) {
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
            label: `Current Monthly Expenditure of ${bank} ($)`,
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
            label: `Current Monthly Balance of ${bank} ($)`,
            data: budget,
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

    var graphs = this.state.graphs;
    graphs[bank] = [barGraph, lineGraph];

    this.setState({
      graphs
    })

    $(`#${bank}Chart`).css('display', 'inline-block');
    $(`#${bank}LineChart`).css('display', 'inline-block');
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
    let month = 12 //this.state.currentDate.getMonth() + 1;
    let year = 2017 //this.state.currentDate.getFullYear();
    let daysInMonth = this.daysInMonth(month, year);

    for (let i = 0; i <= daysInMonth; i++) {
      days.push(i);
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
    let barCtx = document.getElementById('bankChart');
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
    $('#bankChart').css('display', 'inline-block');
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
      var expenseDay = new Date(this.state.one[i].date).getDate();
      var expenseMonth = new Date(this.state.one[i].date).getMonth() + 1;
      var expenseYear = new Date(this.state.one[i].date).getFullYear();
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
    // expenses[1] = totalRecExp;
    let barCtx = document.getElementById('balanceChart');
    let lineCtx = document.getElementById('balanceLineChart');
    let updatedBudgets = budget;
    let positiveColor = 'rgba(54, 162, 235, 0.7)';

    let color = updatedBudgets.map((budget, index) => {
      if (budget >= 0) {
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

  renderAverageExpensePie() {
    var data = {
      datasets: [{
        label: 'Average US expenditure composition (Single)',
        data: [12.4, 36.7, 15.9, 7.3, 8.9],
        backgroundColor: [
          'rgba(100,181,246 ,1)',
          'rgba(77,182,172 ,1)',
          '#FFEB3B',
          'rgba(255,183,77 ,1)',
          'rgba(229,115,115 ,1)'
        ],
      }],
      labels:
        ['Foods(%)', 'Housing(%)', 'Transportation(%)', 'Healthcare(%)', 'Insurance and Pension(%)']
      ,
    }
    var ctx = document.getElementById('averageExpensePie');
    var averageExpensePie = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        'animation.animateRotate': true,
        'cutoutPercentage': '37',
      },
    })
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

  setLoginState(token, email, currency = '$') {
    this.setState({
      loggedIn: true,
      token: token,
      currentEmail: email
    });
    // this.renderChart();
    window.localStorage.setItem('wealthwatch_token', token);
    window.localStorage.setItem('user_email', email);
  }

  setLogoutState(event, history) {
    event.preventDefault();
    this.setState({
      loggedIn: false,
      token: '',
    }, () => {
      history.push('/');
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
    );
  }

  calculateExpensePerDay() {
    return Math.round((this.state.totalOneExpense + this.state.totalRecExpense) / (new Date()).getDate());
  }

  calculateBalanceLeft() {
    console.log('this.state.totalOneExpense', this.state.totalOneExpense);
    console.log('this.state.totalRecExpense', this.state.totalRecExpense);
    return Math.round((this.state.budget - this.state.totalOneExpense - this.state.totalRecExpense) / (Math.max(this.state.daysInMonth - (new Date()).getDate()), 1));
  }

  analyzeExpenditure() {
    return (
      <h2 style={{display: 'inline-block', padding: '7px', marginLeft:'10%', width: '80%', color:'rgba(0,150,136 ,1)'}}>You have spent daily on average <span style={{color: 'rgba(48,63,159 ,1)'}}>{this.currencySymbols()}{this.calculateExpensePerDay()}</span><span style={{color:'red'}}>.</span></h2>
    );
  }

  welcomeUser() {
    return(
      <h2 style={{display: 'inline-block', padding: '7px', marginLeft:'10%', width: '80%', color:'rgba(0,150,136 ,1)'}}> Welcome to WealthWatch,
      <span style={{color: 'rgba(48,63,159 ,1)'}}>{this.state.name}
      </span>
      <br /><br /> Your comprehensive tool for simplified personal finance!
      <br /><br />
      This is your home page. Here you will get a visual overview of your current budget and recent spending behavior. This is here to help you make quick decisions in the moment, based off of historical and real-time intelligence.
      <br /><br />
      You can manually adjust for your balance at anytime below! You can also see your budget over time, and your expenses by category.
      <br /><br />
      </h2>
      )
  }

  toggleExpensePie() {
    if ((this.state.totalOneExpense + this.state.totalRecExpense) > 0) {
      return (
        <ExpenseGraph oneExpenses={this.state.one} recExpenses={this.state.rec}/>
        )
    }
  }

  analyzeBalance() {
    if (this.calculateBalanceLeft() < 0) {
      return (
        <h2 style={{display: 'inline-block', padding: '7px',marginLeft:'10%', width: '80%', color:'rgba(0,150,136 ,1)'}}>You have overspent <span style={{color: 'rgba(48,63,159 ,1)'}}>{this.currencySymbols()}{this.calculateBalanceLeft()}</span> this month<span style={{color:'red'}}>.</span></h2>
      );
    }
    if (this.state.daysInMonth === this.state.currentDate.getDate()) {
      return (
        <h2 style={{display: 'inline-block', padding: '7px',marginLeft:'10%', width: '80%', color:'rgba(0,150,136 ,1)'}}>You have <span style={{color: 'rgba(48,63,159 ,1)'}}>{this.currencySymbols()}{this.calculateBalanceLeft()}</span> left to spend or invest this month<span style={{color:'red'}}>!</span></h2>
      )
    } else {
      return (
        <h2 style={{display: 'inline-block', padding: '7px',marginLeft:'10%', width: '80%', color:'rgba(0,150,136 ,1)'}}>You have an average of <span style={{color: 'rgba(48,63,159 ,1)'}}>{this.currencySymbols()}{this.calculateBalanceLeft()}</span> budgeted per day for the rest of this month<span style={{color:'red'}}>.</span></h2>
      )
    }
  }

  filterNavbar(props) {
    var scope = this;
    if (this.state.loggedIn) {
      return (
        <nav className= "navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#top">WealthWatch</a>
            </div>
            <ul className="nav navbar-nav">

              <li><a href="#top">Made with <Ionicon icon="md-heart" fontSize="17px" color="red" beat={true} /> by Cash Reactors - Dan, Anto, Jacob, and Mike!</a>
              </li>
            </ul>
            <div id="space"></div>
            <button
              onClick={(event) => {this.setLogoutState(event, props.history)} }
              className="btn btn-danger"
              style={{marginTop: '10px', float: 'right'}}
            >
              Logout
            </button>
          </div>
        </nav>
      );
    } else {
      return (
        <nav className = "navbar navbar-default navbar-fixed-bottom">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#top">WealthWatch</a>
            </div>
            <ul className="nav navbar-nav">
              <li><a href="#top">Made with<i className="ion-android-favorite icon-medium"></i>by Cash Reactors - Dan, Anto, Jacob, and Mike!</a>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div>
          <MuiThemeProvider>
            <div>
              <Switch>
                <Route exact path="/" render={(props) => (<LoginSignup updateUser={this.updateUser} getCurrentEmail={this.getCurrentEmail} setLoginState={this.setLoginState} setLogoutState={this.setLogoutState} location={props.location}/>)} />
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
          <Avatar size={97} src={this.state.avatar} style={{marginTop: '1%', transform:  'translate(-50%, -50%)', marginLeft:'50%', marginRight:'50%'}}/>
          <Switch>
            <Route exact path="/" render={(props) => (
              <div>
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar">
                  <Link onClick={this.w3Click} to="/" className="bar-item bar-select">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item">Investors</Link>
                  <br/><br/><br/>
                </div>
                <h2 className="welcomeHeader" style={{width: '90%', margin: '0 auto', fontSize:'3em', textAlign:'right'}}><span className='welcome' style={{width:'100%', fontSize:'2.7em'}}>Welcome to WealthWatch<span style={{color:'red'}}>.</span></span> Enter your balance with the appropriate currency to chart your balance and expenses below<span style={{color:'red'}}>.</span></h2><br /><br />
                {/*this.welcomeUser()*/}
                <br /><br />
                <InputBalance currency={this.state.currency} updateCurrency={this.updateCurrency} currencySymbols={this.currencySymbols} updateUser={this.updateUser} currentEmail={this.state.currentEmail} /><br />
                {this.analyzeExpenditure()}
                {this.analyzeBalance()}<br /><br />
                <canvas id="averageExpensePie"/>
                <br />
                {/*this.toggleExpensePie()*/}
                {/*<ExpenseGraph oneExpenses={this.state.one} recExpenses={this.state.rec}/>*/}
                <br /><br /><br />
                <Graph renderEPie={this.renderAverageExpensePie} renderGraph={this.renderGraph} loading={this.state.loading} renderBankGraph={this.renderBankGraph} updateBankInfo={this.updateBankInfo} one={this.state.one} rec={this.state.rec} currentEmail={this.state.currentEmail} />
                <a href="#widget" style={{margin:'7px'}} onClick={props.resetUser} className="btn btn-default">Reset Expenses</a>
                {this.filterNavbar(props)}
              </div>
            )} />
            <Route path="/expense" render={(props) => (
              <div>
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar navigator">
                  <Link onClick={this.w3Click} to="/" className="bar-item">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item bar-select">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item">Investors</Link>
                </div>
                <br /><br /><br /><br />
                <h2 style={{display:'block', width: '70%', margin: '0 auto', fontSize:'5em'}}>You can add, delete, and view all your expenses here<span style={{color:'red'}}>.</span> <br /><br /></h2>
                <br/>
                {/*<ExpenseGraph oneExpenses={this.state.one} recExpenses={this.state.rec}/>*/}

                <Expenses currencySymbols={this.currencySymbols} updateUser={this.updateUser} currentEmail={this.state.currentEmail} />
                <br />
                <ExpenseTable updateExpenseList={this.updateExpenseList} currentEmail={this.state.currentEmail} currencySymbols={this.currencySymbols} one={this.state.one} rec={this.state.rec} />
                <br />
                <div className="expenseButtonGroup">
                  <a href="#widget" style={{margin:'7px'}} onClick={props.resetUser} className="btn btn-default expenseButton2">Reset Expenses</a>
                </div>
                {this.filterNavbar(props)}
              </div>
            )}/>
            <Route path="/investor" render={(props) => (
              <div>
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar">
                  <Link onClick={this.w3Click} to="/" className="bar-item">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item bar-select">Investors</Link>
                </div>
                <br/><br/><br/>
                {/*<RetirementCalculator currency={this.currencySymbols(this.state.currency)}/>*/}
                <NPVCalculator currency={this.currencySymbols(this.state.currency)} />
                <br/><br/>
                <CryptoCurrency />
                <br/><br/>
                <a href="#widget" style={{margin:'7px'}} onClick={props.resetUser} className="btn btn-default">Reset Expenses</a>
                {this.filterNavbar(props)}
              </div>
            )}/>
            <Route path="/bank" render={(props) => (
              <div>
                <div style={{width:'70%', margin:'0 auto', borderColor: 'grey'}} className="bar">
                  <Link onClick={this.w3Click} to="/" className="bar-item">Home</Link>
                  <Link onClick={this.w3Click} to="/expense" className="bar-item">Expenses</Link>
                  <Link onClick={this.w3Click} to="/bank" className="bar-item bar-select">Bank</Link>
                  <Link onClick={this.w3Click} to="/investor" className="bar-item">Investors</Link>
                </div>
                <br/><br/><br/>
                <Plaid renderSelectGraph={this.renderSelectGraph} banks={this.state.banks} updateBanks={this.updateBanks} loading={this.loading} renderBankGraph={this.renderBankGraph} updateBankInfo={this.updateBankInfo} email={ this.state.currentEmail }/>
                <br /><br /><br /><br />
                <a href="#widget" style={{margin:'7px'}} onClick={props.resetUser} className="btn btn-default">Reset Expenses</a>
                {this.filterNavbar(props)}
              </div>
            )} />
          </Switch>
          </MuiThemeProvider>
        </div>
      );
    }
  }
}

export default App;

