import React from 'react';

class Graph extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <canvas id="financeChart" width="400" height="400"></canvas>
        D3 graph will go here
      </div>
    )
  }
}

export default Graph;