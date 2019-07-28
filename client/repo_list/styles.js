import styled from "styled-components";

export const CommitContainer = styled.div`
  background-color: #eee;
  margin: ${props => props.isRepeat ? "0px 5px 0px 5px" : "5px 5px 0px 5px"}; 
  padding: 5px;
  display: flex;
  overflow: hidden;
  
  @media (max-width: 600px) {
    height: 150px;
  }
  height: 80spx;
`
export const Commit = styled.div`

`
export const AvatarContainer = styled.div`
  margin-right: 10px;
  width: 50px;
`

export const Avatar = styled.img`
  height: 50px;
  border-radius: 50%;
`
export const HeaderContainer = styled.div`
  padding-top: 13px;
`

export const BodyContainer = styled.div`

`
export const Name = styled.p`
  font-size: 110%;
`
