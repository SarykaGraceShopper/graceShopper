import axios from 'axios'
import history from '../history'

//action types
const LOGIN = 'LOGIN_USER'
const LOGOUT = 'LOGOUT_USER'

//action creators
const login = {type: LOGIN}
const logout = {type: LOGOUT}

//reducers
export default function reducer (isLoggedIn=false, action) {
  switch(action.type) {

    case LOGIN:
      return isLoggedIn=true

    case LOGOUT:
      return isLoggedIn=false

    default:
      return isLoggedIn
  }
}

//thunk creators
