import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HomePageBackground from './HomePageBackground.jpg';

class HomePage extends Component {
  render() {
    let backgroundStyle = {
      background: `url(${HomePageBackground})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no repeat',
      height: '100vh',
      width: '100%'
    };

    let loggedInHomepage = <h3>Welcome Back</h3>;
    let loggedOutHomepage = (
      <Link to="/login">
        <button className="btn btn-primary btn-lg" type="button">
          Login
        </button>
      </Link>
    );
    return (
      <div className="row HomePage">
        <div className="pt-5" style={backgroundStyle}>
          <div className="card special-card col-6 offset-3 py-3">
            <h1 className="pt-5" style={{ fontSize: '4rem' }}>
              Jobly
            </h1>
            <p style={{ fontSize: '3rem' }}>
              All the jobs in one, convenient place.{' '}
            </p>
            {this.props.isLoggedIn ? loggedInHomepage : loggedOutHomepage}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
