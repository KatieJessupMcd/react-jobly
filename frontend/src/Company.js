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
    let { name, description, jobs } = this.state; 
    let { handleApply, handleUpdate, currentUser } = this.props; 
    return (
      <div className="Company col-md-8 offset-md-2 pt-5">
        <h3>{name}</h3>
        <p>{description}</p>
        {jobs.length > 0 ? (
          jobs.map(j => (
            <JobCard
              handleApply={handleApply}
              handleUpdate={handleUpdate}
              key={j.id}
              title={j.title}
              salary={j.salary}
              equity={j.equity}
              id={j.id}
              currentUser={currentUser}
              applied={currentUser.jobs.find(job => job.id === j.id)}
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
