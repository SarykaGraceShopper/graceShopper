import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';
import { logout } from '../store';
import { Link, NavLink } from 'react-router-dom';
import MenuItem from './MenuItem.jsx';

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
            <MenuItem menuPath="/" menuName="HOME" />
            <MenuItem menuPath="/missionStatement" menuName="MISSION" />
            <MenuItem menuPath="/dragons" menuName="DRAGONS" />
            { props.isLoggedIn
                && <MenuItem menuPath="/profile" menuName="profile" />
            }
            { props.isLoggedIn
                ? <MenuItem menuPath={`/cart/${props.user.id}`} menuName="cart" />
                : <MenuItem menuPath="/signup" menuName="sign up" />
            }
            <MenuItem
              menuPath="/login"
              menuName=
                { props.isLoggedIn
                  ? 'logout'
                  : 'login'
                }
              />
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
