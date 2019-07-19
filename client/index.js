import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import { data } from './sample_data.js';
console.log(data);
ReactDOM.render(<App sampleData={data}/>, document.getElementById('app'));