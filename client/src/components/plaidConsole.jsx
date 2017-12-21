import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class Plaid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: '',
      accounts: [],
      transactions: [],
      item: '',
    };
   this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    var that = this;

    var handler = window.Plaid.create({
      apiVersion: 'v2',
      clientName: 'Plaid Walkthrough Demo',
      env: 'sandbox',
      product: ['transactions'],
      key: '695c129b2e8fade400802d3ee42a9b',
      onSuccess: function(public_token) {
        $.post('/get_access_token', {
          public_token: public_token,
          email: that.props.email
        }, function() {
          $('#container').fadeOut('fast', function() {
            $('#intro').hide();
            $('#app2, #steps').fadeIn('slow');
          });
        });
      },
    });
    this.setState({ handler: handler });
  }

  onClick() {
    this.state.handler.open();
  }

  getAccounts() {
    axios.post('/accounts', { email: this.props.email })
    .then((data) => {
      if (data.error !== null) {
        console.log(data.error.error_code + ':' + data.error.error_message);
      }
      this.setState({
        accounts: data.accounts,
        //data.accounts.forEach((account, idx) {account.name, if (account.balances.available) account.balances.available else account.balances.current})
      })
    })
  }

  getItem() {
    axios.post('/item', { email: this.props.email })
    .then((data) => {
      if (data.error !== null) {
        console.log(data.error.error_code + ':' + data.error.error_message);
      }
      this.setState({
        items: data
        //data.institution.name (bank name)
        //data.item.billed_products.join(', ')
        //data.item.available_products.join(', ')
      })
    })
  }

  getTransactios() {
    axios.post('/transactions', { email: this.props.email })
    .then((data) => {
      if (data.error !== null) {
        console.log(data.error.error_code + ':' + data.error.error_message);
      }
      this.setState({
        transactions: data.transactions
      })
      //data.transactions.forEach((transaction) => { transaction.name, transaction.amount, transaction.date })
    })
  }

  render() {
    return (
      <div id="app2">
        <button onClick={this.onClick} className="btn btn-info" id="link-btn">Link Account</button>
        <button className="btn btn-info" id="get-accounts-btn">Get Accounts</button>
        <div id="get-accounts-data"></div>
        <button  className="btn btn-info" id="get-item-btn">Get Item</button>
        <div id="get-item-data"></div>
        <button className="btn btn-info" id="get-transactions-btn">Get Transactions</button>
        <div id="get-transactions-data"></div>
      </div>
    );
  }
}

export default Plaid;
