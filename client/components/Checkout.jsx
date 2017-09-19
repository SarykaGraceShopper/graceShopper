import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'

function Checkout(props) {

  return (
    <div className="row">
      <div className="jumbotron">
        <p>Mail us a check & we'll send those dragons asap</p>
      </div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    dragons: state.dragons,
    email: state.user.email,
    name: state.user.name
  };
};

export default connect(mapStateToProps)(Checkout);
