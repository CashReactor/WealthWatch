import React from 'react';
import axios from 'axios';

class RecExpense extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addExpense: '',
      category: '',
      amount: '',
      rec: []
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.searchBar = this.searchBar.bind(this);
  }

  onInputChange(e) {
    // e.preventDefault();
    this.setState({
      addExpense: e.target.value
    })
  }

  onAmountChange(e) {
    // e.preventDefault();
    this.setState({
      amount: e.target.value
    })
  }

  onCategoryChange(e) {
    // e.preventDefault();
    this.setState({
      category: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
  }

  searchBar() {
    return(
      <div>
        <form onSubmit={this.onSubmit}>
            Add recurring expense: <input type="text" placeholder="Enter expense" value={this.state.addExpense} onChange={this.onInputChange} name="rec"/><br></br>
            Add expense amount: <input type="text" placeholder="Enter amount" value={this.state.amount} onChange={this.onAmountChange} name="rec"/><br></br>
            <select onChange={this.onCategoryChange} id="currency" name="currency_code">
              <option value="">Select Category</option>
              <option value={1}>Entertainment</option>
              <option value={2}>Food</option>
              <option value={3}>Rent</option>
              <option value={4}>Others</option>
            </select>
            <input value="Submit" type="submit"></input>
          </form>
      </div>
    )
  }

  render(){
    return(
      <div>
        {this.searchBar()}
      </div>
    )
  }
}

export default RecExpense;