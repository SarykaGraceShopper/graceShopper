import axios from 'axios'
import history from '../history'

//this reducer keeps track of all orders in user's current cart

//action types
const INITIALIZE = 'INITIALIZE_CART'
const CREATE = 'CREATE_CART_ORDER'
const UPDATE = 'UPDATE_CART_ORDER'
const DELETE = 'DELETE_CART_ORDER'

//action
const init = orders => ({type: INITIALIZE, orders})
const createAOrder = order => ({type: CREATE, order})
const updateAOrder = order => ({type: UPDATE, order})
const deleteAOrder = order => ({type: DELETE, order})

//reducers
export default function reducer (orders = [], action) {
  switch(action.type) {

    case INITIALIZE:
      return action.orders;

    case CREATE:
      return [...orders, action.orders];

    case UPDATE:
      const filtered = orders.filter(order => order.id !== action.order.id)
      return [...filtered, action.order]

    case DELETE:
      return orders.filter(order => order.id !== action.order.id)

    default:
      return orders
  }
}


//thunk creators

export const fetchCartOrders = () => dispatch => {
  return axios.get('/api/orders')
    .then(res => {
      dispatch(init(res.data))
    })
    .catch(err => console.error('Fetching orders unsuccessful', err));
}

export const createOrder = (info) => dispatch => {
  axios.post('/api/orders', info)
    .then(res => res.data)
    .then(newOrder => {
      const action = createAOrder(newOrder)
      dispatch(action);
    })
}

export const updateOrder = (info, orderId) => dispatch => {
  axios.put(`/api/orders/${orderId}`, info)
    .then(res => res.data)
    .then(updatedInfo => {
      const updateAction = updateAOrder(updatedInfo)
      dispatch(updateAction)

    })
}

export const deleteOrder = (orderId) => dispatch => {
  axios.delete(`/api/orders/${orderId}`)
  .then(res => (res.data))
  .then(order => {
    const deleteAction = deleteAOrder(order)
    dispatch(deleteAction)
  })
}
