import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router'
import { checkoutCartOrder } from '../store/cartReducer'

function Cart(props) {
  const { cart, handleCheckout } = props;
  return (

    <div>
      <h3>Dragons in Your Cart :)</h3>
      <button onClick={ () => handleCheckout(cart)} type="checkout" className="btn btn-default">
        Checkout
        </button>
      <div className="row">
        {
          cart && cart.map(dragon => (
            <div className="col-xs-4" key={dragon.id}>
              <Link className="thumbnail" to={`/dragons/${dragon.id}`}>
                <img src={dragon.image} />
                <div className="caption">
                  <h5>
                    <span>{dragon.name}</span>
                  </h5>
                </div>
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  )
}

const mapStateToProps = function (state, ownProps) {
  const userId = ownProps.match.params.userId;
  return {
    user: state.users.find(user => {
      return user.id == userId
    }),
    cart: state.cart
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  const userId = ownProps.match.params.userId;
  return {
    handleCheckout(cart) {
      dispatch(checkoutCartOrder(cart.id, cart, userId, ownProps.history))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
