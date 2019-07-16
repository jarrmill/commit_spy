import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import { data } from './sample_data.js';
ReactDOM.render(<App sampleData={data}/>, document.getElementById('app'));