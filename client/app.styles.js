import styled from 'styled-components';

export const Main = styled.div`
  background: hsla(255, 100%, 90%, 0.1);
  background-image: radial-gradient(hsla(209, 100%, 47%, 1.00) 3%, transparent 0);
  background-size: 40px 40px;

  @media (max-width: 1100px) {
    flex: 3;
  }
  flex: 4;
`

export const SidebarContainer = styled.div`
  backgroundColor: '#ddd';
  flex: 1;
`