import { createStore, applyMiddleware } from 'redux';
import dragons from './dragonsReducer';
import user from './authReducer'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux'

// combine imports that come from 'redux' --FF

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
export * from './authReducer';
