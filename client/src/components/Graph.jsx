import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import BarGraph from './barGraph.jsx';
import LineGraph from './lineGraph.jsx';
import PieGraph from './pieGraph.jsx';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { red200, orange300, blue300, blue700, blue900 } from 'material-ui/styles/colors';
import axios from 'axios';
import Plaid from './plaidConsole.jsx';
import InputBalance from './inputBalance.jsx';


const styles = {
  default_tab: {
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(40, 40, 227, 0.8)',
    fontWeight: 400,
  },
  paper: {
    height: '50%',
    width: '97%',
    textAlign: 'center',
    marginLeft: '11.5%',
    marginRight: '11.5%',
  },
  grid: {
    height: '50%',
    width: '100%',
    // backgroundColor: 'rgba(144,164,174 ,0.17)',
    color: 'white',
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

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }

  componentDidMount() {
    this.props.renderGraph();
    this.props.renderEPie();
  }

  render() {
    return (
      <div>
        <div styles={styles.border} className="grid-container">
          <div className="item1">
              <BarGraph currentEmail={this.props.currentEmail} budget={this.props.budget} one={this.props.one} rec={this.props.rec} />
          </div>
          <div className="item2">
              <LineGraph currentEmail={this.props.currentEmail} one={this.props.one} rec={this.props.rec} />
          </div>
        </div>
        {/*<Paper style={styles.paper}>
          <BarGraph currentEmail={this.props.currentEmail} budget={this.props.budget} one={this.props.one} rec={this.props.rec} />
          <LineGraph currentEmail={this.props.currentEmail} one={this.props.one} rec={this.props.rec} />
<<<<<<< 44e5cf9165893bd6020d5a839ecc790c61af91d9
<<<<<<< 65cdde2d146e6a38e87e423184c30b0496d0c24b
        </Paper>*/}
      </div>
    );
  }
}

{
  /*<Tabs>
  <Tab style={{ border: 'solid', borderWidth: '0px', borderColor: red200, backgroundColor: '#FF8A65' }} label="Bar Graph">
    <div>
      <BarGraph />
    </div>
  </Tab>
  <Tab style={{ border: 'solid', borderWidth: '0px', borderColor: red200, backgroundColor: '#FF8A65' }} label="Line Graph">
    <LineGraph />
  </Tab>
</Tabs>*/
}

export default Graph;