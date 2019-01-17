import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Jobs from './Jobs';
import Companies from './Companies';
import Company from './Company';
import HomePage from './HomePage';
import LoginForm from './loginForm';

class ProtectedRoute extends Component {
  render() {
    console.log(this.props);
    if (this.props.isLoggedIn === false) {
      return <Redirect to="/login" />;
    } else {
      return <Route {...this.props} />;
    }
  }
}

class Routes extends Component {
  static defaultProps = {};
  render() {
    return (
      <div className="Routes">
        <Switch>
          {/* if logged-out, render login */}
          <Route
            exact
            path="/login"
            render={props => (
              <LoginForm
                {...props}
                handleLogin={this.props.handleLogin}
                handleSignUp={this.props.handleSignUp}
              />
            )}
          />
          <ProtectedRoute
            exact
            path="/companies"
            render={() => <Companies />}
            isLoggedIn={this.props.isLoggedIn}
          />
          <ProtectedRoute
            exact
            path="/companies/:name"
            render={props => <Company {...props} />}
            isLoggedIn={this.props.isLoggedIn}
          />

          <ProtectedRoute
            exact
            path="/jobs"
            render={() => <Jobs />}
            isLoggedIn={this.props.isLoggedIn}
          />
          <ProtectedRoute
            exact
            path="/profile"
            render={() => <h1>This will render the Profile Component</h1>}
            isLoggedIn={this.props.isLoggedIn}
          />
          <ProtectedRoute
            exact
            path="/"
            render={() => <HomePage />}
            isLoggedIn={this.props.isLoggedIn}
          />
          <Redirect to="/" />
        </Switch>
      </div>
    );
  }
}

export default Routes;
