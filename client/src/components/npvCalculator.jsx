import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import $ from 'jquery';

const style = {
  backgroundImage: 'linear-gradient(rgba(0,0,0, 0.27), rgba(0,0,0, 0.27)),url("https://images.unsplash.com/photo-1462556791646-c201b8241a94?auto=format&fit=crop&w=2545&q=80&ixid=dW5zcGxhc2guY29tOzs7Ozs%3D")',
  backgroundSize:'cover',
  color: 'white',
  paddingTop: '7px',
  width: '50%',
  marginLeft: '25%',
  marginRight: '25%'
}

class NPVCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discountRate: '',
      initialInvestment: '',
      cashFlow: {},
      cashFlowType: true,
      counter: 1,
      NPVresult: '',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCashFlow = this.onCashFlow.bind(this);
    this.addCashFlow = this.addCashFlow.bind(this);
    this.cashFlowInput = this.cashFlowInput.bind(this);
    this.subtractCashFlow = this.subtractCashFlow.bind(this);
    this.calculateNPV = this.calculateNPV.bind(this);
    this.inputAddon = this.inputAddon.bind(this);
    this.switchCashFlowType = this.switchCashFlowType.bind(this);
  }

  calculateNPV() {
    console.log('THIS IS THE DISCOUNT RATE', this.state.discountRate, 'THIS IS THE INITIAL INVESTMENT', this.state.initialInvestment, 'THIS IS THE CASHFLOW', this.state.cashFlow);
    axios.post('/calculateNPV', {
      discountRate: this.state.discountRate,
      initialInvestment: this.state.initialInvestment,
      cashFlow: this.state.cashFlow,
    })
    .then((response) => {
      this.setState({
        NPVresult: JSON.parse(response.data)
      })
    })
  }

  onInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onCashFlow(e) {
    var id = e.target.id;
    if (this.state.cashFlow[id]) {
      this.setState({
        cashFlow: Object.assign(this.state.cashFlow, {[id]: [e.target.value, this.state.cashFlow[id][1] || '']})
      })
    } else {
      this.setState({
        cashFlow: Object.assign(this.state.cashFlow, {[id]: [e.target.value, '']})
      })
    }
  }

  switchCashFlowType(e) {
    if (this.state.cashFlow[e.target.id] && this.state.cashFlow[e.target.id][1] === '%') {
      this.setState({
        cashFlow: Object.assign(this.state.cashFlow, {[e.target.id]: [this.state.cashFlow[e.target.id][0], '']})
      })
    } else if (this.state.cashFlow[e.target.id]) {
      this.setState({
        cashFlow: Object.assign(this.state.cashFlow, {[e.target.id]: [this.state.cashFlow[e.target.id][0], '%']})
      })
    } else {
      this.setState({
        cashFlow: Object.assign(this.state.cashFlow, {[e.target.id]: [undefined, '%']})
      })
    }
  }

  onPerpetualCashFlow(e) {
    this.setState({

    })
  }

  addCashFlow() {
    this.setState({ counter: this.state.counter + 1 });
  }

  subtractCashFlow() {
    this.setState({ counter: this.state.counter - 1 });
  }

  inputAddon(index) {
    if (this.state.cashFlowType) {
      return(
        <div onClick={this.switchCashFlowType} className="input-group-addon">Year {index+1}-{this.props.currency}</div>
      )
    } else {
      return(
        <div onClick={this.switchCashFlowType} className="input-group-addon">Year {index+1}-%</div>
      )
    }
  }

  cashFlowInput() {
    const array = Array(this.state.counter);
    for (var i = 0; i < this.state.counter; i++) {
      array[i] = 1;
    }

    return (
      <div>
        {array.map((element, index) => {
          if (this.state.cashFlow[i] && this.state.cashFlow[i][1] === '%') {
            return (
              <div>
                <div id="inputaddon" className="input-group">
                  <div id={index+1} onClick={this.switchCashFlowType} className="input-group-addon">Year {index+1}-%</div>
                  <input onChange={this.onCashFlow} type="number" className="form-control" id={index+1}></input>
                  <div onClick={this.subtractCashFlow} className="input-group-addon"><span class="glyphicon glyphicon-ban-circle"></span></div>
                </div><br></br><br></br>
              </div>
            )
          } else {
            return (
              <div>
                <div id="inputaddon" className="input-group">
                  <div id={index+1} onClick={this.switchCashFlowType} className="input-group-addon">Year {index+1}-{this.props.currency}</div>
                  <input onChange={this.onCashFlow} type="number" className="form-control" id={index+1}></input>
                  <div onClick={this.subtractCashFlow} className="input-group-addon"><span class="glyphicon glyphicon-ban-circle"></span></div>
                </div><br></br><br></br>
              </div>
            )
          }
        })}
      </div>
    )
  }

  onSubmit(e) {

  }

  inputForm() {
    return (
      <div>
        <div className="form-group" id="NPV">
          <h2 style={{color: 'white'}} className="header">Analyze Net Present Value (NPV) of your investment or project <span className="npv">{this.state.NPVresult}</span></h2>
          <label id="label">Initial investment:</label>
          <div id="inputaddon" className="input-group">
            <div className="input-group-addon">{this.props.currency}</div>
            <input onChange={this.onInputChange} type="number" className="form-control" id="initialInvestment"></input>
          </div><br></br>
          <label id="label">Discount rate:</label>
          <div id="inputaddon" className="input-group">
            <input onChange={this.onInputChange} type="number" className="form-control" id="discountRate"></input>
            <div className="input-group-addon">%</div>
          </div><br></br>
          {/*<label id="label">Cash Flow (perpetuity):</label>
          <div id="inputaddon" className="input-group">
            <input onChange={this.onInputChange} type="number" className="form-control" id="discountRate"></input>
            <div className="input-group-addon">%</div>
          </div><br></br>*/}
          <label id="label">Cash Flow:</label>
          {this.cashFlowInput()}
          <button onClick={this.addCashFlow} style={{margin: '1vh'}} className="btn btn-primary">Add cashflow</button>
          <button onClick={this.calculateNPV} style={{margin: '1vh', float: 'right'}} className="btn btn-info">Calculate</button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Paper style={style}>
          {this.inputForm()}
        </Paper>
      </div>
    );
  }
}

export default NPVCalculator;