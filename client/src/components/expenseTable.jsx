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
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '300px',
    };

    this.convertDate = this.convertDate.bind(this);
    this.convertCategory = this.convertCategory.bind(this);
  }


  convertDate(x) {
    let str = '' + new Date(x);
    let arr = str.split('');
    arr.splice(25, 9);
    let res = arr.join('');
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
    } else {
      return 'No Category Specified';
    }
  }


  render() {

    return (

      <div>

        <div>
          <Table
            height={this.state.height}
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
                <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '2.5em', fontVariant: 'small-caps'}}>
                  Recurring Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Date:</TableRowColumn>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Recurring Expense:</TableRowColumn>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Category:</TableRowColumn>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Amount:</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
            >
            {this.props.rec.map( (expense, index) => (
              <TableRow key={index}>
                <TableRowColumn>{this.convertDate(expense.date)}</TableRowColumn>
                <TableRowColumn>{expense.expense}</TableRowColumn>
                <TableRowColumn>{this.convertCategory(expense.category)}</TableRowColumn>
                <TableRowColumn>{expense.amount}</TableRowColumn>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <Table
            height={this.state.height}
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
                <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center', fontWeight: 'bold', fontSize: '2.5em', fontVariant: 'small-caps'}}>
                  Non-Recurring Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Date:</TableRowColumn>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Expense:</TableRowColumn>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Category:</TableRowColumn>
                <TableRowColumn style={{fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline'}}>Amount:</TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
            >
            {this.props.one.map( (expense, index) => (
              <TableRow key={index}>
                <TableRowColumn>{this.convertDate(expense.date)}</TableRowColumn>
                <TableRowColumn>{expense.expense}</TableRowColumn>
                <TableRowColumn>{this.convertCategory(expense.category)}</TableRowColumn>
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