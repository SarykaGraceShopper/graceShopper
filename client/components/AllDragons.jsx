import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import history from '../history'
import store from '../store'


function AllDragons(props) {
  console.log(props)
  return(
    <div>
      <h1>Dragons</h1>
      {props.dragons.length && props.dragons.map(dragon => (
        <Link to={`/dragons/${dragon.id}`} key={dragon.id}>
        <h3>{dragon.name}</h3>
        <img src={dragon.image} id={dragon.id} />
        </Link>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  console.log(state)
  return{dragons: state}
}

export default connect(mapStateToProps)(AllDragons);
