import axios from 'axios'
import history from '../history'

//this reducer keeps track of all dragons in user's current cart

//action types
const INITIALIZE = 'INITIALIZE_CART'
const CREATE = 'CREATE_CART_DRAGON'
const UPDATE = 'UPDATE_CART_DRAGON'
const DELETE = 'DELETE_CART_DRAGON'

//action
const init = cart => ({type: INITIALIZE, cart})
const addCartDragon = dragon => ({type: CREATE, dragon})
const updateCartDragon = dragon => ({type: UPDATE, dragon})
const deleteCartDragon = dragon => ({type: DELETE, dragon})

//reducers
export default function reducer (cart = {}, action) {
  switch(action.type) {

    case INITIALIZE:
      return action.cart;

    case CREATE:
      return Object.assign({}, cart,
        {dragons: [...cart.dragons, action.dragon]});
      
    //todo: fix all of these
    case UPDATE:
      const filtered = orders.filter(order => order.id !== action.order.id)
      return [...filtered, action.order]

    case DELETE:
      return orders.filter(order => order.id !== action.order.id)

    default:
      return cart
  }
}


//thunk creators

export const fetchCartOrders = (userId) => dispatch => {
  return axios.get(`/api/users/${userId}/cart`)
    .then(res => {
      dispatch(init(res.data))
    })
    .catch(err => console.error('Fetching cart orders unsuccessful', err));
}

export const createCartOrder = (info) => dispatch => {
  axios.post('/api/orders', info)
    .then(res => res.data)
    .then(newOrder => {
      const action = addCartOrder(newOrder)
      dispatch(action);
    })
}

export const updateCartOrder = (info, orderId) => dispatch => {
  axios.put(`/api/orders/${orderId}`, info)
    .then(res => res.data)
    .then(updatedInfo => {
      const updateAction = updateCartOrder(updatedInfo)
      dispatch(updateAction)

    })
}

export const deleteCartOrder = (orderId) => dispatch => {
  axios.delete(`/api/orders/${orderId}`)
  .then(res => (res.data))
  .then(order => {
    const deleteAction = deleteCartOrder(order)
    dispatch(deleteAction)
  })
}
