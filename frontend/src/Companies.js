import React, { Component } from 'react';
import CompanyCard from './CompanyCard';
import SearchForm from './SearchForm';
import JoblyApi from './JoblyApi';
// import companyListBackground from './companyListBackground.jpg';

// var styles = {
//   body: {
//     backgroundColor: 'gray',
//     backgroundSize: 'fill',
//     backgroundRepeat: 'no repeat',
//     height: '100vh',
//     width: '100%',

//   }}
class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [], currentPage: 1, companiesPerPage: 10 };

    this.searchCompanies = this.searchCompanies.bind(this);
    this.handleClick = this.handleClick.bind(this); 
  }

  async componentDidMount() {
    //   for(let i in styles.body){
    //     document.body.style[i] = styles.body[i];
    // }
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
  // async componentWillUnmount(){
  //   document.body.style.background = null;
  // }

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

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    }); 
  }

  render() {
    // let backgroundStyle = {
    //   background: `url(${companyListBackground})`,
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no repeat',
    //   height: '100vh',
    //   width: '100%'
    // };
    let { companies, currentPage, companiesPerPage } = this.state;

    // Logic for displaying companies
    let indexOfLastCompany = currentPage * companiesPerPage;
    let indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
    let currentCompanies = companies.slice(
      indexOfFirstCompany,
      indexOfLastCompany
    );

    // Logic to display page numbers
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(companies.length / companiesPerPage); i++) {
      pageNumbers.push(1);
    }
    return (
      <div className="row">
        <div className="Companies col-md-8 offset-md-2">
          <div className="Companies-Info">
            <SearchForm handleSearch={this.searchCompanies} />
            {currentCompanies.length > 0 ? (
              currentCompanies.map(c => (
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
        </div>
        <ul id="page-numbers">
          {pageNumbers.map(number => {
            return (
              <li key={number} id={number} onClick={this.handleClick}>
                {number}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Companies;
