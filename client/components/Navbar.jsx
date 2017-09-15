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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navbar)
