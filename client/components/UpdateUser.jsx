import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import history from '../history'
import store from '../store'

function UpdateUser(props) {

  const {email, password, image, shippingAddress, handleSubmit} = props

  return (
    <div>
    <div style={{marginTop: '100px'}}>
      <h3> Your Profile Info </h3>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor='Name'><small>Name</small></label>
          <input name='name' type='text' />
        </div>
        <div>
          <label htmlFor='email'><small>Email</small></label>
          <input name='email' type='text' />
        </div>
        <div>
          <label htmlFor='password'><small>Password</small></label>
          <input name='password' type='password' />
        </div>
        <div>
          <label htmlFor='image'><small>Image (enter a url!)</small></label>
          <input name='image' type='text' />
        </div>
        <div>
          <label htmlFor='shippingAddress'><small>Shipping Address</small></label>
          <input name='shippingAddress' type='text' />
        </div>
        <div>
          <button type='submit'>Update</button>
        </div>
      </form>
    </div>
    </div>
  );
}

const mapStateToProps = (state) => ({user: state.user})

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(update(email, password, formName))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(UpdateUser));
