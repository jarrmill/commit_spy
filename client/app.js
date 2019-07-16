import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import RepoManager from './repo_manager';
import RepoList from './repo_list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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
        <Navbar color="light">
          <NavbarBrand href="/">Commit Spy</NavbarBrand>
          <NavItem>
            <NavLink href="/login">Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/logout">Logout</NavLink>
          </NavItem> 
        </Navbar>
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