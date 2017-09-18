import axios from 'axios'
import history from '../history'

//action types
const INITIALIZE = 'INITIALIZE_USERS'
const CREATE = 'CREATE_USER'
const UPDATE = 'UPDATE_USER'
const DELETE = 'DELETE_USER'

//action
const init = users => ({type: INITIALIZE, users})
const createAUser = user => ({type: CREATE, user})
const updateAUser = user => ({type: UPDATE, user})
const deleteAUser = user => ({type: DELETE, user})



//reducers
export default function reducer (users = [], action) {
  switch(action.type) {

    case INITIALIZE:
      return action.users;

    case CREATE:
      return [...users, action.users];

    case UPDATE:
      const filtered = users.filter(user => user.id !== action.user.id)
      return [...filtered, action.user]

    case DELETE:
      return users.filter(user => user.id !== action.user.id)

    default:
      return users
  }
}


//thunk creators

export const fetchUsers = () => dispatch => {
  return axios.get('/api/users')
    .then(res => {
      dispatch(init(res.data))
    })
    .catch(err => console.error('Fetching users unsuccessful', err));
}

export const createUser = (info) => dispatch => {
  axios.post('/api/users', info)
    .then(res => res.data)
    .then(newUser => {
      const action = createAUser(newUser)
      dispatch(action);
    })
}

export const updateUser = (info, userId) => dispatch => {
  axios.put(`/api/users/${userId}`, info)
    .then(res => res.data)
    .then(updatedInfo => {
      const updateAction = updateAUser(updatedInfo)
      dispatch(updateAction)

    })
}

export const deleteUser = (userId) => dispatch => {
  axios.delete(`/api/users/${userId}`)
  .then(res => (res.data))
  .then(user => {
    const deleteAction = deleteAUser(user)
    dispatch(deleteAction)
  })
}
