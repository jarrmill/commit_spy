import React, { Component } from 'react';
import axios from 'axios';
import RepoInput from './repo_input';
import RepoList from './repo_list';
import NavBar from './navbar';
import Sidebar from './sidebar';
import { Main } from './app.styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      view: 'main',
      repos: props.sampleData || [],
      displayLimit: 5
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleRemoveRepo = this.handleRemoveRepo.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
  }

  componentDidMount() {
    axios.get('/users/repos')
      // .then((results) => {
      //   const { username, repos } = results.data;
      //   console.log('User: ', username);
      //   console.log('Repos: ', repos);
      //   this.setState({ username, repos}, () => {
      //     console.log('New State: ', this.state.repos)
      //   })
      // })
      // .catch((err) => {
      //   console.log('Error: ', err);
      // })
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
  handleLimitChange(newLimit) {
    this.setState({displayLimit: newLimit})
  }

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
            <div style={{backgroundColor: '#ddd', flex: 1}}>
              <Sidebar repos={this.state.repos} handleRemoveRepo={this.handleRemoveRepo}/>
            </div>
            <Main style={{flex: 3}}>
              <RepoInput
                repos={this.state.repos}
                displayLimit={this.state.displayLimit}
                handleSubmit={this.handleSubmit}
                handleRemoveRepo={this.handleRemoveRepo}
                handleLimitChange={this.handleLimitChange} />
              <RepoList repos={this.state.repos} limit={this.state.displayLimit} />
            </Main>
          </div>
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