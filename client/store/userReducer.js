import axios from 'axios'
import history from '../history'

//action types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

//action creators
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, user})

//reducers
export default function reducer (user={}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return user={}
    case UPDATE_USER:
      return action.user
    default:
      return user
  }
}

//thunk creators

export const fetchUser = () => dispatch => {
  return axios.get('/api/users/currentUser')
    .then(res => {
      dispatch(getUser(res.data))
    })
    .catch(err=>console.log(err))
}

export const auth = (email, password, method) =>
  dispatch =>
    axios.post(`/api/auth/me/${method}`, { email, password })
      .then(res => {
        dispatch(getUser(res.data))
        history.push('/')
      })
      .catch(error =>
        dispatch(getUser({error})))

export const updateAUser = (info, userId) => dispatch => {
  axios.put(`api/users/${userId}`, info)
    .then(res => res.data)
    .then(updatedInfo => {
      const updateAction = updateUser(updatedInfo)
      dispatch(updateAction)
    })
}

export const logout = () =>
  dispatch =>
    axios.post('api/auth/me/logout')
      .then(res => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))