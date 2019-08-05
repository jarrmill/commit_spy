import React from 'react'
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

const NavBar = props => {
  const { view, username } = props;
  const isUserLoggedIn = (username !== '');
  const user_message = (isUserLoggedIn) ? `Welcome, ${username}` : '';
  const usernameStyle = {
    height: "100%",
    paddingTop: "8px",
  }
  if(isUserLoggedIn && view === 'main') {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Commit Spy</NavbarBrand>
        <h6 style={usernameStyle}>{user_message}</h6>
        <NavLink href="/logout">Logout</NavLink>
      </Navbar>
      )
    }
  else if(isUserLoggedIn && view === 'manager') {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Commit Spy</NavbarBrand>
        <h6>{user_message}</h6>
        <NavLink href="#" onClick={() => props.handleViewChange('main')}>Main</NavLink>
        <NavLink href="/logout">Logout</NavLink>
      </Navbar>
    )
  }
  else {
      return (
        <Navbar color="light">
          <NavbarBrand href="/">Commit Spy</NavbarBrand>
          <NavLink href="/login">Login</NavLink>
        </Navbar>
        ) 
    }
}

NavBar.propTypes = {
  view: PropTypes.string.isRequired,
  username: PropTypes.string
}
export default NavBar