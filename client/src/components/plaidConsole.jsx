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
      link: false,
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
          // $('#container').fadeOut('fast', function() {
          //   $('#intro').hide();
          //   $('#app2, #steps').fadeIn('slow');
          // });
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
      <div style={{ width:'70%', margin:'auto'}}>
        <button onClick={this.onClick} style={{margin:'0 auto 7% auto', display: 'block'}} className="btn btn-primary" id="link-btn">Link Account</button>
        <canvas id="bankChart" />

        {/*<div style={{display:'flex', flexFlow: 'row wrap', justifyContent: 'space-around'}}>
          <button style={{margin:'auto'}} className="btn btn-primary" id="get-btn">Get Accounts</button>
          <button  style={{margin:'auto'}} className="btn btn-primary" id="get-btn">Get Item</button>
          <button style={{margin:'auto'}} className="btn btn-primary" id="get-btn">Get Transactions</button>
        </div>*/}
      </div>
    );
  }
}

export default Plaid;
