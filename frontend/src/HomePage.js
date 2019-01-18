import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class HomePage extends Component {
  static defaultProps = {};
  render() {
    let loggedInHomepage = <h3>Welcome Back</h3>;
    let loggedOutHomepage = (
      <Link to="/login">
        <button className="btn btn-primary" type="button">
          Login
        </button>
      </Link>
    );
    return (
      <div className="HomePage">
        <h1>Jobly</h1>
        <p>All the jobs in one, convenient place. </p>
        {this.props.isLoggedIn ? loggedInHomepage : loggedOutHomepage}
      </div>
    );
  }
}

export default HomePage;
