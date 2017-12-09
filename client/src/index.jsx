import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/Graph.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget = 0;
      budgetInput = false;
    }
  }

  searchBar() {
    if (budgetInput) {
      return (

      )
    } else {
      return (

      )
    }

  }

  budgetToggle() {

  }

  render() {
    return (
      <div>
        <Graph />
        <button type="button" class="btn">Balance</button>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);
