import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import RepoManager from './repo_manager';

class App extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    axios.get('/users/repos')
      .then((results) => {
        console.log('Results: ', results);
      })
      .catch((err) => {
        console.log('Error: ', err);
      })
  }
  
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
          <RepoManager />
        </div>
      </div>
    );
  }
};
export default App;