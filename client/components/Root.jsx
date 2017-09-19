import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import store from '../store';
import { fetchDragons } from '../store/dragonsReducer';
import { fetchUser } from '../store/userReducer';
import {Login, Signup} from './AuthForm.jsx';
import { fetchOrders } from '../store/ordersReducer'
import { fetchCartOrders } from '../store/cartReducer'

import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import AllDragons from './AllDragons.jsx';
import SingleDragon from './SingleDragon.jsx';
import SingleUser from './SingleUser.jsx';
import Cart from './Cart.jsx'
import UpdateUser from './UpdateUser.jsx'
import MissionStatement from './MissionStatement.jsx'

class Root extends Component {

  componentDidMount() {
    this.props.fetchInitialData()
  }

  render() {
    return (

      <div className="container">
         <Navbar/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/dragons" component={AllDragons} />
            <Route exact path="/dragons/:dragonId" component={SingleDragon} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/user/:userId" component={SingleUser} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/profile" component={UpdateUser} />
            <Route exact path="/MissionStatement" component={MissionStatement} />

            <Redirect to="/" />
          </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
}) ;

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchInitialData: () => {
    dispatch(fetchDragons());
    dispatch(fetchOrders());
    dispatch(fetchUser())
      .then(res => {
        if (res.data.id) dispatch(fetchCartOrders(res.data.id))
      });
}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
