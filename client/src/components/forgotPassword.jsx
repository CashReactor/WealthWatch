import React from 'react';
import axios from 'axios';

class ForgotPassword extends React.Component {
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
          <label htmlFor="forgotEmail" />
          <input
            value={this.state.email}
            onChange={this.onInputChange}
            type="email"
            className="form-control"
            id="forgotEmail"
            placeholder="Enter email"
          />
        </div>
        <button type="submit" onClick={this.onEmailmeSubmit} className="btn btn-primary">
          Email me
        </button>
      </form>
    </div>
    );
  }

  resetPasswordForm() {
    return (
      <div>
      <form>
        <div>
          <label htmlFor="Password" />
          <input
            value={this.state.password}
            onChange={this.onInputChange}
            type="password"
            className="form-control"
            id="Password"
            placeholder="Enter password"
          />
        </div>
        <div>
          <label htmlFor="passwordConfirm" />
          <input
            value={this.state.passwordConfirm}
            onChange={this.onInputChange}
            type="password"
            className="form-control"
            id="PasswordConfirm"
            placeholder="Re-enter password"
          />
        </div>
        <button type="submit" onClick={this.onEmailmeSubmit} className="btn btn-primary">
          Email me
        </button>
      </form>
    </div>
    );
  }

  render() {
    const form = this.emailStatus ? this.resetPasswordForm() : this.forgotPasswordForm();
    return { form }
  }
}
