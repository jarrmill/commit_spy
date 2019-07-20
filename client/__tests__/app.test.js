import React from 'react'
import { render, cleanup, waitForElement } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter';
import App from '../app';
import axios from 'axios';
import regeneratorRuntime from 'regenerator-runtime'
import {data} from '../sample_data';

afterEach(cleanup);

const mock = new MockAdapter(axios);

describe('Main app component', () => {
  it('should render', () => {
    const {getByTestId} = render(<App sampleData={data}/>)
    
    mock.onGet('/user/repos').reply(200, {
      data: {data}
    })
    
    expect(getByTestId('app')).toBeTruthy();
  })
})