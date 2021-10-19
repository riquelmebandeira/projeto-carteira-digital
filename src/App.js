import React from 'react';
import { Switch, Route } from 'react-router';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/carteira" component={ Wallet } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
