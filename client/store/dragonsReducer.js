import axios from 'axios'
import history from '../components/history'

//action types
const INITIALIZE = 'INITIALIZE_DRAGONS'

//action
const init = dragons => ({type: INITIALIZE, dragons})

//reducers
export default function reducer (dragons = [], action) {
  switch(action.type) {

    case INITIALIZE:
      return action.dragons;

    default:
      return dragons
  }
}


//thunk creators

export const fetchDragons = () => dispatch => {
  axios.get('/api/dragons')
    .then(res => {
      dispatch(init(res.data))
    })
    .catch(err => console.error('Fetching dragons unsuccessful', err));
}
