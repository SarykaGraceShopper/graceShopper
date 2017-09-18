import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import store from '../store';
import { fetchDragons } from '../store/dragonsReducer';
import { fetchUser } from '../store/authReducer';
import {Login, Signup} from './AuthForm.jsx';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import AllDragons from './AllDragons.jsx';
import SingleDragon from './SingleDragon.jsx';

// Unused dependency --OB


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
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Redirect to="/" />
          </Switch>
      </div>
    );
  }
}

// 'exact' isn't necessary if there are no competing paths --FF
// Inconsistent indentation --OB

const mapStateToProps = null;

// mapStateToProps doesn't need to be defined as null, just don't include it in the connect or pass it in as null (thinks the first is mapState and second is mapDispatch) --FF

const mapDispatchToProps = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchDragons());
    dispatch(fetchUser());
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
