import styled from "styled-components";

export const CommitContainer = styled.div`
  background-color: #fafbfc;
  border: 1px solid #ccc;
  margin: ${props => props.isRepeat ? "0px 5px 0px 5px" : "5px 5px 0px 5px"};
  border-bottom: ${props => props.isRepeat ? "none" : "none"};
  border-top: ${props => props.isRepeat ? "none" : "1px solid #ccc"}; 

  margin: 0px 10px 0px 10px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  
  :hover {
    background-color: #edf6ff;
  }
  @media (max-width: 600px) {
    height: 150px;
  }
`
export const User = styled.div`
  display: flex;
  flex-direction: row;
`
export const AvatarContainer = styled.div`
  margin-right: 10px;
  width: 30px;
`

export const Avatar = styled.img`
  height: 30px;
  border-radius: 50%;
`
export const HeaderContainer = styled.div`
  padding: 5px;
  padding-bottom: 0px;
`

export const BodyContainer = styled.div`
  flex: 3;
`
export const ButtonContainer = styled.div`
  flex: 2;
`
export const RepoName = styled.div`
  margin:10px;
  margin-top: 20px
  font-size: 18px;
`
export const Name = styled.p`

`
