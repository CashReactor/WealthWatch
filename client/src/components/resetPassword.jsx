import React from 'react';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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


export default class ResetPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
    };
    this.resetPasswordForm = this.resetPasswordForm.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onPasswordSubmit(e) {
    e.preventDefault();
    const token = this.props.match.params.token;
    const data = { email: this.state.email, password: this.state.password, passwordConfirm: this.state.passwordConfirm };
    axios
      .post(`/auth/reset/${token}`, data)
      .then((response) => {
        if (response.status === 201) {
          this.props.history.push('/');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onInputChange(e) {
    console.log(e.target.id);
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  resetPasswordForm() {
    return (
      <div className="loginForm-edit">
        <form style={style.form}>
          <div style={style.textContainer}>
            <TextField inputStyle={style.input} fullWidth={true} type="text" value={this.state.email} onChange={this.onInputChange} id="email" floatingLabelText="Email Address" floatingLabelStyle={style.label} floatingLabelFocusStyle={style.label} />
          </div>
          <div>
            <TextField inputStyle={style.input} fullWidth={true} type="password" value={this.state.password} onChange={this.onInputChange} id="password" floatingLabelText="Password" floatingLabelStyle={style.label} floatingLabelFocusStyle={style.label} />
          </div>
          <div>
            <TextField inputStyle={style.input} fullWidth={true} type="password" value={this.state.passwordConfirm} onChange={this.onInputChange} id="passwordConfirm" floatingLabelText="Confirm Password" floatingLabelStyle={style.label} floatingLabelFocusStyle={style.label} />
          </div>
          <RaisedButton label="Update Password" type="submit" onClick={this.onPasswordSubmit} fullWidth={true} secondary={true} />
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="login-container">
        <Paper style={style.paper}>
          {this.resetPasswordForm()}
        </Paper>
      </div>
    );
  }
}
