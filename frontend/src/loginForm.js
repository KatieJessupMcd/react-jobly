import React, { Component } from 'react';
import loginSignupBackground from './loginSignupBackground.jpg';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: '',
      loginActive: true,
      signUpActive: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.handleSubmitSignUp = this.handleSubmitSignUp.bind(this);
  }

  handleSubmitLogin(evt) {
    evt.preventDefault();
    const { username, password } = this.state;
    this.props.handleLogin(username, password);
    this.setState({ username: '', password: '' });
  }

  handleSubmitSignUp(evt) {
    evt.preventDefault();
    const { username, password, first_name, last_name, email } = this.state;

    this.props.handleSignUp(username, password, first_name, last_name, email);
    // resets form
    this.setState({
      username: '',
      password: '',
      first_name: '',
      last_name: '',
      email: ''
    });
    this.props.history.replace('/jobs');
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    let backgroundStyle = {
      background: `url(${loginSignupBackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no repeat',
      height: '100vh',
      width: '100%'
    };
    const loginForm = (
      <div className="card col-md-8 offset-md-2 special-card">
        <div className="card-body p-1.25">
          <form onSubmit={this.handleSubmitLogin}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );

    const signUpForm = (
      <div className="card col-md-8 offset-md-2 special-card">
        <div className="card-body p-1.25">
          <form onSubmit={this.handleSubmitSignUp}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <input
                onChange={this.handleChange}
                name="username"
                value={this.state.username}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="examplefirst_name">First name</label>
              <input
                onChange={this.handleChange}
                name="first_name"
                value={this.state.first_name}
                type="first_name"
                className="form-control"
                id="exampleInputfirst_name1"
                placeholder="First Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="examplelast_name">Last Name</label>
              <input
                onChange={this.handleChange}
                name="last_name"
                value={this.state.last_name}
                type="last_name"
                className="form-control"
                id="exampleInputlast_name1"
                placeholder="Last Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleemail">Email</label>
              <input
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
                type="email"
                className="form-control"
                id="exampleInputemail1"
                placeholder="Email"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    );

    return (
      <div className="row">
        <div style={backgroundStyle}>
          <div
            className="btn-group pt-5"
            role="group"
            aria-label="Basic example"
          >
            <button
              onClick={() =>
                this.setState({ loginActive: true, signUpActive: false })
              }
              type="button"
              className="btn btn-secondary"
            >
              Login
            </button>
            <button
              onClick={() =>
                this.setState({ loginActive: false, signUpActive: true })
              }
              type="button"
              className="btn btn-secondary"
            >
              Sign up
            </button>
          </div>
          {this.state.loginActive ? loginForm : signUpForm}
        </div>
      </div>
    );
  }
}

export default LoginForm;
