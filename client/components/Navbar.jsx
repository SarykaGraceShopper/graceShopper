import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
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
          <Link className="navbar-brand" to="/">DISCOUNT DRAGONS</Link>
        </div>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="nav navbar-nav navbar-right">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/dragons">Dragons</NavLink></li>
            {
            props.isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <NavLink to='/home'>Home</NavLink>
              <a href='#' onClick={handleClick}>Logout</a>
            </div>
            : <div>
              {/* The navbar will show these links before you log in */}
              <li><NavLink to='/login'>Login</NavLink></li>
              <li><NavLink to='/signup'>Sign Up</NavLink></li>
            </div>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: state.isLoggedIn
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
