import React from 'react';
import { connect } from 'react-redux';
// import { postMessage, writeMessage } from '../store';
import {  Link } from 'react-router-dom';

function SingleUser(props) {

  const { user, dragons } = props;
  const userName = user && user.name;
  const userEmail = user && user.email;
  const userDragonId = user && user.dragonId;
  const dragon = dragons.find(dragon => {
    return dragon.id == userDragonId
  })
  return (
    <div>
      <h1>{userName}</h1>
      <h3>{userEmail}</h3>
      <Link to={`/dragons/${dragon && dragon.id}`}>
      {dragon && dragon.name}
      </Link>
    </div>
  );
}

const mapStateToProps = function (state, ownProps) {
  const userId = ownProps.match.params.userId;
  return {
    user: state.users.find(user => {
      return user.id == userId
    }),
    dragons: state.dragons
  };
};

export default connect(mapStateToProps)(SingleUser);
