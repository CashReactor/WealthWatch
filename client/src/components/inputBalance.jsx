import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './graph.jsx';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css'


class InputBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: '',
      budgetInput: false,
      currency: null
    }
    this.budgetToggle = this.budgetToggle.bind(this);
    this.searchBar = this.searchBar.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
  }

  onInputChange(e) {
    // e.preventDefault();
    this.setState({
      budget: e.target.value
    })
  }

  onCurrencyChange(e) {
    // e.preventDefault();
    this.setState({
      currency: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
  }

  searchBar() {
    if (this.state.budgetInput) {
      return (
        <div>
          <form onSubmit={this.onSubmit}>
            Input Balance: <input type="text" placeholder="Enter budget amount" value={this.state.budget} onChange={this.onInputChange} name="balance"/><br></br>
            <select onChange={this.onCurrencyChange} id="currency" name="currency_code">
              <option value="">Select Currency</option>
              <option value="USD">U.S. Dollar</option>
              <option value="AUD">Australian Dollar</option>
              <option value="BRL">Brazilian Real </option>
              <option value="CAD">Canadian Dollar</option>
              <option value="CZK">Czech Koruna</option>
              <option value="DKK">Danish Krone</option>
              <option value="EUR">Euro</option>
              <option value="HKD">Hong Kong Dollar</option>
              <option value="HUF">Hungarian Forint </option>
              <option value="ILS">Israeli New Sheqel</option>
              <option value="JPY">Japanese Yen</option>
              <option value="MYR">Malaysian Ringgit</option>
              <option value="MXN">Mexican Peso</option>
              <option value="NOK">Norwegian Krone</option>
              <option value="NZD">New Zealand Dollar</option>
              <option value="PHP">Philippine Peso</option>
              <option value="PLN">Polish Zloty</option>
              <option value="GBP">Pound Sterling</option>
              <option value="SGD">Singapore Dollar</option>
              <option value="SEK">Swedish Krona</option>
              <option value="CHF">Swiss Franc</option>
              <option value="TWD">Taiwan New Dollar</option>
              <option value="THB">Thai Baht</option>
              <option value="TRY">Turkish Lira</option>
            </select>
            <input value="Submit" type="submit"></input>
          </form>
        </div>
      )
    }
  }

  budgetToggle() {
    this.setState({budgetInput: !this.state.budgetInput})
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.budgetToggle}>Balance</button>
        {this.searchBar()}
      </div>
    )
  }
}

export default InputBalance;
