import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';
import SkyLight from 'react-skylight';
import Slider from 'material-ui/Slider';


const style = {
  backgroundImage: '',
  backgroundSize:'cover',
  color: 'black',
  paddingTop: '7px',
  width: '50%',
  marginLeft: '25%',
  marginRight: '25%'
}


class RetirementCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startAge: 30,
      retireAge: 70,
      income: 70000,
      willSave: 7000,
      alreadySaved: 7000,
      needIncomePercentage: 70,
      ROI: 7,
    };
    this.handleSlider = this.handleSlider.bind(this);
    this.startAge = this.startAge.bind(this);
    this.retireAge = this.retireAge.bind(this);
    this.alreadySaved = this.alreadySaved.bind(this);
    this.needIncomePercentage = this.needIncomePercentage.bind(this);
    this.ROI = this.ROI.bind(this);
  }

  handleSlider(event, value, name, transform) {
    this.setState({
      [name]: value
    })
  }

  slider(min, max, step, value, name) {
    return (
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event, value) => this.handleSlider(event, value, name)}
      />
    )
  }

  startAge() {
    return (
      <div>
        <h2>I'm currently {this.state.startAge} years old</h2>
        {this.slider(21, 80, 1, this.state.startAge, 'startAge')}
      </div>
    )
  }

  retireAge() {
    return (
      <div>
        <h2>I plan to retire at age {Math.max(this.state.startAge, this.state.retireAge)}</h2>
        {this.slider(this.state.startAge, 80, 1, Math.max(this.state.startAge, this.state.retireAge),'retireAge')}
      </div>
    )
  }

  income() {
    var step;
    if (this.state.income <= 100000) {
      step = 1000;
    } else {
      step = 5000;
    }
    return (
      <div>
        <h2>I make {this.props.currency}{this.state.income} a year </h2>
        {this.slider(20000, 400000, step, this.state.income, 'income')}
      </div>
    )
  }

  willSave() {
    var step;
    if (this.willSave < 1000) {
      step = 50;
    } else if (this.willSave < 10000) {
      step = 100;
    } else if (this.willSave < 20000) {
      step = 500;
    } else {
      step = 1000;
    }

    return (
      <div>
        <h2>I save {this.props.currency}{this.state.willSave} ({Math.round((this.state.willSave / this.state.income)*100, 1)}% of my salary) annually for retirement</h2>
        {this.slider(0, 60000, step, this.state.willSave, 'willSave')}
      </div>
    )
  }

  alreadySaved() {
    var step;
    if (this.state.alreadySaved < 5000) {
      step = 100;
    } else if (this.state.alreadySaved < 20000) {
      step = 500;
    } else if (this.state.alreadySaved < 50000) {
      step = 1000;
    } else if (this.state.alreadySaved < 300000) {
      step = 5000;
    } else if (this.state.alreadySaved < 500000) {
      step = 10000;
    } else {
      step = 50000;
    }
    return (
      <div>
        <h2>
          I've already saved {this.props.currency}{this.state.alreadySaved} for retirement
        </h2>
        {this.slider(0, 2000000, step, this.state.alreadySaved, 'alreadySaved')}
      </div>
    )
  }

  needIncomePercentage() {
    return (
      <div>
        <h2>
          I'll need {this.state.needIncomePercentage}% of my current income in retirement
        </h2>
        {this.slider(60, 110, 1, this.state.needIncomePercentage, 'needIncomePercentage')}
      </div>
    )
  }

  ROI() {
    return (
      <div>
        <h2>
          I expect an annual return of {this.state.ROI}% from my investments
        </h2>
        {this.slider(1.0, 10.0, 0.1, this.state.ROI, 'ROI')}
      </div>
    )
  }

  render() {
    return (
      <div>
        <Paper style={style}>
          {this.startAge()}
          {this.retireAge()}
          {this.income()}
          {this.willSave()}
          {this.alreadySaved()}
          {this.needIncomePercentage()}
          {this.ROI()}
        </Paper>
      </div>
    );
  }
}

export default RetirementCalculator;