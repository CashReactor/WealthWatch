import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/Graph.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      budgetInput: false
    }
    this.budgetToggle = this.budgetToggle.bind(this);
    this.searchBar = this.searchBar.bind(this);
  }

  searchBar() {
    if (this.state.budgetInput) {
      return (
        <div>
          <form action="">
            Input Balance: <input type="text" name="balance"/><br></br>
            <select name="currency_code">
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

          </form>
        </div>
      )
    } else {
      return (
        <div>
          Hello World
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
        <Graph />
        <button type="button" onClick={this.budgetToggle} className="btn">Balance</button>
        {this.searchBar()}
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);
