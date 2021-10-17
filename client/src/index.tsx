import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Landing from './components/Landing';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import RequireAuth from './components/auth/RequireAuth';
import Dashboard from './components/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/dashboard" component={RequireAuth(Dashboard)} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
