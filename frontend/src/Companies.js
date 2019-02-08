import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import JoblyApi from './JoblyApi';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };

    this.searchCompanies = this.searchCompanies.bind(this);
  }

  async componentDidMount() {
    try {
      this.setState({
        companies: await JoblyApi.getAllCompanies()
      });
    } catch (error) {
      this.setState({
        error: true
      });

      console.log('error msg', error);
    }
  }

  async searchCompanies(query) {
    try {
      this.setState({
        companies: await JoblyApi.getAllCompanies(query)
      });
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  render() {
    return (
      <div className="Companies col-md-8 offset-md-2">
        <SearchForm handleSearch={this.searchCompanies} />
        {this.state.companies.length > 0 ? (
          this.state.companies.map(c => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              desc={c.description}
              logo={c.logo_url}
            />
          ))
        ) : (
          <h3>Loading companies...</h3>
        )}
      </div>
    );
  }
}

export default Companies;
