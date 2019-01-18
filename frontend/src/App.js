import React, { Component } from 'react';
import Routes from './Routes';
import NavBar from './NavBar';
import JoblyApi from './JoblyApi';
import { withRouter } from 'react-router-dom';
import decode from 'jwt-decode';
// import { getCompany, getAllCompanies } from './JoblyApi';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem('token'),
      error: false,
      currentUser: {
        username: '',
        first_name: '',
        last_name: '',
        photo_url: '',
        email: '',
        jobs: []
      }
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  async componentDidMount() {
    // decode token
    if (this.state.isLoggedIn) {
      let token = localStorage.getItem('token');
      let username = decode(token).username;

      this.setState({ currentUser: await JoblyApi.getUser(username) });
    }
  }

  async handleSignUp(username, password, first_name, last_name, email) {
    try {
      await JoblyApi.signUp(username, password, first_name, last_name, email);

      this.setState(
        {
          isLoggedIn: true,
          currentUser: { username, first_name, last_name, email, photo_url: '' }
        },
        () => this.props.history.replace('/jobs')
      );
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  async updateCurrentUser() {
    const username = this.state.currentUser.username;
    this.setState({
      currentUser: await JoblyApi.getUser(username)
    });
  }

  async handleLogin(username, password) {
    try {
      await JoblyApi.login(username, password);
      const currentUser = await JoblyApi.getUser(username);

      this.setState({ isLoggedIn: true, currentUser: currentUser }, () =>
        this.props.history.replace('/jobs')
      );
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  handleLogout() {
    try {
      localStorage.clear();
      this.setState(
        {
          isLoggedIn: false,
          currentUser: {
            username: '',
            first_name: '',
            last_name: '',
            photo_url: '',
            email: ''
          }
        },
        () => this.props.history.replace('/')
      );
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar
          isLoggedIn={this.state.isLoggedIn}
          handleLogout={this.handleLogout}
        />
        <div className="body container">
          <Routes
            isLoggedIn={this.state.isLoggedIn}
            handleLogin={this.handleLogin}
            handleSignUp={this.handleSignUp}
            currentUser={this.state.currentUser}
            addJobToUser={this.addJobToUser}
            handleUpdate={this.updateCurrentUser}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
