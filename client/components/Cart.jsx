import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {withRouter} from 'react-router'

function Cart(props) {
  const { cart } = props;
  return (

    <div>
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h3>Dragons in Your Cart :)</h3>
          <Link to="/checkout">
            <div style={{display: 'inline'}} className="btn btn-primary">
              Checkout
            </div>
          </Link>
          <br />&nbsp;
        </div>
      </div>
      <div className="row">
        {
          cart && cart.map(dragon => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={dragon.id}>
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

// const mapDispatchToProps = function (dispatch, ownProps) {
//   return {
//     handleDelete(campusId) {
//       dispatch(removeCampus(campusId, ownProps.history))
//     }
//   }
// }

export default withRouter(connect(mapStateToProps)(Cart));
