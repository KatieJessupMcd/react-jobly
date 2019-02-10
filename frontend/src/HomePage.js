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
        <button className="btn btn-primary" type="button">
          Login
        </button>
      </Link>
    );
    return (
      <div className="row HomePage" >
        <div className="pt-5" style={backgroundStyle}>
          <h1>Jobly</h1>
          <p>All the jobs in one, convenient place. </p>
          {this.props.isLoggedIn ? loggedInHomepage : loggedOutHomepage}
        </div>
      </div>
    );
  }
}

export default HomePage;
