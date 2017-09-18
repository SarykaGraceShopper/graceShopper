import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'
import store from '../store'

function SingleDragon(props) {

  const dragon = props.dragons.length
  && props.dragons.filter(dragon => {
    return (dragon.id == props.match.params.dragonId)
  })[0];

  function handleClick(event) {
    event.preventDefault();
    history.goBack();
  }

  return (
    <div className="adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag">
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <button className="btn btn-default more-padding" onClick={handleClick}>
            <span className="glyphicon glyphicon-chevron-left" />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-6 col-lg-6">
          <div className="dragon-image" style={{backgroundImage: `url(${dragon.image})`}}>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6">
          Name: {dragon.name}<br />
          Color: {dragon.color}<br />
          Breed: {dragon.breed}<br />
          Badness: {dragon.badness}<br />
          Powers: {(dragon.powers)
                    ? dragon.powers.map((power, index) => (
                      <span key={power.id}>{power.name}{(index !== dragon.powers.length - 1) && <span>, </span>}</span>
                      ))
                    : <span>none</span>
                  }<br />
          only ${dragon.price / 100}!
          </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({dragons: state.dragons})

export default connect(mapStateToProps)(SingleDragon);
