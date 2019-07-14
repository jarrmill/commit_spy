import React from 'react';
import { Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';

const App = () => { 
  return (
    <div>
      <Navbar color="light">
        <NavbarBrand href="/">Commit Spy</NavbarBrand>
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      </Navbar>
      <div>
        Hello!
      </div>
    </div>
  );
};
export default App;