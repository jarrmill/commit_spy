import styled from 'styled-components';

export const RepoInputContainer = styled.div`
  margin: 5px;
  margin-top: 0px;
  background-color: #cbdff3;
  padding: 10px;
  font-size: 18px;
`

export const SearchContainer = styled.form`
  display: flex;
  background-color: #fed
  margin-bottom: 5px;
`

export const Input = styled.input`
  flex: 8
`
export const Submit = styled.button`
  flex: 1;
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