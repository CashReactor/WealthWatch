import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';


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
    this.onSubmit = this.onSubmit.bind(this);
  }

  getOneExpenses() {
    axios.post('/fetchOneExpenses', { email: this.props.currentEmail })
    .then((response) => {
      this.setState({ one: response.data })
    })
    .catch((err) => {
      throw err;
    });
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
      this.setState({ expense: '', category: '', amount: '', rec: response.data });
      this.props.updateUser();
    });
  }

  bootstrapBar() {
    return (
      <div>
        <div className="form-group">
          <h1 className="header">One-time Expense</h1>
          <label id="label" htmlFor="inputExpense">Enter one-time expense</label>
          <input value={this.state.expense} type="text" onChange={this.onInputChange} className="form-control" id="input" placeholder="Enter Expense"/>
          <small id="small" className="form-text text-muted">Remember this is a one-time expense.</small><br></br><br></br>
          <label id="label" htmlFor="inputAmount">Enter amount</label>
          <input value={this.state.amount} type="number" onChange={this.onAmountChange} className="form-control" id="input" placeholder="Enter Amount"/>
          <br></br>
          <label id="label" htmlFor="inputCurrency">Select Category</label>
          <select value={this.state.category} onChange={this.onCategoryChange} className="form-control" id="select">
            <option value="">Select Category</option>
            <option value={1}>Entertainment</option>
            <option value={2}>Food</option>
            <option value={3}>Rent</option>
            <option value={4}>Utilities</option>
            <option value={5}>Others</option>
          </select>
          <a href="#widget" onClick={this.onSubmit} style={{margin: '1vh'}} type="submit" id="btn" className="btn btn-warning">Submit</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <Paper style={{ paddingTop: '7px', width: '77%', marginLeft: '11.5%', marginRight: '11.5' }}>
        {this.bootstrapBar()}
      </Paper>
    );
  }
}

export default OneExpense;
