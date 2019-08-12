import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import NavBar from '../navbar';
import "@testing-library/jest-dom/extend-expect";
import regeneratorRuntime from 'regenerator-runtime'

afterEach(cleanup);

describe('Navbar component', () => {
  it('should render', () => {
    const {getByTestId} = render(<NavBar username={""} view="main" />)

    expect(getByTestId('navbar')).toHaveTextContent("Commit Spy");
  })

  it('should render with username when user is logged in', () => {
    const {getByTestId} = render(<NavBar username={"Tester"} view="main"/>)
    
    expect(getByTestId('navbar')).toHaveTextContent("Welcome, Tester");
  })

  it('should have a logout option when user is logged in', () => {
    const {getByTestId} = render(<NavBar username={"Tester"} view="main"/>)
    
    expect(getByTestId('navbar')).toHaveTextContent("Log Out");
  })

  it('should have a log in option when user is logged in', () => {
    const {getByTestId} = render(<NavBar username={""} view="main"/>)
    
    expect(getByTestId('navbar')).toHaveTextContent("Log In");
  })
})