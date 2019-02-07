import React, { Component } from 'react';
import JobCard from './JobCard';
import SearchForm from './SearchForm';
import JoblyApi from './JoblyApi';

class Jobs extends Component {
  constructor(props) {
    super(props);
    this.state = { jobs: [] };
    this.searchJobs = this.searchJobs.bind(this);
  }
  static defaultProps = {};

  async componentDidMount() {
    try {
      this.setState({
        jobs: await JoblyApi.getAllJobs()
      });
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }

  async searchJobs(query) {
    try {
      console.log('QUERY inside jobs component', query);
      this.setState({
        jobs: await JoblyApi.getAllJobs(query)
      });
    } catch (error) {
      this.setState({
        error: true
      });
      console.log('error msg', error);
    }
  }

  render() {
    // will need to pass a onSubmit handler to the searchform for generating a request
    return (
      <div className="pt-5">
        <div className="Jobs col-md-8 offset-md-2">
          <SearchForm handleSearch={this.searchJobs} />
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
                applied={this.props.currentUser.jobs.find(
                  job => job.id === j.id
                )}
              />
            ))
          ) : (
            <h3>Loading jobs...</h3>
          )}
        </div>
      </div>
    );
  }
}

export default Jobs;
