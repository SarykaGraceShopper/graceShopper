import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import history from '../history'
import store from '../store'
import { updateAUser } from '../store/userReducer';

class  UpdateUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      image: '',
      shippingAddress: ''
    }
    this.handleName = this.handleName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleImage = this.handleImage.bind(this)
    this.handleShipping = this.handleShipping.bind(this)
  }


  handleName(event) {
    this.setState({name: event.target.value});
  }

  handleEmail(event) {
    this.setState({email: event.target.value});
  }

  handleImage(event) {
    this.setState({image: event.target.value});
  }

  handleShipping(event) {
    this.setState({shippingAddress: event.target.value});
  }




  render() {
    const {id, name, email, password, image, shippingAddress}=this.props.user
    return (
     <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6" style={{marginTop: '100px'}}>
        <h3> Your Profile Info </h3>
        <form onSubmit={this.props.handleSubmit} name={name}>
          <div className="form-group">
            <label htmlFor='Name'><small>Name</small></label>
            <input name='name' type='text' placeholder={name} onChange={this.handleName} value={this.state.name.length ? this.state.name : this.props.name} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor='email'><small>Email</small></label>
            <input name='email' type='text' placeholder={email} onChange={this.handleEmail} value={this.state.email.length ? this.state.email : this.props.email} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor='image'><small>Image (enter a url!)</small></label>
            <input name='image' type='text' placeholder={image} onChange={this.handleImage} value={this.state.image.length ? this.state.image : this.props.image} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor='shippingAddress'><small>Shipping Address</small></label>
            <input name='shippingAddress' type='text' placeholder={shippingAddress} onChange={this.handleShipping} value={this.state.shippingAddress.length ? this.state.shippingAddress : this.props.shippingAddress} className="form-control"/>
          </div>
          <div>
            <button className="btn btn-default" type='submit' name='submit' value={id}>Update</button>
          </div>
        </form>
      </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user
})

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleSubmit (event) {
      event.preventDefault()
      const id = +event.target.submit.value
      const newUserInfo = {}
      if (event.target.name.value.length) {
        newUserInfo.name = event.target.name.value
      }
      if (event.target.email.value.length) {
        newUserInfo.email = event.target.email.value
      }
      if (event.target.image.value.length) {
        newUserInfo.image = event.target.image.value
      }
      if (event.target.shippingAddress.value.length) {
        newUserInfo.shippingAddress = event.target.shippingAddress.value
      }

      dispatch(updateAUser(newUserInfo, id))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatch)(UpdateUser));
