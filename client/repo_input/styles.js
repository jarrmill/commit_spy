import styled from 'styled-components';

export const RepoInputContainer = styled.div`
  margin: 10px;
  background-color: #cbdff3;
  padding: 15px;
  font-size: 14px;
  border: 1px solid #bbb;
`

export const SearchContainer = styled.form`
  display: flex;
  margin-bottom: 5px;
`

export const Input = styled.input`
  width: 40%;
  transition: all 0.4s ease 0s;

  :focus {
    width: 60%;
    outline: none;
  }
`
export const Submit = styled.button`
  width: 20%;
  border: none;
  background-color: #3498db
  color: #eee

  :hover {
    background-color: #2980b9
    font-color: #fff
  }

  :focus {
    outline: 0;
  }
`

export const Title = styled.p`
  font-size: 16px;
  color: #0466d6;
  margin: 0px;
`