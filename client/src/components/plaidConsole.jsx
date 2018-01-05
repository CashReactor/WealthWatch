import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import MobileTearSheet from './mobileTearSheet.jsx';
import { List, ListItem } from 'material-ui/List';

class Plaid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: '',
      accounts: [],
      transactions: [],
      item: '',
      link: false,
      acPlus: false,
      trPlus: false,
      baPlus: false,
      counter: 0,
    };
   this.onClick = this.onClick.bind(this);
   this.getTransactions = this.getTransactions.bind(this);
   this.getBankInfo = this.getBankInfo.bind(this);
   this.plusToggle = this.plusToggle.bind(this);
   this.renderAccountList = this.renderAccountList.bind(this);
   this.renderBankInfo = this.renderBankInfo.bind(this);
   this.renderBankLogo = this.renderBankLogo.bind(this);
   this.renderTransactionsList = this.renderTransactionsList.bind(this);
   this.postBanks = this.postBanks.bind(this);
   this.getBanks = this.getBanks.bind(this);
   this.renderAggregateBankLogos = this.renderAggregateBankLogos.bind(this);
   this.renderBanks = this.renderBanks.bind(this);
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

    $('#acPlus').on('click', function() {
      that.setState({
        acPlus: !that.state.acPlus
      })

      $(this).toggleClass('list-select')
      $('.accountList').slideToggle('slow');

      if (that.state.acPlus) {
        $(this).text('Account information -');
      } else {
        $(this).text('Account information +');
      }
    })

    $('#baPlus').on('click', function() {
      that.setState({
        baPlus: !that.state.baPlus
      })

      $(this).toggleClass('list-select')
      $('.bankList').slideToggle('slow');

      if (that.state.baPlus) {
        $(this).text('Bank information -');
      } else {
        $(this).text('Bank information +');
      }
    })

    $('#trPlus').on('click', function() {
      that.setState({
        trPlus: !that.state.trPlus
      })

      $(this).toggleClass('list-select')
      $('.transactionsList').slideToggle('slow');

      if (that.state.trPlus) {
        $(this).text('Transactions -');
      } else {
        $(this).text('Transactions +');
      }
    })

    this.getBanks();
  }

  onClick() {
    this.state.handler.open();
  }

  getBanks() {
    var that = this;
    axios.post('/getBanks', { email: this.props.email })
    .then((response) => {
      console.log('-----this is the bank we get from the database------', response.data)
      var banks = response.data[0];
      if (!banks) {
        return;
      }
      // this.setState({
      //   counter: Object.keys(banks).length
      // });
      this.props.updateBanks(banks);
      var aggregateAccounts = [];
      var aggregateTransactions = [];
      Object.keys(banks).forEach(function(bank) {
        var accounts = banks[bank][0];
        var transactions = banks[bank][1];
        var totalAccount = 0;
        aggregateAccounts = aggregateAccounts.concat(accounts);
        aggregateTransactions = aggregateTransactions.concat(transactions);
        that.props.renderSelectGraph(bank, accounts, transactions);
      })
      that.props.renderSelectGraph('Aggregate', aggregateAccounts, aggregateTransactions);
      $('.Aggregate').toggle();
    })
  }

  postBanks() {
    console.log(' THIS IS THE EMAIL', this.props.email);
    var data = { email: this.props.email, bank: [this.state.item.institution.name, this.state.accounts, this.state.transactions] };
    console.log('*******************this is the bank info*****',data);
    axios.post('/postBanks', data)
    .then((response) => {
      console.log('************the bank information got stored in the database************')
    })
  }

  getBankInfo() {
    this.getAccounts(() => {
      this.getItem(()=> {
        this.getTransactions(() => {
          console.log('these are the states', this.state.accounts, this.state.item, this.state.transactions);
          this.postBanks();
          this.props.updateBankInfo(this.state.accounts, this.state.item, this.state.transactions);
          // this.props.renderSelectGraph('bank', this.state.accounts, this.state.transactions)
          this.props.renderBankGraph();
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
      // console.log('THIS IS THE ACCOUNTS WE RECEIVE', data.data.accounts);
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
      // console.log('THIS IS THE ITEM WE RECEIVE', data.data);
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
      // console.log('THIS IS THE TRANSACTIONS WE RECEIVE', data.data.transactions);
      this.setState({
        transactions: data.data.transactions
      })
      // console.log('THIS IS THE TRANSACTIONS THAT WE RECEIVE', data.data.transactions, 'AND THIS IS THE FIRST ELEMENT OF THE TRANSACTIONS');
      //data.transactions.forEach((transaction) => { transaction.name, transaction.amount, transaction.date })
      cb();
    })
  }

  plusToggle(e) {
    this.setState({
      [e.target.name]: !this.state[e.target.name]
    })
  }

  renderAccountList() {
    return (
      <div>
        <List className='accountList'>
          {this.state.accounts.map(function(account) {
            var balance;
            var available = account.balances.available;
            if (available) {
              balance = available;
            } else {
              balance = account.balances.current;
            }
            return (
              <ListItem className="list-element">
                {account.name}: ${balance}
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }

  renderTransactionsList() {
    return(
      <div>
        <List className="transactionsList">
          {this.state.transactions.map(function(transaction) {
            return (
              <ListItem className="transaction-element list-element">
                <span style={{display:'block'}}>{transaction.date}</span>
                <span style={{display:'block'}}>{transaction.name}</span>
                <span>${transaction.amount}</span>
              </ListItem>
            )
          })}
        </List>
      </div>
    )
  }

  renderBankLogo() {
    if (this.state.item) {
      var bankName = this.state.item.institution.name.toLowerCase().split(' ').join('');
      return (
        <div className="companyLogo" style={{display:'none', width:'100%'}}>
          <img style={{marginLeft: '50%', transform: 'translate(-50%, -50%)'}} src={'https://logo.clearbit.com/' + bankName + '.com'}/>
        </div>
      )
    }
  }

  selectBankLogo(name) {
    var name = name.toLowerCase().split(' ').join('');
    return (
      <div className="companyLogo" style={{width:'100%'}}>
        <img style={{marginLeft: '42.5%', marginTop: '2.7%', marginBottom: '2.7%', width:'15%' }} src={'https://logo.clearbit.com/' + name + '.com'}/>
      </div>
    )
  }

  renderAggregateBankLogos() {
    if (!this.props.banks) {
      return (
        <div>
        </div>
      )
    }
    var banks = Object.keys(this.props.banks);
    banks = banks.map((bank) => {
      return bank.toLowerCase().split(' ').join('');
    })
    console.log('THESE ARE THE BANKS', banks);
    var length = banks.length;
    var array = [];
    var grid_template_columns;
    var gridCol = String(Math.round(100 / length), 1) + '%';
    for (var i = 0; i < length; i++) {
      array.push(gridCol)
    }
    grid_template_columns = array.join(' ');
    if (length) {
      return (
        <div style={{display: 'grid', 'gridTemplateColumns': grid_template_columns}}>
          {banks.map((bank) => {
            console.log('THIS IS THE BANK', bank);
            return (
              <div>
                <img className='aggregate-logo' style={{marginLeft: '31.5%', width: '37%'}} src={'https://logo.clearbit.com/' + bank + '.com'}/>
              </div>
            )
          })}
        </div>
      )
    }
  }

   renderBankInfo() {
    if (!!this.state.item) {
      return (
        <div className="bankList">
          <h3 style={{color:'lightblue'}}>{bankName}</h3>
        </div>
      )
    }
  }

  renderBanks() {
    if (!this.props.banks) {
      return;
    }
    return(
      <div>
        {Object.keys(this.props.banks).map((bank) => {
          return (
            <div style={{width: '70%', marginLeft:'15%'}}>
              {this.selectBankLogo(bank)}
              <canvas className="bankCharts" id={bank + 'Chart'} />
              <canvas className="bankCharts" id={bank + 'LineChart'} />
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    return (
      <div style={{ width:'100%', margin:'auto'}}>
        <button onClick={this.onClick} style={{margin:'0 auto 7% auto', display: 'block'}} className="btn btn-primary" id="link-btn">Link Account</button>
        <div style={{height: '0px'}}>
          <div className="loader"></div>
          <br /><br />
        </div>
        {this.renderBankLogo()}
        <canvas style={{display: 'none'}} id='bankChart'/>
        <canvas style={{display: 'none'}} id='bankLineChart'/>
        {/*<MobileTearSheet/>*/}

        <div className="bankInfo">
          <div>
            <div onClick={this.plusToggle} id="acPlus" className="bankListButton">Account information +</div>
            {this.renderAccountList()}
          </div>
          <div>
            <div onClick={this.plusToggle} id="trPlus" className="bankListButton">Transactions +</div>
            {this.renderTransactionsList()}
          </div>
        </div>
        {/*this.renderAggregateBankLogos()*/}
        <div style={{width: '70%', marginLeft:'15%', display: 'none'}} className="Aggregate">
          <h1 style={{fontSize: '5em'}}>This is the aggregate of all linked bank accounts<span style={{color:'red'}}>.</span></h1><br /><br />
          <canvas className="bankCharts" id='AggregateChart' />
          <canvas className="bankCharts" id='AggregateLineChart' />
        </div> <br /><br /><br /><br />
        {this.renderBanks()}
      </div>
    );
  }
}

export default Plaid;
