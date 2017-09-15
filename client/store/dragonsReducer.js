import axios from 'axios'
import history from '../history'

//action types
const INITIALIZE = 'INITIALIZE_DRAGONS'
const CREATE = 'CREATE_DRAGON'
const UPDATE = 'UPDATE_DRAGON'
const DELETE = 'DELETE_DRAGON'

//action
const init = dragons => ({type: INITIALIZE, dragons})
const createADragon = dragon => ({type: CREATE, dragon})
const updateADragon = dragon => ({type: UPDATE, dragon})
const deleteADragon = dragon => ({type: DELETE, dragon})



//reducers
export default function reducer (dragons = [], action) {
  switch(action.type) {

    case INITIALIZE:
      return action.dragons;

    case CREATE:
      return [...dragons, action.dragons];

    case UPDATE:
      const filtered = dragons.filter(dragon => dragon.id !== action.dragon.id)
      return [...filtered, action.dragon]

    case DELETE:
      return dragons.filter(dragon => dragon.id !== action.dragon.id)

    default:
      return dragons
  }
}


//thunk creators

export const fetchDragons = () => dispatch => {
  return axios.get('/api/dragons')
    .then(res => {
      dispatch(init(res.data))
    })
    .catch(err => console.error('Fetching dragons unsuccessful', err));
}

export const createDragon = (info) => dispatch => {
  axios.post('/api/dragons', info)
    .then(res => res.data)
    .then(newDragon => {
      const action = createADragon(newDragon)
      dispatch(action);
    })
}

export const updateDragon = (info, dragonId) => dispatch => {
  axios.put(`/api/dragons/${dragonId}`, info)
    .then(res => res.data)
    .then(updatedInfo => {
      const updateAction = updateADragon(updatedInfo)
      dispatch(updateAction)

    })
}

export const deleteDragon = (dragonId) => dispatch => {
  axios.delete(`/api/dragons/${dragonId}`)
  .then(res => (res.data))
  .then(dragon => {
    const deleteAction = deleteADragon(dragon)
    dispatch(deleteAction)
  })
}
