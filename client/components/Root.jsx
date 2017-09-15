import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import store, { fetchDragons } from '../store';

import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import AllDragons from './AllDragons.jsx';
import SingleDragon from './SingleDragon.jsx';


export default class Root extends Component {

  componentDidMount () {
    store.dispatch(fetchDragons());
  }

  render() {
    return (
      <div>
        <Route path="/" component={Navbar} />
        <Route path="/:active" component={Navbar} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dragons" component={AllDragons} />
            <Route path="/dragon/:dragonId" component={SingleDragon} />
            <Redirect to="/" />
          </Switch>
      </div>
    );
  }
}
