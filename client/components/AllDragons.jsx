import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import history from '../history'
import store from '../store'


function AllDragons(props) {

  let filteredDragons = props.dragons;

  let dragonColors = new Set();
  let dragonBreeds = new Set();

  props.dragons && props.dragons.forEach(dragon => {
    for (var key in dragon) {
      if (key === 'color') dragonColors.add(dragon[key]);
      if (key === 'breed') dragonBreeds.add(dragon[key]);
    }
  });

  dragonColors = Array.from(dragonColors);
  dragonBreeds = Array.from(dragonBreeds);

  function filterDragons(key, value) {
    filteredDragons = props.dragons.filter(dragon => dragon[key] === value);
    //FIGURE OUT HOW TO LOAD THESE
  }

  return (
    <div className="adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h1>Dragons</h1>
            narrow your search by&nbsp;
            <select onChange={(event) => filterDragons('color', event.target.value)}>
              <option>color</option>
              {
                dragonColors.map(color => (
                  <option key={color} name={color} value={color}>{color}</option>
                ))
              }
            </select> or&nbsp;
            <select onChange={(event) => filterDragons('breed', event.target.value)}>
              <option>breed</option>
              {
                dragonBreeds.map(breed => (
                  <option key={breed} name={breed} value={breed}>{breed}</option>
                ))
              }
            </select> or&nbsp;
            <select onChange={(event) => filterDragons('badness', event.target.value)}>
              <option>badness</option>
              <option name="0-5" value="0-5">0-5</option>
              <option name="6-10" value="6-10">6-10</option>
              <option name="11" value="11">11</option>
            </select>
        </div>
      </div>
      <div className="row">
        {filteredDragons.length && filteredDragons.map(dragon => (
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

const mapStateToProps = (state) => ({dragons: state.dragons});

export default connect(mapStateToProps)(AllDragons);
