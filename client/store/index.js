import { createStore, applyMiddleware } from 'redux';
import dragons from './dragonsReducer';
import user from './userReducer'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux'

const reducer = combineReducers({dragons, user})

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;

export * from './dragonsReducer';
export * from './userReducer';
