import React from 'react'
import { Container, Main, Header, Button, Link} from './styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBinoculars } from '@fortawesome/free-solid-svg-icons'

const Splash = props => {
  return (
    <Container>
      <Main>
        <Header> <FontAwesomeIcon icon={faBinoculars} /> Become a Cyber Sleuth</Header>
        <p>Welcome to Git Spy, a place to monitor Git commit history</p>
        <p>This website is a project by Jarrod Miller</p>
        <Button><Link href='/login'>Login</Link></Button>
        <Button onClick={() => props.handleViewChange('demo')}>Demo</Button>
      </Main>
    </Container>
    )
}

export default Splash;