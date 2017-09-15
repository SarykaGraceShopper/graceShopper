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
    <div>
        hey there
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    // dragons: state.dragons
  };
};

export default connect(mapStateToProps)(Home);
