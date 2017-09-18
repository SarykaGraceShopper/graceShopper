import { createStore, applyMiddleware } from 'redux';
import dragons from './dragonsReducer';
import user from './userReducer'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { combineReducers } from 'redux'

import user from './authReducer'
import dragons from './dragonsReducer';
import users from './usersReducer';
import orders from './ordersReducer';
import cart from './cartReducer';

const reducer = combineReducers({dragons, user, users, orders, cart})

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;

export * from './dragonsReducer';
export * from './usersReducer';
export * from './ordersReducer';
export * from './cartReducer';
export * from './authReducer';
