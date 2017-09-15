import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'

function SingleDragon(props) {

  // function handleClick(event) {
  //   event.preventDefault();
  //   history.goBack();
  // }

  console.log(props.match.params.dragonId)

  return (
    <div>
        HI
    </div>
  );
}

const mapStateToProps = function (state) {
  return {
    dragons: state.dragons
  };
};

export default connect(mapStateToProps)(SingleDragon);


// {
//   props.dragons.length
//     && props.dragons.filter(dragon => {
//       return (dragon.id == props.match.params.dragonId)
//     }).map(dragon => {
//       return (
//         <div key={dragon.id}>{dragon.name}<br />
//           <img className="dragon" src={dragon.image} />
//         </div>
//       )
//     })
// }
