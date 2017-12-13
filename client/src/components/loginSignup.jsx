import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const style = {
  paper: {
    height: '50%',
    length: '50%',
    margin: '0 auto',
    textAlign: 'center',
    width: '70%'
  }
}

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#F06292',
    primary2Color: '#AB47BC'
  }
});

class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEmail: '',
      loginPassword: '',
      loginWarning: '',
      signupEmail: '',
      signupName: '',
      signupPassword: '',
      signupImageUrl: '',
      signupWarning: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.validateLoginForm = this.validateLoginForm.bind(this);
    this.validateSignupForm = this.validateSignupForm.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  onSubmitSignup(e) {
    e.preventDefault();
    if (this.validateSignupForm()) {
      axios.post('/signup', {
        email: this.state.signupEmail,
        name: this.state.signupName,
        password: this.state.signupPassword
      })
      .then((response) => {

      })
    }
  }

  onSignupSubmit(e) {
    e.preventDefault();
    if (this.validateSignupForm()) {
      axios
        .post('auth/signup', {
          email: this.state.signupEmail,
          name: this.state.signupName,
          password: this.state.signupPassword
        })
        .then(response => {
          if (response.status === 201) {
            this.props.setLoginState(response.data.token);
          }
        })
        .catch(error => {
          this.setState({ signupWarning: error.response.data });
        });
    }
  }

  onLoginSubmit(e) {
    e.preventDefault();
    if (this.validateLoginForm()) {
      axios
        .post('auth/login', {
          email: this.state.loginEmail,
          password: this.state.loginPassword
        })
        .then(response => {
          console.log('successful login search');
          if (response.status === 200) {
            this.props.setLoginState(response.data.token);
          }
        })
        .catch(error => {
          if (error.response.status === 401) {
            this.setState({ loginWarning: 'Incorrect username or password' });
          }
        });
    }
  }

  validateLoginForm() {
    if (!this.state.loginEmail) {
      this.setState({ loginWarning: 'Please enter an email address' });
      return false;
    } else if (!this.state.loginPassword) {
      this.setState({ loginWarning: 'Please enter a password' });
      return false;
    } else {
      return true;
    }
  }

  validateSignupForm() {
    if (!this.state.signupEmail) {
      this.setState({ signupWarning: 'Please enter an email address' });
      return false;
    } else if (!this.state.signupName) {
      this.setState({ signupWarning: 'Please enter a name' });
      return false;
    } else if (!this.state.signupPassword) {
      this.setState({ signupWarning: 'Please enter a password' });
      return false;
    } else {
      return true;
    }
  }

  loginForm() {
    return (
      <div className="loginForm">
        <form>
          <div className="form-group col-xs-4">
            <label htmlFor="inputEmail">Email Address</label>
            <input
              type="email"
              value={this.state.loginEmail}
              onChange={this.onInputChange}
              className="form-control"
              id="loginEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email to anyone else.
            </small>
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="inputPassword">Password</label>
            <input
              value={this.state.loginPassword}
              onChange={this.onInputChange}
              type="password"
              className="form-control"
              id="loginPassword"
              placeholder="Password"
            />
          </div>
        </form>
        <button type="submit" onClick={this.onLoginSubmit} className="btn btn-primary">
          Login
        </button>
<a href="#" title="Google+" class="btn btn-googleplus btn-lg"><i class="fa fa-google-plus fa-fw"></i> Google+</a>        {this.state.loginWarning}
      </div>
    );
  }

  signupForm() {
    return (
      <div className="signupForm">
        <form>
          <div className="form-group col-xs-4">
            <label htmlFor="inputName">Name</label>
            <input
              value={this.state.signupName}
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              id="signupName"
              placeholder="Name"
            />
          </div>
          <div className="form-group col-xs-4">
            <label htmlFor="inputEmail">Email</label>
            <input
              value={this.state.signupEmail}
              onChange={this.onInputChange}
              type="email"
              className="form-control"
              id="signupEmail"
              placeholder="Email"
            />
            <small id="emailHelp" className="form-text text-muted">
              This email account will be used for logging in.
            </small>
          </div>
          <div className="form-group col-xs-8">
            <label htmlFor="inputPassword">Password</label>
            <input
              value={this.state.signupPassword}
              onChange={this.onInputChange}
              type="password"
              className="form-control"
              id="signupPassword"
              placeholder="Password"
            />
          </div>
          <div className="form-group col-xs-8">
            <label htmlFor="inputName">Profile Image</label>
            <input
              value={this.state.signupImageUrl}
              onChange={this.onInputChange}
              type="text"
              className="form-control"
              id="signupImageUrl"
              placeholder="Image Url"
            />
          </div>
          <button type="submit" onClick={this.onSignupSubmit} className="btn btn-primary">
            Sign Up
          </button>
          {this.state.signupWarning}
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.loginForm()}
        {this.signupForm()}
      </div>
    );
  }
}

export default LoginSignup;
