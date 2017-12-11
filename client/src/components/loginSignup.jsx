import React from 'react';
import ReactDOM from 'react-dom';
import Graph from './graph.jsx';
import axios from 'axios';

class loginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUsername: '',
      loginPassword: '',
      signupUsername: '',
      signupPassword: ''
    }
  }

  onInputChange(e) {
    this.setState({
      budget: e.target.value
    })
  }

  onSignupSubmit(e) {
    e.preventDefault();
  }

  onLoginSubmit(e) {
    e.preventDefault();
  }

  loginBar() {
    return (
      <div>
      </div>
    )
  }

  signupBar() {
    return (
      <div>
      </div>
    )
  }

  render() {
    return (
      <div>
      </div>
    )
  }
}

export default loginSignup;