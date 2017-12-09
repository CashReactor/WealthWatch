import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/Graph.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <Graph />
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);
