import React from 'react';
import HeaderNav from './containers/headerNav/HeaderNav';
//import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './containers/home/Home';
import About from './containers/about/About';

function App() {
  return (
    <BrowserRouter>
      <HeaderNav />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/About' component={About} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
