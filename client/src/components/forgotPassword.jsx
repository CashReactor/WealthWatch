import React from 'react';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';


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

export default class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailStatus: false,
      password: '',
      passwordConfirm: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onEmailmeSubmit = this.onEmailmeSubmit.bind(this);
    this.forgotPasswordForm = this.forgotPasswordForm.bind(this);
  }

  onInputChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onEmailmeSubmit(e) {
    e.preventDefault();
    axios
      .post('auth/forgot', { email: this.state.email })
      .then((response) => {
        if (response.status === 201) {
          this.setState({ emailStatus: true });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  forgotPasswordForm() {
    return (
      <div>
        <form>
          <div>
            <TextField inputStyle={style.input} fullWidth={true} type="text" value={this.state.email} onChange={this.onInputChange} id="email" floatingLabelText="Email Address" floatingLabelStyle={style.label} floatingLabelFocusStyle={style.label} />
          </div>
          <RaisedButton label="Email Me" type="submit" onClick={this.onEmailmeSubmit} fullWidth={true} secondary={true} />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="login-container">
        <Paper style={style.paper}>
          {this.forgotPasswordForm()}
        </Paper>
      </div>
    );
  }
}
