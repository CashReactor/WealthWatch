import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './components/graph.jsx';
import InputBalance from './components/inputBalance.jsx';
import Clock from './components/clock.jsx';
import Weather from './components/weather.jsx';
import OneExpense from './components/oneExpense.jsx';
import RecExpense from './components/recExpense.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      budget: 0,
      budgetInput: false,
      currentDate: ''
    }
    this.getCurrentDate = this.getCurrentDate.bind(this);
  }

  getCurrentDate(date) {
    this.setState({ currentDate: date });
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  render() {
    return (
      <div>
        <div className="widget">
          <Clock getCurrentDate={this.getCurrentDate}/>
          <Weather/>
        </div>
        <Graph/>
        <InputBalance/>
        <OneExpense/>
        <RecExpense/>
      </div>
    )
  }
}

ReactDOM.render(
    <App />,
  document.getElementById('app')
);