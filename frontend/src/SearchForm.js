import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [], search: '', jobs: [] };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    console.log('this is the SEARCH TERM', this.state.search);
    this.props.handleSearch({ search: this.state.search });
    this.setState({ companies: [], search: '', jobs: [] });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  render() {
    return (
      <div className="SearchForm mt-5">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group input-group">
            <label htmlFor="searchForm" />
            <input
              onChange={this.handleChange}
              name="search"
              value={this.state.search}
              type="text"
              className="form-control"
              id="searchForm"
              aria-describedby="search"
              placeholder="Enter Search Term..."
            />
            <span className="input-group-btn">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchForm;
