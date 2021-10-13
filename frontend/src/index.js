import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import CustomRouter from './Router/Routes';
import { SWRConfig } from 'swr';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SWRConfig value={{
        refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}>
        <CustomRouter />
      </SWRConfig>
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
