import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { logout } from '../store';
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
            <li className={
              (props.location.pathname === '/') &&
                'active'
            }><NavLink to="/">HOME</NavLink></li>
             <li className={
              (props.location.pathname === '/missionStatement') &&
                'active'
            }><NavLink to="/missionStatement">MISSION STATEMENT</NavLink></li>
            <li className={
              (props.location.pathname === '/dragons') &&
                'active'
            }><NavLink to="/dragons">DRAGONS</NavLink></li>
            {
              props.isLoggedIn
            && <li className={
              (props.location.pathname ==='/profile') &&
              'active'
            }><NavLink to="/profile">PROFILE</NavLink></li>
            }
            {
              props.isLoggedIn
            && <li className={
              (props.location.pathname ===`/cart/${props.user.id}`) &&
              'active'
            }><NavLink to={`/cart/${props.user.id}`}>your cart</NavLink></li>
            }
            {
              !props.isLoggedIn
              && <li className={
                (props.location.pathname === '/signup') &&
                  'active'
              }><NavLink to="/signup">sign up</NavLink></li>
            }
            <li className={
              (props.location.pathname === '/login') &&
                'active'
            }> {
              props.isLoggedIn
              ? <NavLink to="/login" onClick={props.handleClick}>logout</NavLink>
              : <NavLink to="/login">login</NavLink>
            } </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
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
