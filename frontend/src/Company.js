import React, { Component } from 'react';
import JobCard from './JobCard';
import JoblyApi from './JoblyApi';

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: '',
      name: '',
      num_employees: null,
      description: '',
      logo_url: null,
      jobs: []
    };
  }

  async componentDidMount() {
    console.log('company handle:', this.props.match.params.name);
    try {
      const companyHandle = this.props.match.params.name;
      const company = await JoblyApi.getCompany(companyHandle);

      this.setState({
        ...company
      });
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  render() {
    // could destructure date for less repetition
    return (
      <div className="Company">
        <h3>{this.state.name}</h3>
        <p>{this.state.description}</p>
        {this.state.jobs.length > 0 ? (
          this.state.jobs.map(j => (
            <JobCard
              handleApply={this.props.handleApply}
              handleUpdate={this.props.handleUpdate}
              key={j.id}
              title={j.title}
              salary={j.salary}
              equity={j.equity}
              id={j.id}
              currentUser={this.props.currentUser}
              applied={this.props.currentUser.jobs.find(job => job.id === j.id)}
            />
          ))
        ) : (
          <h3>Loading jobs...</h3>
        )}
      </div>
    );
  }
}

export default Company;
