import React from 'react';
import Paper from 'material-ui/Paper';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';



class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    return (

      <div>

        <div>
          <Table rec={this.props.rec}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                  Recurring Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Date</TableRowColumn>
                <TableRowColumn>Recurring Expense</TableRowColumn>
                <TableRowColumn>Category</TableRowColumn>
                <TableRowColumn>Amount</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
            {this.props.rec.map( (expense) => (
              <TableRow>
                <TableRowColumn>{expense.date}</TableRowColumn>
                <TableRowColumn>{expense.expense}</TableRowColumn>
                <TableRowColumn>{expense.category}</TableRowColumn>
                <TableRowColumn>{expense.amount}</TableRowColumn>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <Table one={this.props.one}>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn colSpan="3" tooltip="Super Header" style={{textAlign: 'center'}}>
                  Non-Recurring Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn>Date</TableRowColumn>
                <TableRowColumn>Expense</TableRowColumn>
                <TableRowColumn>Category</TableRowColumn>
                <TableRowColumn>Amount</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
            {this.props.one.map( (expense) => (
              <TableRow>
                <TableRowColumn>{expense.date}</TableRowColumn>
                <TableRowColumn>{expense.expense}</TableRowColumn>
                <TableRowColumn>{expense.category}</TableRowColumn>
                <TableRowColumn>{expense.amount}</TableRowColumn>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>

      )

  }


}


export default ExpenseTable;