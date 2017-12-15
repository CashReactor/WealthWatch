import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class NPVCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discountRate: '',
      initialInvestment: '',
      cashFlow: [],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onSubmit(e) {

  }

  inputForm() {
    return (
      <div>
        <form>
          <div className="form-row">
            <div className="col">
              <label>Initial investment:</label>
              <input onChange={this.onInputChange} type="number" className="form-control" id="initialInvestment"></input>
            </div>
            <div className="col">
              <label>Discount rate:</label>
              <div className="input-group">
              <div className="input-group-addon">@</div>
              <input onChange={this.onInputChange} type="number" className="form-control" id="discountRate"></input>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.inputForm()}
      </div>
    );
  }
}

export default NPVCalculator;