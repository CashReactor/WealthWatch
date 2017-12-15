import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const styles = {
  paper: {
    height: '50%',
    length: '50%',
    margin: '0 auto',
    textAlign: 'center',
    width: '70%',
    backgroundColor: '#DCEDC8',
  },
};

class InputBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: '',
      budgetInput: true,
      currency: '',
    };
    this.budgetToggle = this.budgetToggle.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCurrencyChange = this.onCurrencyChange.bind(this);
  }

  onInputChange(e) {
    // e.preventDefault();
    this.setState({
      budget: e.target.value,
    });
  }

  onCurrencyChange(e) {
    // e.preventDefault();
    this.setState({
      currency: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const data = {
      email: this.props.currentEmail,
      budget: this.state.budget,
      currency: this.state.currency,
    };
    axios.post('updateBalance', data).then((response) => {
      this.setState({
        budget: '',
        currency: '',
      });
      this.props.updateUser();
      console.log('updating budget successful');
    });
  }

  currencySymbols(letter) {
    switch(letter) {
      case 'USD':
        return <span>&#36;</span>;
      case 'AUD':
        return <span>&#36;</span>;
      case 'BRL':
        return <span>R&#36;</span>;
      case 'CAD':
        return <span>&#36;</span>;
      case 'CZK':
        return <span>&#x4b;&#x10d;</span>;
      case 'DKK':
        return <span>&#x6b;&#x72;</span>;
      case 'EUR':
        return <span>&#x20ac;</span>;
      case 'HKD':
        return <span>&#36;</span>;
      case 'HUF':
        return <span>&#x46;&#x74;</span>;
      case 'ILS':
        return <span>&#x20aa;</span>;
      case 'JPY':
        return <span>&#xa5;</span>;
      case 'MYR':
        return <span>&#x52;&#x4d;</span>;
      case 'MXN':
        return <span>&#x24;</span>;
      case 'NOK':
        return <span>&#x6b;&#x72;</span>;
      case 'NZD':
        return <span>&#x24;</span>;
      case 'PHP':
        return <span>&#x20b1;</span>;
      case 'PLN':
        return <span>&#x7a;&#x142;</span>;
      case 'GBP':
        return <span>&#xa3;</span>;
      case 'SGD':
        return <span>&#x53;&#x24;</span>;
      case 'SEK':
        return <span>&#x6b;&#x72;</span>;
      case 'CHF':
        return <span>&#x43;&#x48;&#x46;</span>;
      case 'TWD':
        return <span>&#x4e;&#x54;&#x24;</span>;
      case 'THB':
        return <span>&#xe3f;</span>;
      case 'TRY':
        return <span>&#x54;&#x4c;</span>;
    }
  }

  bootstrapBar() {
    return (
      <div>
        <div className="form-group">
          <h1 className="header">{this.currencySymbols('TRY')}Balance</h1>
          <label id="label" htmlFor="inputBudget">Enter balance</label>
          <input
            value={this.state.budget}
            type="number"
            onChange={this.onInputChange}
            className="form-control"
            id="input"
            placeholder="Enter Balance"
          />
          <small id="small" className="form-text text-muted">
            We won't share your income to anyone else.
          </small>
          <br />
          <br />
          <label id="label" htmlFor="inputCurrency">Select currency</label>
          <select value={this.state.currency} onChange={this.onCurrencyChange} className="form-control" id="select">
            <option value="">Select Currency</option>
            <option value="USD">U.S. Dollar</option>
            <option value="AUD">Australian Dollar</option>
            <option value="BRL">Brazilian Real</option>
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
          <a
            id="btn"
            href="#widget"
            onClick={this.onSubmit}
            style={{ margin: '1vh' }}
            type="submit"
            className="btn btn-responsive btn-primary"
          >
            Submit
          </a>
        </div>
      </div>
    );
  }

  budgetToggle() {
    this.setState({ budgetInput: !this.state.budgetInput });
  }

  render() {
    return (
      <div>
        <Paper style={{ paddingTop: '7px', width: '77%', marginLeft: '11.5%', marginRight: '11.5%' }}>
          {this.bootstrapBar()}
        </Paper>
      </div>
    );
  }
}

export default InputBalance;
