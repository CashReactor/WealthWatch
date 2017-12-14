import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';


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
      this.setState({ expense: '', category: '', amount: '', period: '', rec: response.data });
    });
  }

  bootstrapBar() {
    return (
      <div>
        <div className="form-group">
          <label for="inputExpense">Enter recurring expense</label>
          <input  value={this.state.expense} type="text" onChange={this.onInputChange} className="form-control" id="inputExpense" placeholder="Enter Expense"/>
          <small id="budgetHelp" className="form-text text-muted">Remember this is a one-time expense.</small><br></br><br></br>
          <label for="inputAmount">Enter amount</label>
          <input  value={this.state.amount} type="number" onChange={this.onAmountChange} className="form-control" id="inputAmount" placeholder="Enter Amount"/>
          <br></br>
          <label for="inputPeriod">Select Period</label>
          <select value={this.state.category} onChange={this.onPeriodChange} className="form-control" id="inputPeriod">
            <option value="">Select Period</option>
            <option value="daily">Daily</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select><br></br>
          <label for="inputCurrency">Select Category</label>
          <select  value={this.state.category} onChange={this.onCategoryChange} className="form-control" id="inputCategory">
            <option value="">Select Category</option>
            <option value={1}>Entertainment</option>
            <option value={2}>Food</option>
            <option value={3}>Rent</option>
            <option value={4}>Others</option>
          </select>
          <a href="#widget" onClick={this.onSubmit} style={{margin: '1vh'}} type="submit" className="btn btn-success">Submit</a>
        </div>
      </div>
    )
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
    return (
      <Paper style={{'paddingTop':'7px','width':'77%', marginLeft:'11.5%', marginRight:'11.5'}}>
        {this.bootstrapBar()}
      </Paper>
    )
  }
}

export default RecExpense;
