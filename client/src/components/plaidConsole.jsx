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
   this.getTransactions = this.getTransactions.bind(this);
   this.getBankInfo = this.getBankInfo.bind(this);
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
          $('.loader').toggle();
          that.getBankInfo()
        });
      },
    });
    that.setState({ handler: handler });
  }

  onClick() {
    this.state.handler.open();
  }

  getBankInfo() {
    var that = this;
    that.getAccounts(() => {
      that.getItem(()=> {
        that.getTransactions(() => {
          console.log('these are the states', that.state.accounts, that.state.item, that.state.transactions);
          that.props.updateBankInfo(that.state.accounts, that.state.item, that.state.transactions);
          that.props.renderBankGraph();
        });
      });
    });
  }

  getAccounts(cb) {
    axios.post('/accounts', { email: this.props.email })
    .then((data) => {
      if (data.error !== null) {
        // console.log(data.error.error_code + ':' + data.error.error_message);
      }
      console.log('THIS IS THE ACCOUNTS WE RECEIVE', data.data.accounts);
      this.setState({
        accounts: data.data.accounts,
        //data.accounts.forEach((account, idx) {account.name, if (account.balances.available) account.balances.available else account.balances.current})
      })
      cb();
    })
  }

  getItem(cb) {
    axios.post('/item', { email: this.props.email })
    .then((data) => {
      if (data.error !== null) {
        // console.log(data.error.error_code + ':' + data.error.error_message);
      }
      console.log('THIS IS THE ITEM WE RECEIVE', data.data);
      this.setState({
        item: data.data
        //data.institution.name (bank name)
        //data.item.billed_products.join(', ')
        //data.item.available_products.join(', ')
      })
      cb();
    })
  }

  getTransactions(cb) {
    axios.post('/transactions', { email: this.props.email })
    .then((data) => {
      if (data.error !== null) {
        // console.log(data.error.error_code + ':' + data.error.error_message);
      }
      console.log('THIS IS THE TRANSACTIONS WE RECEIVE', data.data.transactions);
      this.setState({
        transactions: data.data.transactions
      })
      console.log('THIS IS THE TRANSACTIONS THAT WE RECEIVE', data.data.transactions, 'AND THIS IS THE FIRST ELEMENT OF THE TRANSACTIONS');
      //data.transactions.forEach((transaction) => { transaction.name, transaction.amount, transaction.date })
      cb();
    })
  }

  render() {
    return (
      <div style={{ width:'70%', margin:'auto'}}>
        <button onClick={this.onClick} style={{margin:'0 auto 7% auto', display: 'block'}} className="btn btn-primary" id="link-btn">Link Account</button>
        <div>
          <div className="loader"></div>
        </div>
        <canvas style={{display: 'none'}} id='bankBarChart'/>
        <canvas style={{display: 'none'}} id='bankLineChart'/>
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
