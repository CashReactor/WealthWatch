import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import BarGraph from './barGraph.jsx';
import LineGraph from './lineGraph.jsx';
import Paper from 'material-ui/Paper';

var styles = {
  default_tab:{
    color: 'rgba(255, 255, 255, 0.9)',
    backgroundColor: 'rgba(40, 40, 227, 0.8)',
    fontWeight: 400,
  },
  paper: {
    height: 750,
    width: 1220,
    textAlign: "center",
    marginLeft: 5,
  }
}

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentDate: new Date(),
    };
  }

  render() {
    return (
      <div>
        <Paper style={styles.paper} zDepth={5}>
          <Tabs>
            <Tab style={styles.default_tab} label="Bar Graph">
              <div>
                <BarGraph />
              </div>
            </Tab>
            <Tab style={styles.default_tab} label="Line Graph">
              <LineGraph />
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default Graph;
