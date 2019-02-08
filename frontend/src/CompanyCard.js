import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import genericLogo from './genericLogo.png';

class CompanyCard extends Component {
  static defaultProps = {
    logo: genericLogo
  };
  render() {
   let { handle, name, logo, desc} = this.props; 
    return (
      <Link to={`/companies/${handle}`}>
        <div className="CompanyCard card my-3">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">
              <span>{name}</span>
              <img
                src={logo}
                style={{ width: '50px', contentAlign: 'right' }}
                alt="company logo"
              />
            </h5>
            <p>{desc}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default CompanyCard;
