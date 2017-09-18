import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'

function Home(props) {

  // function handleClick(event) {
  //   event.preventDefault();
  //   history.goBack();
  // }

  return (
    <div className="row">
      <div class="col-sm-12 col-md-12 col-lg-12">
    <p>Hey There!! Wanna buy some dragons??? You are in the right place!!!</p>
      </div>
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    // dragons: state.dragons
  };
};

export default connect(mapStateToProps)(Home);
