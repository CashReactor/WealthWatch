import React from 'react';
import axios from 'axios';

class OneExpense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expense: '',
      category: '',
      amount: '',
      one: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  getOneExpenses() {
    axios.post('/fetchOneExpenses', { email: this.props.currentEmail })
    .then((response) => {
      this.setState({ one: response.data })
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

  onSubmit(e) {
    e.preventDefault();
    var data = {
      email: this.props.currentEmail,
      expense: this.state.expense,
      category: this.state.category,
      amount: this.state.amount,
    };
    axios.post('/oneExpense', data).then(response => {
      this.setState({ rec: response.data });
    });
  }

  searchBar() {
    return (
      <div>
        <form>
          Add one-time expense:{' '}
          <input
            type="text"
            placeholder="Enter expense"
            value={this.state.expense}
            onChange={this.onInputChange}
            name="one"
          />
          <br />
          Add expense amount:{' '}
          <input
            type="text"
            placeholder="Enter amount"
            value={this.state.amount}
            onChange={this.onAmountChange}
            name="one"
          />
          <br />
          <select onChange={this.onCategoryChange} id="currency" name="currency_code">
            <option value="">Select Category</option>
            <option value={1}>Entertainment</option>
            <option value={2}>Food</option>
            <option value={3}>Rent</option>
            <option value={4}>Others</option>
          </select>
          <input onClick={this.onSubmit} value="Submit" type="submit" />
        </form>
      </div>
    );
  }

  render() {
    return <div>{this.searchBar()}</div>;
  }
}

export default OneExpense;
