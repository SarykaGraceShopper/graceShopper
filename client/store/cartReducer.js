import axios from 'axios'
import history from '../history'

//this reducer keeps track of all dragons in user's current cart

//action types
const INITIALIZE = 'INITIALIZE_CART'
const CREATE = 'CREATE_CART_DRAGON'
const UPDATE = 'UPDATE_CART_DRAGON'
const DELETE = 'DELETE_CART_DRAGON'
const ADD = 'ADD_NEW_CART_DRAGON'
const CLEAR = 'CLEAR_CART_OF_DRAGONS'

//action
const init = dragons => ({type: INITIALIZE, dragons})
const createCart = newCart => ({type: CREATE})
const update = dragon => ({type: UPDATE, dragon})
const remove = dragon => ({type: DELETE, dragon})
const addDragon = dragon => ({type: ADD, dragon })
export const clearCart = cart => ({type: CLEAR})

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

    case CLEAR:
      return []

    case ADD:
      return [...cart, action.dragon]

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
    .then( res =>
      res.data ?
      res.data
      :
      (axios.post(`/api/orders`, {cartId: userId})
      .then(res => res.data ))
      )
      .then( res =>
      res.data ?
      dispatch(init(res.data.dragons))
      :
      dispatch(createCart())
      )
    .catch(err => console.error('Fetching cart orders unsuccessful', err));
}

export const addCartDragon = (dragonId, userId) => dispatch => {
  return axios.get(`/api/users/${userId}/cart`)
  .then(res => {
    res.data ?
    res.data.id
    :
    (axios.post(`/api/orders`, {cartId: userId})
    .then(res => res.data.id ))
    .then(orderId => axios.put(`/api/orders/${orderId}/addDragon`, {dragonId: dragonId}))
  .then(res => {
    const dragonId = res.data.id
    return axios.get(`/api/dragons/${dragonId}`) }
  )
  .then(res=> {
    dispatch(addDragon(res.data))
    history.push(`/cart/${userId}`)
  })
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
