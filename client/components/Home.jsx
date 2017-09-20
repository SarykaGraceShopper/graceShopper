import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'

function Home(props) {

  return (
    <div className="row">
      <div className="jumbotron">
        <p><span className="h2">Hey there
        {
          (props.name)
            ? ', ' + props.name
            : props.email && ', ' + props.email
        }!!</span></p>
        <p>Wanna buy some dragons??? You are in the right place!!!</p>
        <p>Undecided? Read more about us <Link to="/missionStatement">here</Link>!</p>

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

export default connect(mapStateToProps)(Home);
