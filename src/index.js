import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from './components/App';
import reportWebVitals from './test/reportWebVitals';
import './index.css';

const history = createBrowserHistory();

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router history={history}>
    <Routes>
      <Route exact path="/" element={<App />}></Route>
    </Routes>
  </Router>
);


/*
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
