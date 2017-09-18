import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import { logout } from '../store'
import { Link, NavLink } from 'react-router-dom';

function Navbar(props) {
  return (
    <nav id="myNavbar" className="navbar navbar-default navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbarCollapse">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/"></Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="nav navbar-nav navbar-right">
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/dragons">DRAGONS</NavLink></li>
            {
              props.isLoggedIn // Logout vs Login/Signup display
              ? <li><NavLink to="/login" onClick={props.handleClick}>logout</NavLink></li>
              : <li><NavLink to="/login">login</NavLink></li>
            } {
              !props.isLoggedIn
              && <li><NavLink to="/signup">sign up</NavLink></li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Navbar))
