import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'bootstrap/dist/css/bootstrap.css';


export default class OneExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      category: '',
      amount: '',
      transactionDate: '',
      one: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange(e) {
    this.setState({ expense: e.target.value });
  }

  onAmountChange(e) {
    this.setState({ amount: e.target.value });
  }

  onCategoryChange(e) {
    this.setState({ category: e.target.value });
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
      transactionDate: this.state.transactionDate,
    };
    this.setState({
      expense: '',
      category: '',
      amount: '',
      transactionDate: '',
    });
    axios.post('/api/expense/oneExpense', data).then((response) => {
      this.setState({
        expense: '', category: '', amount: '', rec: response.data, transactionDate: '',
      });
      this.props.updateUser();
    });
  }

  getOneExpenses() {
    axios
      .post('/api/expense/fetchOneExpenses', { email: this.props.currentEmail })
      .then((response) => {
        this.setState({ one: response.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  bootstrapBar() {
    return (
      <div>
        <div className="form-group">
          <h1 className="header">One-time Expense</h1>
          <label id="label" htmlFor="inputExpense">
            Enter one-time expense
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
            Remember this is a one-time expense.
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
          <DayPickerInput value={this.state.transactionDate} onDayChange={this.onDateChange} placeholder="Enter Transaction Date" />
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
    return (
      <Paper
        style={{
          paddingTop: '7px',
          width: '77%',
          marginLeft: '11.5%',
          marginRight: '11.5',
        }}
      >
        {this.bootstrapBar()}
      </Paper>
    );
  }
}
