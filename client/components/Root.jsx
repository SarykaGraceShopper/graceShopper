import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import store from '../store';
import { fetchDragons } from '../store/dragonsReducer'

import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import AllDragons from './AllDragons.jsx';
import SingleDragon from './SingleDragon.jsx';


class Root extends Component {

  componentDidMount () {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div className="container">
         <Navbar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dragons" component={AllDragons} />
            <Route exact path="/dragons/:dragonId" component={SingleDragon} />
            <Redirect to="/" />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchDragons());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
