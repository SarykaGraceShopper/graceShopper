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
      {console.log('HIII')}
  return (
    <div>

      {
        props.dragons.length
          && props.dragons.filter(dragon => {
            return (dragon.id == props.match.params.dragonId)
          }).map(dragon => {
            return (
              <div key={dragon.id}>{dragon.name}<br />
                <img className="dragonName" src={dragon.image} />
                <button onClick={() => handleAddToCart()} type="addDragonToCart" className="btn btn-default">
                  Add Dragon to Cart
                  </button>
              </div>
            )
          })
      }
    </div>
  );
}

const mapStateToProps = (state) => ({dragons: state.dragons})

const mapDispatchToProps = function (dispatch, ownProps) {
    const studentId = ownProps.match.params.studentId;
    return {
        handleAddToCart(evt) {
            evt.preventDefault();
            const name = evt.target.dragonName.value;
            //todo rest of attributes
            const addCartOrderDispatch = createCartOrder({
               name: name
              },
                ownProps.history)
            dispatch(addCartOrderDispatch)
                .then((res) => {
                })
                .catch(err => {
                    dispatch(writeEmailError(true))
                })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleDragon);
