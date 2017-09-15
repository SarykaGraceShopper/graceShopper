import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'
import store from '../store'

function SingleDragon(props) {
  // function handleClick(event) {
  //   event.preventDefault();
  //   history.goBack();
  // }
  return (
    <div>
      {
        props.dragons.length
          && props.dragons.filter(dragon => {
            return (dragon.id == props.match.params.dragonId)
          }).map(dragon => {
            return (
              <div key={dragon.id}>{dragon.name}<br />
                <img className="dragon" src={dragon.image} />
              </div>
            )
          })
      }
    </div>
  );
}

const mapStateToProps = (state) => ({dragons: state.dragons})

export default connect(mapStateToProps)(SingleDragon);
