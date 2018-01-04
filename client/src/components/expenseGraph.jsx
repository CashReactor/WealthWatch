import React from 'react';

export default class ExpenseGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryValues: {},
    };
    this.accumulateExpenses = this.accumulateExpenses.bind(this);
  }

  componentWillReceiveProps() {
    this.accumulateExpenses(this.props.oneExpenses);
    this.accumulateExpenses(this.props.recExpenses);
  }

  accumulateExpenses(expenses) {
    console.log('Expense Graph expenses: ', expenses);
    const result = {};
    for (let i = 0; i < expenses.length; i++) {
      console.log(expenses[i].category);
      if (!result[expenses[i].category]) {
        result[expenses[i].category] = expenses[i].amount;
      } else {
        result[expenses[i].category] += expenses[i].amount;
      }
    }
    this.setState({ categoryValues: Object.assign(this.state.categoryValues, result) });
  }

  render() {
    console.log('Category Values: ', this.state.categoryValues);
    return (
      <div>

      </div>
    );
  }
}
