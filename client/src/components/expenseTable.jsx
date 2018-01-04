import React from 'react';
import Paper from 'material-ui/Paper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';
import { Button } from 'react-bootstrap';
import axios from 'axios';

const styles = {
  paper: {
    width: '90%',
    textAlign: 'center',
    display: 'inline-block',
    margin: 'auto',
    padding: '10px',
  },
  deleteButton: {
    marginLeft: '0',
  },
  tableHeader: {
    general: {
      marginLeft: '-1.2em',
    },
    date: {
      marginLeft: '-1.8em',
    },
  },
  border: {
    border: 'solid',
    borderWidth: '3px',
    borderColor: 'lightblue',
    width: '90%',
    padding: '7px',
    margin: '7px auto',
  },
};

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oneExpenses: [],
      recExpenses: [],
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: true,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
      width: '80%',
      marginLeft: '10%',
      marginRight: '10%',
    };

    this.convertDate = this.convertDate.bind(this);
    this.convertCategory = this.convertCategory.bind(this);
    this.setExpensesState = this.setExpensesState.bind(this);
    this.deleteOneTimeExpense = this.deleteOneTimeExpense.bind(this);
    this.deleteRecurringExpense = this.deleteRecurringExpense.bind(this);
    this.sortHelper = this.sortHelper.bind(this);
    this.sortOneTable = this.sortOneTable.bind(this);
    this.sortRecurringTable = this.sortRecurringTable.bind(this);
  }

  componentDidMount() {
    const { one, rec } = this.props;
    this.setExpensesState(one, rec);
  }

  componentWillReceiveProps() {
    const { one, rec } = this.props;
    this.setExpensesState(one, rec);
  }

  convertDate(x) {
    const str = `${new Date(x)}`;
    const arr = str.split('');
    arr.splice(16);
    const res = arr.join('');
    return res;
  }

  convertCategory(x) {
    if (x == '1') {
      return 'Entertainment';
    } else if (x == '2') {
      return 'Food';
    } else if (x == '3') {
      return 'Rent';
    } else if (x == '4') {
      return 'Utilities';
    } else if (x == '5') {
      return 'Others';
    }
    return 'No Category Specified';
  }

  deleteOneTimeExpense(e) {
    const [email, expenseId] = e.target.id.split('_');
    axios.delete(`/api/expense/oneExpense?user=${email}&expenseId=${expenseId}`).then(response => {
      if (response.status === 200) {
        this.props.updateExpenseList('one', expenseId);
      }
    });
  }

  deleteRecurringExpense(e) {
    const [email, expenseId] = e.target.id.split('_');
    axios.delete(`/api/expense/recExpense?user=${email}&expenseId=${expenseId}`).then(response => {
      if (response.status === 200) {
        this.props.updateExpenseList('recurring', expenseId);
      }
    });
  }

  sortRecurringTable(e) {
    this.sortHelper(e, 'recExpenses');
  }

  sortOneTable(e) {
    this.sortHelper(e, 'oneExpenses');
  }

  sortHelper(e, type) {
    const expenseType = type;
    const sortedBy = e.target.innerHTML.toLowerCase();
    const expenses = this.state[expenseType];
    if (sortedBy === 'date') {
      expenses.sort((a, b) => {
        return new Date(a.startDate) - new Date(b.startDate);
      });
    } else if (sortedBy === 'expense' || sortedBy === 'category') {
      expenses.sort((a, b) => {
        const expenseA = a[sortedBy].toUpperCase();
        const expenseB = b[sortedBy].toUpperCase();
        if (expenseA < expenseB) {
          return -1;
        }
        if (expenseA > expenseB) {
          return 1;
        }
      });
    } else if (sortedBy === 'amount') {
      expenses.sort((a, b) => {
        return a.amount - b.amount;
      });
    }

    this.setState({ [expenseType]: expenses });
  }

  setExpensesState(one = [], rec = []) {
    this.setState({
      oneExpenses: one,
      recExpenses: rec,
    });
  }

  render() {
    return (
      <div className="expenseTable">
        <div style={styles.border} className="expenseOneTable">
          <Table
            style={{ width: '100%', margin: 'auto' }}
            height={this.state.height}
            width={this.state.width}
            marginRight={this.state.marginRight}
            marginLeft={this.state.marginLeft}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn
                  colSpan="5"
                  style={{
                    fontWeight: 700,
                    fontSize: '27px',
                    color: 'rgba(77,182,172 ,1)',
                  }}
                >
                  One-time Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn id="oneDate" style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Date"
                    onClick={this.sortOneTable}
                    hoverColor="white"
                    style={styles.tableHeader.date}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn id="oneExpense" style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Expense"
                    onClick={this.sortOneTable}
                    hoverColor="white"
                    style={styles.tableHeader.general}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn id="oneCategory" style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Category"
                    onClick={this.sortOneTable}
                    hoverColor="white"
                    style={styles.tableHeader.general}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn id="oneAmount" style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Amount"
                    onClick={this.sortOneTable}
                    hoverColor="white"
                    style={styles.tableHeader.general}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1em' }}> </TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {this.state.oneExpenses.map(expense => (
                <TableRow key={expense._id}>
                  <TableRowColumn>{this.convertDate(expense.date)}</TableRowColumn>
                  <TableRowColumn>{expense.expense}</TableRowColumn>
                  <TableRowColumn>{this.convertCategory(expense.category)}</TableRowColumn>
                  <TableRowColumn>{expense.amount}</TableRowColumn>
                  <TableRowColumn>
                    <Button
                      id={`${this.props.currentEmail}_${expense._id}`}
                      style={styles.deleteButton}
                      bsStyle="danger"
                      onClick={this.deleteOneTimeExpense}
                    >
                      X
                    </Button>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div style={styles.border} className="expenseRecTable">
          <Table
            style={{ width: '100%', margin: 'auto' }}
            height={this.state.height}
            width={this.state.width}
            marginRight={this.state.marginRight}
            marginLeft={this.state.marginLeft}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn
                  colSpan="5"
                  style={{
                    fontWeight: 700,
                    fontSize: '27px',
                    color: 'rgba(77,182,172 ,1)',
                  }}
                >
                  Recurring Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Date"
                    onClick={this.sortRecurringTable}
                    hoverColor="white"
                    style={styles.tableHeader.date}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Expense"
                    onClick={this.sortRecurringTable}
                    hoverColor="white"
                    style={styles.tableHeader.general}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Category"
                    onClick={this.sortRecurringTable}
                    hoverColor="white"
                    style={styles.tableHeader.general}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton
                    label="Amount"
                    onClick={this.sortRecurringTable}
                    hoverColor="white"
                    style={styles.tableHeader.general}
                    labelStyle={{ fontWeight: 'bold' }}
                  />
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1em' }}>
                  <FlatButton label="" />
                </TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {this.state.recExpenses.map(expense => (
                <TableRow key={expense._id}>
                  <TableRowColumn>{this.convertDate(expense.startDate)}</TableRowColumn>
                  <TableRowColumn>{expense.expense}</TableRowColumn>
                  <TableRowColumn>{this.convertCategory(expense.category)}</TableRowColumn>
                  <TableRowColumn>{expense.amount}</TableRowColumn>
                  <TableRowColumn>
                    <Button
                      id={`${this.props.currentEmail}_${expense._id}`}
                      bsStyle="danger"
                      onClick={this.deleteRecurringExpense}
                      style={styles.deleteButton}
                    >
                      X
                    </Button>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default ExpenseTable;
