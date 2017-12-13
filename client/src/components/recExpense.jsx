import React from 'react';
import axios from 'axios';

class RecExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      category: '',
      amount: '',
      period: '',
      rec: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.onPeriodChange = this.onPeriodChange.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getRecExpenses() {
    axios.get('/fetchRecExpenses', { email: this.props.email })
    .then((response) => {
      this.setState({ rec: response.data })
    })
    .catch((err) => {
      throw err;
    })
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

  onSubmit(e) {
    e.preventDefault();
    var data = {
      email: this.props.currentEmail,
      expense: this.state.expense,
      category: this.state.category,
      amount: this.state.amount,
      period: this.state.period,
    };
    axios.post('/recExpense', data).then(response => {
      this.setState({ rec: response.data });
    });
  }

  searchBar() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Add recurring expense:{' '}
          <input
            type="text"
            placeholder="Enter expense"
            value={this.state.expense}
            onChange={this.onInputChange}
            name="rec"
          />
          <br />
          Add expense amount:{' '}
          <input
            type="text"
            placeholder="Enter amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
            name="rec"
          />
          <br />
          <select onChange={this.onCategoryChange} id="currency" name="currency_code">
            <option value="">Select Category</option>
            <option value={1}>Entertainment</option>
            <option value={2}>Food</option>
            <option value={3}>Rent</option>
            <option value={4}>Others</option>
          </select>
          <select onChange={this.onPeriodChange} id="period" name="period">
            <option value="">Select Period</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <input value="Submit" type="submit" />
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.searchBar()}</div>;
  }
}

export default RecExpense;
