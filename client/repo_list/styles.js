import styled from "styled-components";

export const CommitContainer = styled.div`
  background-color: #fafbfc;
  border: 1px solid #ccc;
  margin: 0px 10px 0px 10px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  height: 65px;
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
  font-weight: 80%;
`
export const AvatarContainer = styled.div`
  margin-right: 5px;
  width: 20px;
  display: flex;
  align-items: center;
`

export const Avatar = styled.img`
  height: 20px;
  border-radius: 50%;
`
export const HeaderContainer = styled.div`
  padding: 5px;
`

export const BodyContainer = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 5px;
`
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  flex: 2;
`
export const RepoName = styled.div`
  margin:10px;
  margin-top: 20px
  font-size: 18px;
`
export const Button = styled.button`
  color: #1e72d9;
  border: 1px solid #eee;
  border-radius: 5%;
  margin: 5px;
  width: 100px;

  :hover {
    border: 1px solid #1e72d9;
    background-color: #1e72d9;
    color: white;
  }

  :focus {
    outline: none;
  }

  &:last-child {
    margin-right: 15px;
    width: 45px;
  }
`