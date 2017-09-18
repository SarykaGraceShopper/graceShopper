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

  // .find method would return the first thing it finds that matches the criterion, would work well here --OB

  function handleClick(event) {
    event.preventDefault();
    history.goBack();
  }

  // handleClick could be defined outside the class so that the function isn't defined every time the page loads --OB
  // could also turn the component into a class --OB

  return (
    <div className="adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag">
    {/* use a better class name! --OB */}
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

// you could use a join with strings where we have all these spans on line 46 --OB
// you could put the functionality on lines 7-12 in the mapState --OB

const mapStateToProps = (state) => ({dragons: state.dragons})

export default connect(mapStateToProps)(SingleDragon);
