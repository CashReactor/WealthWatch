import React from 'react';

class OneExpense extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      addExpense: '',
      category: '',
      one: []
    }

    onInputChange = onInputChange.bind(this);
    onCategoryChange = onCategoryChange.bind(this);
  }

  onInputChange(e) {
    e.preventDefault();
    this.setState({
      addExpense: e.target.value
    })
  }

  onCategoryChange(e) {
    e.preventDefault();
    this.setState({
      category: e.target.value
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.onSubmit}>
            Add one-time expense: <input type="text" placeholder="Enter expense" value={this.state.budget} onChange={this.onInputChange} name="one"/><br></br>
            <select onChange={this.onCurrencyChange} id="currency" name="currency_code">
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
}

export default OneExpense;