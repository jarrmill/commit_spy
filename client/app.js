import React, { Component } from 'react';
import axios from 'axios';
import RepoInput from './repo_input';
import RepoList from './repo_list';
import NavBar from './navbar';
import Sidebar from './sidebar';
import Splash from './splash';
import { Main, SidebarContainer, FirstCommitPage, FirstCommitContainer, FirstCommitMessage } from './app.styles';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      view: 'splash',
      repos: props.sampleData || [],
      displayLimit: 5
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.handleRemoveRepo = this.handleRemoveRepo.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleDemoSubmit = this.handleDemoSubmit.bind(this);
    this.handleDemoRemoveRepo = this.handleDemoRemoveRepo.bind(this);
  }

  componentDidMount() {
    axios.get('/users/repos')
      .then((results) => {
        if(results.data.username) {
          const { username, repos } = results.data;
          console.log('Repos: ', repos);
          this.setState({ username, repos, view: 'main'}, () => console.log('Fini!'))

        } else {
         this.setState({view: 'splash'});
        }
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
  }

  handleSubmit(organization, repository) {
    const repos = this.state.repos.slice();

    axios.post('/users/repos', { organization, repository })
      .then((results) => {
        const newCommits = results.data || [];
        repos.push(newCommits);
        this.setState({repos});
      })
      .catch((err) => {
        console.error(err);
      })
  };

  handleDemoSubmit(organization, repository) {
    const repos = this.state.repos.slice();

    axios.post('/users/repos/demo', { organization, repository })
      .then((results) => {
        console.log('Results: ', results.data);
        const newCommits = results.data || [];
        repos.push(newCommits);
        this.setState({repos}, () => console.log('New State: ', this.state));
      })
      .catch((err) => {
        console.error(err);
      })
  }

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
        repos.splice(arrIndex, 1);
        this.setState({repos});
      })
      .catch((err) => {
        console.error(err);
      })
  }
  
  handleDemoRemoveRepo(arrIndex) {
    const repos = this.state.repos.slice();

    repos.splice(arrIndex, 1);
    this.setState({repos});
  }

  router() {
    const doesUserHaveRepos = (this.state.repos.length);
    switch(this.state.view) {
      case 'splash':
        return <Splash handleViewChange={this.handleViewChange}/>
      case "demo":
        return (
          <div style={{display: "flex"}}>
            <SidebarContainer style={{backgroundColor: '#ddd', flex: 1}}>
              <Sidebar repos={this.state.repos} handleRemoveRepo={this.handleDemoRemoveRepo}/>
            </SidebarContainer>
            <Main>
              <RepoInput
                repos={this.state.repos}
                displayLimit={this.state.displayLimit}
                handleSubmit={this.handleDemoSubmit}
                handleRemoveRepo={this.handleDemoRemoveRepo}
                handleLimitChange={this.handleLimitChange} />
              <RepoList repos={this.state.repos} limit={this.state.displayLimit} />
            </Main>
          </div>
        )
      case "main":
        return ( doesUserHaveRepos ) ? (
          <div style={{display: "flex"}}>
            <SidebarContainer style={{backgroundColor: '#ddd', flex: 1}}>
              <Sidebar repos={this.state.repos} handleRemoveRepo={this.handleRemoveRepo}/>
            </SidebarContainer>
            <Main>
              <RepoInput
                repos={this.state.repos}
                displayLimit={this.state.displayLimit}
                handleSubmit={this.handleSubmit}
                handleRemoveRepo={this.handleRemoveRepo}
                handleLimitChange={this.handleLimitChange} />
              <RepoList repos={this.state.repos} limit={this.state.displayLimit} />
            </Main>
          </div>
        ) : 
        (
          <FirstCommitPage>
            <FirstCommitContainer>
              <Main>
                <FirstCommitMessage>
                  <h1>Welcome to Commit Spy!</h1>
                  <p>To get started, add a Github URL below. Feel free to use ours!</p>
                  <p><b>https://github.com/jarrmill/commit_spy</b></p>
                </FirstCommitMessage>
              <RepoInput
                repos={this.state.repos}
                displayLimit={this.state.displayLimit}
                handleSubmit={this.handleSubmit}
                handleRemoveRepo={this.handleRemoveRepo}
                handleLimitChange={this.handleLimitChange} />
              </Main>
            </FirstCommitContainer>
          </FirstCommitPage>
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