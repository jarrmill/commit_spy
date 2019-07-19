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
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleRemoveRepo = this.handleRemoveRepo.bind(this);
  }

  componentDidMount() {
    // axios.get('/users/repos')
    //   .then((results) => {
    //     const { username, repos } = results.data;
    //     console.log('User: ', username);
    //     console.log('Repos: ', repos);
    //     this.setState({ username, repos})
    //   })
    //   .catch((err) => {
    //     console.log('Error: ', err);
    //   })
  }

  handleSubmit(organization, repository) {
    const repos = this.state.repos.slice();

    axios.post('http://localhost:3000/users/repos', { organization, repository })
      .then((results) => {
        console.log('POST results: ', results);
        const newCommits = results.data;
        repos.push(newCommits);
        this.setState({repos});
      })
      .catch((err) => {
        console.error(err);
      })
  };

  handleViewChange(newView) {
    this.setState({view: newView});
  }
  handleRemoveRepo(organization, repository, arrIndex) {
    const repos = this.state.repos.slice();
    axios.delete('/user/repos', { data: {organization, repository} })
      .then((result) => {
        console.log(result);
        repos.splice(arrIndex, 1);
        this.setState({repos});
      })
      .catch((err) => {
        console.error(err);
      })
  }

  router() {
    switch(this.state.view) {
      case "main":
        return (
          <RepoList repos={this.state.repos} />
        )
      case "manager":
        return (
          <RepoManager
            handleSubmit={this.handleSubmit}
            repos={this.state.repos}
            handleRemoveRepo={this.handleRemoveRepo}/>
        )
    }
  }
  
  render() {
    const { username, view } = this.state;
    return (
      <div>
        <NavBar view={view} username={username} handleViewChange={this.handleViewChange}/>
        { this.router()}
      </div>
    );
  }
};
export default App;