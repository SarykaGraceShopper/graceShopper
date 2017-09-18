import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import history from '../history'
import store from '../store'


function AllDragons(props) {
  return (
    <div className="adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h1>Dragons</h1>
        </div>
      </div>
      <div className="row">
        {props.dragons.length && props.dragons.map(dragon => (
          <div className="col-sm-6 col-md-6 col-lg-3" key={dragon.id}>
            <Link to={`/dragons/${dragon.id}`}>
              <h3>{dragon.name}</h3>
                <div className="dragon-image" style={{backgroundImage: `url(${dragon.image})`}}>
                </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({dragons: state.dragons})
export default connect(mapStateToProps)(AllDragons);
