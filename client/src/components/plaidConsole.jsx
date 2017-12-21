import React from 'react';
import $ from 'jquery';

class Plaid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handler: '',
    };
    // this.createHandler = this.createHandler.bind(this);
    // this.clickHandler = this.clickHandler.bind(this);
  }

  // createHandler() {
  //   var handler = Plaid.create({
  //     apiVersion: 'v2',
  //     clientName: 'Plaid Walkthrough Demo',
  //     env: 'sandbox',
  //     product: ['transactions'],
  //     key: '695c129b2e8fade400802d3ee42a9b',
  //     onSuccess: function(public_token) {
  //       $.post('/get_access_token', {
  //         email: this.props.email,
  //         public_token: public_token
  //       }, function() {
  //         $('#container').fadeOut('fast', function() {
  //           $('#intro').hide();
  //           $('#app, #steps').fadeIn('slow');
  //         });
  //       });
  //     }
  //   });
  //   this.setState({ handler: handler });
  // }

  // clickHandler() {
  //   this.createHandler();
  //   this.state.handler.open();
  // }

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

    $('#link-btn').on('click', function(e) {
      handler.open();
    });

    $('#get-accounts-btn').on('click', function(e) {
      $.post('/accounts', { email: that.props.email }, function(data) {
        $('#get-accounts-data').slideUp(function() {
          var html = '';
          data.accounts.forEach(function(account, idx) {
            html += '<div class="inner">';
            html += '<strong>' + account.name +
              ' $' + (account.balances.available != null ? account.balances.available : account.balances.current) + '</strong><br>';
            html += account.subtype + ' ' + account.mask;
            html += '</div>';
          });

          $(this).html(html).slideDown();
        });
      });
    });

    $('#get-item-btn').on('click', function(e) {
      $.post('/item', { email: that.props.email }, function(data) {
        $('#get-item-data').slideUp(function() {
          if (data.error)
            $(this).html('<p>' + data.error + '</p>').slideDown();
          else {
            var html = '<div class="inner">';
            html += '<p>Here\'s some basic information about your Item:</p>';
            html += '<p>Institution name:' + data.institution.name + '</p>';
            html += '<p>Billed products: ' + data.item.billed_products.join(', ') + '</p>';
            html += '<p>Available products: ' + data.item.available_products.join(', ') + '</p>';
            html += '</div>';

            $(this).html(html).slideDown();
          }
        });
      });
    });

    $('#get-transactions-btn').on('click', function(e) {
      $.post('/transactions', { email: that.props.email }, function(data) {
        if (data.error != null) {
          // Format the error
          var errorHtml = '<div class="inner"><p>' +
           '<strong>' + data.error.error_code + ':</strong> ' +
           data.error.error_message + '</p></div>';

          if (data.error.error_code === 'PRODUCT_NOT_READY') {
            // Add additional context for `PRODUCT_NOT_READY` errors
            errorHtml += '<div class="inner"><p>The PRODUCT_NOT_READY ' +
             'error is returned when a request to retrieve Transaction data ' +
             'is made before Plaid finishes the <a href="https://plaid.com/' +
             'docs/quickstart/#transaction-data-with-webhooks">initial ' +
             'transaction pull.</a></p></div>';
          }
          // Render the error
          $('#get-transactions-data').slideUp(function() {
            $(this).slideUp(function() {
              $(this).html(errorHtml).slideDown();
            });
          });
        } else {
          $('#get-transactions-data').slideUp(function() {
            var html = '';
            data.transactions.forEach(function(txn, idx) {
              html += '<div class="inner">';
              html += '<strong>' + txn.name + '</strong><br>';
              html += '$' + txn.amount;
              html += '<br><em>' + txn.date + '</em>';
              html += '</div>';
            });

            $(this).slideUp(function() {
              $(this).html(html).slideDown();
            });
          });
        }
      });
    });
  }

  render() {
    return (
      <div>
        <div id="container">
          <p>
            Click the button below to open a list of Institutions - after you select one,
            you'll be guided through an authentication process. The public_token will be passed
            back to the example server, which will then exchange it for an access token and log it
            to your console.
          </p>
          <button id="link-btn">Link Account</button>
        </div>

        <div id="app2">
          <div class="box">
            <button id="get-accounts-btn">Get Accounts</button>
            <div id="get-accounts-data"></div>
          </div>

          <div class="box">
            <button id="get-item-btn">Get Item</button>
            <div id="get-item-data"></div>
          </div>

          <div class="box">
            <button id="get-transactions-btn">Get Transactions</button>
            <div id="get-transactions-data"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Plaid;
