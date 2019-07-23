import React, { Component } from 'react';
import axios from 'axios';
import RepoManager from './repo_manager';
import RepoList from './repo_list';
import NavBar from './navbar';
import Sidebar from './sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      view: 'main',
      repos: props.sampleData || []
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
    //     this.setState({ username, repos}, () => {
    //       console.log('New State: ', this.state.repos)
    //     })
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
    console.log('Router state: ', this.state);
    switch(this.state.view) {
      case "main":
        return (
          <div style={{display: "flex"}}>
            <div style={{backgroundColor: '#efe', flex: 1}}>
              <Sidebar repos={this.state.repos} handleRemoveRepo={this.handleRemoveRepo}/>
            </div>
            <div style={{flex: 3}}>
              <RepoManager
                handleSubmit={this.handleSubmit}
                repos={this.state.repos}
                handleRemoveRepo={this.handleRemoveRepo}/> 
              <RepoList repos={this.state.repos} />
            </div>
          </div>
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
      <div data-testid="app">
        <NavBar view={view} username={username} handleViewChange={this.handleViewChange}/>
        { this.router()}
      </div>
    );
  }
};
export default App;