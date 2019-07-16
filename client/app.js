import React, { Component } from 'react';
import axios from 'axios';
import RepoManager from './repo_manager';
import RepoList from './repo_list';
import NavBar from './navbar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Jarrod',
      view: 'main',
      repos: [props.sampleData] || []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // axios.get('/users/repos')
    //   .then((results) => {
    //     const { username, repos } = results.data;
    //     this.setState({ username, repos})
    //   })
    //   .catch((err) => {
    //     console.log('Error: ', err);
    //   })
  }

  handleSubmit(organization, repository) {
    axios.post('http://localhost:3000/users/repos', { organization, repository })
      .then((results) => {
        console.log(results);
      })
      .catch((err) => {
        console.error(err);
      })
  };
  
  render() {
    return (
      <div>
        <NavBar username={this.state.username}/>
        <div>
          <RepoManager handleSubmit={this.handleSubmit}/>
        </div>
        <div>
          <RepoList repos={this.state.repos} />
        </div>
      </div>
    );
  }
};
export default App;