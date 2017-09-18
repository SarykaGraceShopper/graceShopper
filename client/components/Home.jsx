import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'

function Home(props) {

  return (
    <div className="row">
      <div className="col-sm-12 col-md-12 col-lg-12">
    <p>Hey There, {props.email}!! Wanna buy some dragons??? You are in the right place!!!</p>
      </div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    dragons: state.dragons,
    email: state.user.email
  };
};

export default connect(mapStateToProps)(Home);
