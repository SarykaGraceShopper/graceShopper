import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'
import store from '../store'
import { addCartDragon } from '../store/cartReducer'

function SingleDragon(props) {

  const { handleAddToCart } = props;
  
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
    const dragonId = ownProps.match.params.dragonId;
    return {
        handleAddToCart(evt) {
            // evt.preventDefault();
            //todo rest of attributes
            const addCartOrderDispatch = addCartDragon(dragonId)
            dispatch(addCartOrderDispatch)
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleDragon);
