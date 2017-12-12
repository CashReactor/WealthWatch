import React from 'react';
import BarGraph from './barGraph.jsx';
import LineGraph from './lineGraph.jsx'
import {Tabs, Tab} from 'material-ui/Tabs';

class Graph extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      currentDate: new Date()
    }
  }

  render(){
    return(
      <div>
        <Tabs>
          <Tab label="Bar Graph">
            <div>
              <BarGraph/>
            </div>
          </Tab>
          <Tab label="Line Graph">
            <LineGraph></LineGraph>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default Graph;