import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: hsla(255, 100%, 90%, 0.1);
  background-image: radial-gradient(hsla(209, 100%, 47%, 1.00) 3%, transparent 0);
  background-size: 40px 40px
`

export const Main = styled.div`
  padding: 20px;
`

export const Header = styled.h3`
  font-size: 86px
`

export const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #3498db;
  margin-right: 10px;
  color: #eee

  :hover {
    background-color: #2980b9
    font-color: #fff
  }
`

export const Link = styled.a`
  text-decoration: none;
  color: #eee
`