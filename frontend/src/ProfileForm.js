import React, { Component } from 'react';
import JoblyApi from './JoblyApi';

class ProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      first_name: this.props.first_name,
      last_name: this.props.last_name,
      email: this.props.email,
      photo_url: 'https://www.image.com',
      hasUpdated: false
    };
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }

  async handleProfileUpdate(evt) {
    evt.preventDefault();
    let { password, first_name, last_name, email, photo_url } = this.state;
    try {
      const user = await JoblyApi.updateUser(
        this.props.currentUser.username,
        password,
        first_name,
        last_name,
        email,
        photo_url
      );
      console.log(user);
      this.setState({ hasUpdated: true });
    } catch (error) {
      this.setState({
        error: true
      });
    }
  }
  render() {
    // console.log('curr user in prof', this.props.currentUser);
    return (
      <div className="card">
        <div className="card-body p-1.25">
          <form onSubmit={this.handleProfileUpdate}>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Username</label>
              <p className="form-control-plaintext">
                {this.props.currentUser.username}
              </p>
            </div>
            <div className="form-group">
              <label htmlFor="examplefirst_name">First name</label>
              <input
                onChange={this.handleChange}
                name="first_name"
                value={this.state.first_name}
                type="first_name"
                className="form-control"
                id="exampleInputfirst_name1"
                placeholder={this.props.currentUser.first_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="examplelast_name">Last Name</label>
              <input
                onChange={this.handleChange}
                name="last_name"
                value={this.state.last_name}
                type="last_name"
                className="form-control"
                id="exampleInputlast_name1"
                placeholder={this.props.currentUser.last_name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleemail">Email</label>
              <input
                onChange={this.handleChange}
                name="email"
                value={this.state.email}
                type="email"
                className="form-control"
                id="exampleInputemail1"
                placeholder={this.props.currentUser.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleemail">Photo URL</label>
              <input
                onChange={this.handleChange}
                name="photo_url"
                value={this.state.photo_url}
                type="uri"
                className="form-control"
                id="photo_url"
                placeholder={this.props.currentUser.photo_url}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Re-enter Password</label>
              <input
                onChange={this.handleChange}
                name="password"
                value={this.state.password}
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            {this.state.hasUpdated ? (
              <div className="alert alert-success fade show mt-3" role="alert">
                {this.props.currentUser.username} has successfully updated!
              </div>
            ) : (
              ''
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default ProfileForm;
