import React from 'react'
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'
import { Navbar, Greeting, Left, Logo } from './styles';

const NavBar = props => {
  const { view, username } = props;
  const isUserLoggedIn = (username !== '');
  const user_message = (isUserLoggedIn) ? `Welcome, ${username}` : '';
  if(isUserLoggedIn && view === 'main') {
    return (
      <Navbar data-testid="navbar">
        <Left>
          <Logo href="/"><FontAwesomeIcon icon={faBinoculars} style={{marginRight: '5px'}}/>Commit Spy</Logo>
          <Greeting>{user_message}</Greeting>
        </Left>
        <Logo href="/logout">Log Out</Logo>
      </Navbar>
      )
    }
  else {
      return (
        <Navbar data-testid="navbar" color="light">
          <Logo href="/"><FontAwesomeIcon icon={faBinoculars} style={{marginRight: '5px'}}/>Commit Spy</Logo>
          <Logo href="/login">Log In</Logo>
        </Navbar>
        ) 
    }
}

NavBar.propTypes = {
  view: PropTypes.string.isRequired,
  username: PropTypes.string
}
export default NavBar