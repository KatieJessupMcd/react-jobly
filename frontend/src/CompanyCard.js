import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import companyPlaceholder from './company-placeholder.png';

class CompanyCard extends Component {
  
  render() {
   let { handle, name, desc, logo_url} = this.props; 
    return (
      <Link to={`/companies/${handle}`}>
        <div className="CompanyCard card my-3">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">
              <span>{name}</span>
              <img
                src={logo_url}
                style={{ width: '10%', height: '10%', contentAlign: 'right' }}
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

CompanyCard.defaultProps = {
    logo_url: companyPlaceholder
}

export default CompanyCard;
