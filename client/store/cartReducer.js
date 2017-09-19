import axios from 'axios'
import history from '../history'

//this reducer keeps track of all dragons in user's current cart

//action types
const INITIALIZE = 'INITIALIZE_CART'
const CREATE = 'CREATE_CART_DRAGON'
const UPDATE = 'UPDATE_CART_DRAGON'
const DELETE = 'DELETE_CART_DRAGON'
const ADD = 'ADD_NEW_CART_DRAGON'

//action
const init = dragons => ({type: INITIALIZE, dragons})
const create = newCart => ({type: CREATE})
const update = dragon => ({type: UPDATE, dragon})
const remove = dragon => ({type: DELETE, dragon})
const add = dragon => ({type: ADD, dragon })

//cart id
//todo: cleanup, find better way to get id
let cartID = -1

//reducers
export default function reducer (cart = [], action) {
  switch(action.type) {

    case INITIALIZE:
      return action.dragons;

    case CREATE:
      return cart

    case ADD:
      return [...cart, action.newDragon]

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
      cartID = res.data.id;
      console.log(res)
      dispatch(init(res.data.dragons))

    })
    .catch(err => console.error('Fetching cart orders unsuccessful', err));
}

export const addCartDragon = (dragonId, userId) => dispatch => {
  return axios.put(`api/users/${userId}/cart`)
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