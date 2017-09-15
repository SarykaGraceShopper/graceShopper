import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import store from '../store';
import { fetchDragons } from '../store/dragonsReducer'
import { fetchUsers } from '../store/usersReducer'
import { fetchOrders } from '../store/ordersReducer'

import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import AllDragons from './AllDragons.jsx';
import SingleDragon from './SingleDragon.jsx';
import SingleUser from './SingleUser.jsx';
import Cart from './Cart.jsx'

class Root extends Component {

  componentDidMount() {
    this.props.fetchInitialData();
  }

  render() {
    return (
      <div>
        <Route exact path="/" component={Navbar} />
        <Route exact path="/:active" component={Navbar} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/dragons" component={AllDragons} />
          <Route exact path="/dragon/:dragonId" component={SingleDragon} />
          <Route exact path="/user/:userId" component={SingleUser} />
          <Route exact path="/cart/:userId" component={Cart} />
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
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
