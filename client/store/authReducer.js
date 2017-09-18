import axios from 'axios'
import history from '../history'

//action types
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

//action creators
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

//reducers
export default function reducer (user={}, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return user={}
    default:
      return user
  }
}

// you can just return an empty object on line 18, you don't need to set the user to it --FF

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

// you're setting the user to be the object of an error, here it's ok but if you got an error after the user is logged in, there could be issues --OB

export const logout = () =>
  dispatch =>
    axios.post('api/auth/me/logout')
      .then(res => {
        dispatch(removeUser())
        history.push('/login')
      })
      .catch(err => console.log(err))

// console.error is better for logging errors than console.log --FF
// check out react-toastr for error handling! --OB
