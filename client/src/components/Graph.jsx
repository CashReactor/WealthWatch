import React from 'react';

class Graph extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <canvas id="financeChart"></canvas>
        <br></br>
      </div>
    )
  }
}

export default Graph;