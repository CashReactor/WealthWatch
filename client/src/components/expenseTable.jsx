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
import ScrollArea from 'react-scrollbar';

const styles = {
  // backgroundImage: 'linear-gradient(rgba(0,0,0, 0.27), rgba(0,0,0, 0.27)),url("https://images.unsplash.com/photo-1462556791646-c201b8241a94?auto=format&fit=crop&w=2545&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")',
  // backgroundSize:'cover',
  standard: {
    color: 'white',
    paddingTop: '7px',
    width: '80%',
    height: '300px',
    marginLeft: '10%',
    marginRight: '10%',
    overflowX: 'auto',
  },
  paper: {
    height: '460px',
    width: '77%',
    textAlign: 'center',
    marginLeft: '11.5%',
    marginRight: '11.5%',
    display: 'inline-block',
    marginTop: '10px',
  },
}

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      marginRight: '10%'
    }

    this.convertDate = this.convertDate.bind(this);
    this.convertCategory = this.convertCategory.bind(this);
  }

  convertDate(x) {
    const str = '' + new Date(x);
    const arr = str.split('');
    arr.splice(25, 9);
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
    } else {
      return 'No Category Specified';
    }
  }

  render() {
    return (
      <div>
        <div>
        <Paper
          style={styles.paper}
        >
          <Table style={{width: '80%', margin:'auto'}}
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
                  colSpan="4"
                  tooltip="Super Header"
                  style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5em', fontVariant: 'small-caps' }}
                >
                  Recurring Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Date:
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Expense:
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Category:
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Amount:
                </TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {this.props.rec.map((expense, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{this.convertDate(expense.startDate)}</TableRowColumn>
                  <TableRowColumn>{expense.expense}</TableRowColumn>
                  <TableRowColumn>{this.convertCategory(expense.category)}</TableRowColumn>
                  <TableRowColumn>{expense.amount}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        </div>

        <br /><br /><br />

        <div>
        <Paper
          style={styles.paper}
        >
          <Table style={{width: '80%', margin:'auto'}}
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
                  colSpan="4"
                  tooltip="Super Header"
                  style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '2.5em', fontVariant: 'small-caps' }}
                >
                  Non-Recurring Expenses
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Date:
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Expense:
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Category:
                </TableRowColumn>
                <TableRowColumn style={{ fontWeight: 'bold', fontSize: '1.5em', textDecoration: 'underline' }}>
                  Amount:
                </TableRowColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={this.state.showCheckboxes}>
              {this.props.one.map((expense, index) => (
                <TableRow key={index}>
                  <TableRowColumn>{this.convertDate(expense.date)}</TableRowColumn>
                  <TableRowColumn>{expense.expense}</TableRowColumn>
                  <TableRowColumn>{this.convertCategory(expense.category)}</TableRowColumn>
                  <TableRowColumn>{expense.amount}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </Paper>
        </div>
      </div>
    );
  }
}

export default ExpenseTable;
