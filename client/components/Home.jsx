import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'

function Home(props) {

  return (
      <h2 style={{marginTop: '200px'}}> Welcome {props.email}! </h2>
  );
}

const mapStateToProps = function (state) {
  return {
    dragons: state.dragons,
    email: state.user.email
  };
};

export default connect(mapStateToProps)(Home);
