import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import genericLogo from './genericLogo.png';

class CompanyCard extends Component {
  static defaultProps = {
    logo: genericLogo
  };
  render() {
    // create CSS style sheet and remove inline style
    // ** Added card title h5, took out styling on card div
    // could destructure this.props to avoid repetition
    return (
      <Link to={`/companies/${this.props.handle}`}>
        <div className="CompanyCard card ">
          <div className="card-body">
            <h5 className="card-title d-flex justify-content-between">
              <span>{this.props.name}</span>
              <img
                src={this.props.logo}
                style={{ width: '50px', contentAlign: 'right' }}
                alt="company logo"
              />
            </h5>
            <p>{this.props.desc}</p>
          </div>
        </div>
      </Link>
    );
  }
}

export default CompanyCard;
