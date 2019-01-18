import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applied: this.props.applied
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleApply = this.handleApply.bind(this);
  }

  handleClick() {
    console.log(this.props.currentUser);
    this.handleApply(this.props.id);
    this.setState(
      { applied: true }
      // get curr user and respectivejobs and add new job
    );
  }

  async handleApply(jobId) {
    try {
      await JoblyApi.applyToJob(jobId);
      this.setState({
        isApplied: true
      });
      this.props.handleUpdate();
    } catch (error) {
      this.setState({
        error: true
      });
      console.log('error msg', error);
    }
  }

  render() {
    return (
      <div className="JobCard card my-3">
        <div className="card-body">
          <h5 className="card-title d-flex justify-content-between">
            <div>{this.props.title}</div>
            <p>Salary: {this.props.salary}</p>
            <p>Equity: {this.props.equity}</p>
          </h5>
        </div>
        <button
          onClick={this.handleClick}
          type="button"
          className="btn btn-danger"
          disabled={this.state.applied}
        >
          {this.state.applied ? 'Applied' : 'Apply'}
        </button>
      </div>
    );
  }
}

export default JobCard;
