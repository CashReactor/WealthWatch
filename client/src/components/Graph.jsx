import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import BarGraph from './barGraph.jsx';
import LineGraph from './lineGraph.jsx';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import { red200, orange300, blue300, blue700, blue900 } from 'material-ui/styles/colors';
import axios from 'axios';
import Plaid from './plaidConsole.jsx';

const styles = {
  default_tab: {
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(40, 40, 227, 0.8)',
    fontWeight: 400,
  },
  paper: {
    height: '50%',
    width: '77%',
    textAlign: 'center',
    marginLeft: '11.5%',
    marginRight: '11.5%',
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
  }

  render() {
    return (
      <div>
        <Avatar size={97} src="https://www.sideshowtoy.com/photo_903079_thumb.jpg" style={{transform:  'translate(-50%, -50%)', marginLeft:'50%', marginRight:'50%'}}/>
        <Plaid updateBankInfo={this.props.updateBankInfo} email={ this.props.currentEmail }/>
        <Paper style={styles.paper}>
          <BarGraph currentEmail={this.props.currentEmail} budget={this.props.budget} one={this.props.one} rec={this.props.rec} />
          <LineGraph currentEmail={this.props.currentEmail} one={this.props.one} rec={this.props.rec} />
        </Paper>
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
