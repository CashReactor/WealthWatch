import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'bootstrap/dist/css/bootstrap.css';


export default class RecExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      category: '',
      amount: '',
      period: '',
      rec: [],
      transactionDate: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
  }

  onInputChange(e) {
    // e.preventDefault();
    this.setState({
      expense: e.target.value,
    });
  }

  onAmountChange(e) {
    // e.preventDefault();
    this.setState({
      amount: e.target.value,
    });
  }

  onCategoryChange(e) {
    // e.preventDefault();
    this.setState({
      category: e.target.value,
    });
  }

  onPeriodChange(e) {
    this.setState({
      period: e.target.value,
    });
  }

  onDateChange(e) {
    this.setState({
      transactionDate: e,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.props.currentEmail,
      expense: this.state.expense,
      category: this.state.category,
      amount: this.state.amount,
      period: this.state.period,
      startDate: this.state.transactionDate,
    };
    axios.post('/api/expense/recExpense', data).then((response) => {
      this.setState({
        expense: '',
        category: '',
        amount: '',
        period: '',
        transactionDate: '',
        rec: response.data,
      });
      this.props.updateUser();
    });
  }

  getRecExpenses() {
    axios
      .get('/fetchRecExpenses', { email: this.props.email })
      .then((response) => {
        this.setState({ rec: response.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  bootstrapBar() {
    return (
      <div>
        <div className="form-group">
          <h1 className="header">Recurring Expense</h1>
          <label id="label" htmlFor="inputExpense">
            Enter recurring expense
          </label>
          <input
            value={this.state.expense}
            type="text"
            onChange={this.onInputChange}
            className="form-control"
            id="input"
            placeholder="Enter Expense"
          />
          <small id="small" className="form-text text-muted">
            Remember this is a recurring expense.
          </small>
          <br />
          <br />
          <label id="label" htmlFor="inputAmount">
            Enter amount
          </label>
          <div id="inputaddon" className="input-group">
            <div className="input-group-addon">{this.props.currencySymbols()}</div>
            <input
              value={this.state.amount}
              type="number"
              onChange={this.onAmountChange}
              className="form-control"
              placeholder="Enter Amount"
            />
          </div>
          <br />
          <label id="label" htmlFor="inputPeriod">
            Select Period
          </label>
          <select value={this.state.period} onChange={this.onPeriodChange} className="form-control" id="select">
            <option value="">Select Period</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <br />
          <label id="label" htmlFor="inputCurrency">
            Select Category
          </label>
          <select value={this.state.category} onChange={this.onCategoryChange} className="form-control" id="select">
            <option value="">Select Category</option>
            <option value={1}>Entertainment</option>
            <option value={2}>Food</option>
            <option value={3}>Rent</option>
            <option value={4}>Utilities</option>
            <option value={5}>Others</option>
          </select>
          <br />
          <label id="label" htmlFor="">Enter transaction date</label>
          <br />
          <DayPickerInput id="inputaddon" value={this.state.transactionDate} onDayChange={this.onDateChange} placeholder="Enter Transaction Date" />
          <br />
          <button
            onClick={this.onSubmit}
            style={{ margin: '1vh' }}
            type="submit"
            id="btn"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state);
    return (
      <Paper style={{ paddingTop: '7px', width: '77%', marginLeft: '11.5%', marginRight: '11.5' }}>
        {this.bootstrapBar()}
      </Paper>
    );
  }
}
