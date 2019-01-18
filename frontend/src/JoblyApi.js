import axios from 'axios';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = 'get') {
    const token = localStorage.getItem('token');
    paramsOrData._token = token;

    console.debug('API Call:', endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === 'get' ? 'params' : 'data']: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async login(username, password) {
    let token = await this.request('login', { username, password }, 'post');
    localStorage.setItem('token', token.token);
  }

  static async signUp(username, password, first_name, last_name, email) {
    console.log({ username, password, first_name, last_name, email });
    let token = await this.request(
      'users',
      {
        username,
        password,
        first_name,
        last_name,
        email
      },
      'post'
    );
    localStorage.setItem('token', token.token);
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getAllCompanies(query = {}) {
    let res = await this.request(`companies`, query);
    return res.companies;
  }

  static async getAllJobs(query = {}) {
    let res = await this.request(`jobs`, query);
    return res.jobs;
  }

  static async getJobsForCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company.jobs;
  }

  // get user info
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async updateUser(
    username,
    password,
    first_name,
    last_name,
    email,
    photo_url
  ) {
    let res = await this.request(
      `users/${username}`,
      { password, first_name, last_name, email, photo_url },
      'patch'
    );
    return res.user;
  }

  // post apply to job
  static async applyToJob(jobId) {
    let res = await this.request(
      `jobs/${jobId}/apply`,
      { state: 'applied' },
      'post'
    );
    return res;
  }
}

export default JoblyApi;
