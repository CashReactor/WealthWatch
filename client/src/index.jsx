import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph.jsx';
import InputBalance from './components/inputBalance.jsx';
import Clock from './components/clock.jsx';
import Weather from './components/weather.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      budgetInput: false
    }
  }

  render() {
    return (
      <div>
        <div className="widget">
          <Clock/>
          <Weather/>
        </div>
        <Graph />
        <InputBalance/>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);
