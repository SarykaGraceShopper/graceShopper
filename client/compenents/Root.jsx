import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import store from '../store';

import Navbar from './Navbar';
import Home from './Home';
import AllDragons from './AllDragons';
import SingleDragon from './SingleDragon';


export default class Root extends Component {

  componentDidMount () {
    // store.dispatch(); // get state -- some sort of fetch
  }

  render() {
    return (
      <div>
        <Route path="/" component={Navbar} />
        <Route path="/:active" component={Navbar} /> {/*hack to highlight nav items */}
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
