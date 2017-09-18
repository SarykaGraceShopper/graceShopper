import React from 'react';
import {connect} from 'react-redux';
import { auth } from '../store';
import {withRouter} from 'react-router';

const AuthForm = (props) => {

  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6">
        <form onSubmit={handleSubmit} name={name}>
          <div className="form-group">
            <label htmlFor="email"><small>Email</small></label>
            <input name="email" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password"><small>Password</small></label>
            <input name="password" type="password" className="form-control" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-default">{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href="api/auth/google">{displayName} with Google</a>
      </div>
    </div>
  )
}

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));
