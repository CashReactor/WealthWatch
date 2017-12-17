import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import { Tabs, Tab } from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';

const style = {
  paper: {
    height: '50%',
    margin: '0 auto',
    textAlign: 'center',
    width: '25%',
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'none',
    boxShadow: 'none',
  },
  headline: {
    fontSize: 16,
    fontWeight: 400,
    backgroundColor: '#102847',
  },
  tab: {
    backgroundColor: '#102847',
  },
  textContainer: {
    width: '100%',
    backgroundColor: '#102847',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: '#fff',
  },
  input: {
    color: '#fff',
  },
  side: {
    marginLeft: '0',
    paddingLeft: '0',
  },
  button: {
    marginTop: '2em',
    backgroundColor: 'none',
  },
};

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#F06292',
    primary2Color: '#AB47BC',
  },
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
      signupWarning: '',
      style: {
        fullWidth: true,
        secondary: true,
      },
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.onLoginSubmit = this.onLoginSubmit.bind(this);
    this.validateLoginForm = this.validateLoginForm.bind(this);
    this.validateSignupForm = this.validateSignupForm.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmitSignup(e) {
    e.preventDefault();
    if (this.validateSignupForm()) {
      axios
        .post('/signup', {
          email: this.state.signupEmail,
          name: this.state.signupName,
          password: this.state.signupPassword,
        })
        .then(response => {});
    }
  }

  onSignupSubmit(e) {
    e.preventDefault();
    if (this.validateSignupForm()) {
      axios
        .post('auth/signup', {
          email: this.state.signupEmail,
          name: this.state.signupName,
          password: this.state.signupPassword,
        })
        .then((response) => {
          this.props.getCurrentEmail(this.state.signupEmail);
          this.props.updateUser();
          if (response.status === 201) {
            this.props.setLoginState(response.data.token, response.data.email);
          }
        })
        .catch((error) => {
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
          password: this.state.loginPassword,
        })
        .then((response) => {
          this.props.getCurrentEmail(this.state.loginEmail);
          this.props.updateUser();

          if (response.status === 200) {
            this.props.setLoginState(response.data.token, response.data.email);
          }
        })
        .catch((error) => {
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
    }
    return true;
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
    }
    return true;
  }

  loginForm() {
    return (
      <div className="loginForm-edit">
        <form style={style.form}>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.loginEmail}
              onChange={this.onInputChange}
              id="loginEmail"
              floatingLabelText="Email Address"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
            />
            <br />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email to anyone else.
            </small>
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="password"
              value={this.state.loginPassword}
              onChange={this.onInputChange}
              id="loginPassword"
              floatingLabelText="Password"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
            />
          </div>
        </form>
        <RaisedButton
          label="Login"
          type="submit"
          onClick={this.onLoginSubmit}
          fullWidth={this.state.style.fullWidth}
          secondary={this.state.style.secondary}
        />
        <a
          href="auth/google"
          title="Google+"
          onClick={this.googleAuth}
          className="btn btn-googleplus btn-lg"
          style={style.side}
        >
          <i className="fa fa-google-plus fa-fw" /> Sign in with Google
        </a>
        <br />
        <Link style={style.side} to={{ pathname: '/forgot' }}>
          Forgot password?
        </Link>
      </div>
    );
  }

  signupForm() {
    return (
      <div className="signupForm-edit">
        <form style={style.form}>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.signupName}
              onChange={this.onInputChange}
              id="signupName"
              floatingLabelText="Name"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
            />
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.signupEmail}
              onChange={this.onInputChange}
              id="signupEmail"
              floatingLabelText="Email"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
            />
            <small className="form-text text-muted">This email account will be used for logging in.</small>
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="password"
              value={this.state.signupPassword}
              onChange={this.onInputChange}
              id="signupPassword"
              floatingLabelText="Password"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
            />
          </div>
          <div style={style.textContainer}>
            <TextField
              inputStyle={style.input}
              fullWidth={this.state.style.fullWidth}
              type="text"
              value={this.state.signupImageUrl}
              onChange={this.onInputChange}
              id="signupImageUrl"
              floatingLabelText="Profile Image URL"
              floatingLabelStyle={style.label}
              floatingLabelFocusStyle={style.label}
            />
            <small className="form-text text-muted">A profile image will further personalize your account!</small>
          </div>
          <RaisedButton
            style={style.button}
            label="Sign Up"
            type="submit"
            onClick={this.onSignupSubmit}
            fullWidth={this.state.style.fullWidth}
            secondary={this.state.style.secondary}
          />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="login-container">
        <Paper style={style.paper}>
          <Tabs tabItemContainerStyle={style.headline}>
            <Tab style={style.tab} label="Login">
              {this.loginForm()}
            </Tab>
            <Tab style={style.tab} label="Register">
              {this.signupForm()}
            </Tab>
          </Tabs>
        </Paper>
      </div>
    );
  }
}

export default LoginSignup;
