import  React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';


function allDragons(props) {
  return(
    <div>
      <h1>Dragons</h1>
      {props.campuses.map(dragon => (
        <Link to={`/dragons/${dragon.id}`} key={dragon.id}>
        <h3>{dragon.name}</h3>
        <img src={dragon.image} id={dragon.id}/>
        </Link>
      ))}
    </div>
  )

}
