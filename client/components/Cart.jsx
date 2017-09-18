import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function Cart(props) {
  const { cart } = props;
  return (
    <div>
      <h3>Dragons</h3>
      {/* TODO: check out button */}
      {/* <span className="input-group-btn">
        <Link to={`/new-dragon`}>
          <button className="btn btn-default" type="submit">Create New Campus</button>
        </Link>
      </span> */}
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
    cart: state.orders && state.orders.find(order => {
      return order.cartId == userId
    })
  };
};

// const mapDispatchToProps = function (dispatch, ownProps) {
//   return {
//     handleDelete(campusId) {
//       dispatch(removeCampus(campusId, ownProps.history))
//     }
//   }
// }

export default connect(mapStateToProps)(Cart);