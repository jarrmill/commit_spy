import styled from 'styled-components';

export const Main = styled.div`
  background-color: #ddd;
  @media (max-width: 1100px) {
    flex: 3;
  }
  flex: 4;
`

export const SidebarContainer = styled.div`
  backgroundColor: '#ddd';
  flex: 1;
`

export const FirstCommitPage = styled.div`
  background: hsla(255, 100%, 90%, 0.1);
  background-image: radial-gradient(hsla(209, 100%, 47%, 1.00) 3%, transparent 0);
  background-size: 40px 40px;
  
  padding: 50px;
  height: 100vh;
  width: 100vw;
  `
  export const FirstCommitContainer = styled.div`
    border: 1px solid grey;
  `
  
  export const FirstCommitMessage = styled.div`
  background-color: white;
  padding: 10px;
`