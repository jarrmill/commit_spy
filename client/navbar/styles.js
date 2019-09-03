import styled from 'styled-components';

export const Navbar = styled.div`
  height: 60px;
  width: 100vw;
  display: flex;
  background-color: #24292e;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  font-color: white;
`
export const Left = styled.div`
  display: flex;
  flex-direction: columns;
  justify-content: center;
  align-items: center;
`
export const Greeting = styled.p`
  color: white;
  display: flex;
  text-align: center;
  margin-bottom: -4px;
  align-items: center;
  font-size: 12px;
`
export const Logo = styled.a`
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: white;
`