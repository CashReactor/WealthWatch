import React from 'react';
import OneExpense from './oneExpense.jsx';
import RecExpense from './recExpense.jsx';

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="expenses">
        <OneExpense
          currencySymbols={this.props.currencySymbols}
          updateUser={this.props.updateUser}
          currentEmail={this.props.currentEmail}
        />
        <RecExpense
          currencySymbols={this.props.currencySymbols}
          updateUser={this.props.updateUser}
          currentEmail={this.props.currentEmail}
        />
      </div>
    );
  }
}

export default Expenses;
