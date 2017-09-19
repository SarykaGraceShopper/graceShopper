import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { logout } from '../store';
import { NavLink } from 'react-router-dom';

function MenuItem(props) {
  return (
    <li className={
      (props.location.pathname === props.menuPath) &&
        'active'
    }><NavLink to={props.menuPath} onClick={() => props.handleClick(props.menuName)}>{props.menuName}</NavLink></li>
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
    handleClick (menuName) {
      if (menuName === 'logout') dispatch(logout())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(MenuItem))
