import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import ProtectedRoute from './ProtectedRoute';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute path="/user" component={UserPage} />
    </Switch>
  </Router>
);

export default App;
