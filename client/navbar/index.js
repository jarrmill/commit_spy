import React from 'react'
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const NavBar = props => {
  const isUserLoggedIn = (props.username !== '');
  const user_message = (isUserLoggedIn) ? `Welcome, ${props.username}` : '';
  if(isUserLoggedIn) {
    return (
      <Navbar color="light">
        <NavbarBrand href="/">Commit Spy</NavbarBrand>
        <h6>{user_message}</h6>
        <NavLink href="#">Manage Your Repositories</NavLink>
        <NavLink href="/logout">Logout</NavLink>
      </Navbar>
      )
    } else {
      return (
        <Navbar color="light">
          <NavbarBrand href="/">Commit Spy</NavbarBrand>
          <NavLink href="/login">Login</NavLink>
        </Navbar>
        ) 
    }
}

export default NavBar