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


const styles = {
  propContainer: {
    width: 200,
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
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

   // <option value={1}>Entertainment</option>
   //          <option value={2}>Food</option>
   //          <option value={3}>Rent</option>
   //          <option value={4}>Utilities</option>
   //          <option value={5}>Others</option>


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
          <Table>
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
          <Table>
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