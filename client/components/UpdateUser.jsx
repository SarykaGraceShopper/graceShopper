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
    this.handleSubmit = this.handleSubmit.bind(this)
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

 handleSubmit (event) {
    event.preventDefault()
    const id = this.props.user.id
    const newUserInfo = {}
    this.state.name.length ? newUserInfo.name = this.state.name : newUserInfo.name = this.props.user.name
    this.state.email.length ? newUserInfo.email = this.state.email : newUserInfo.email = this.props.user.email
    this.state.image.length ? newUserInfo.image = this.state.image : newUserInfo.image = this.props.user.image
    this.state.shippingAddress.length ? newUserInfo.shippingAddress = this.state.shippingAddress : newUserInfo.shippingAddress = this.props.user.shippingAddress
    store.dispatch(updateAUser(newUserInfo, id))
  }



  render() {
    const {id, name, email, password, image, shippingAddress}=this.props.user
    return (
     <div className="row">
      <div className="col-sm-12 col-md-6 col-lg-6" style={{marginTop: '100px'}}>
        <h3> Your Profile Info </h3>
        <form onSubmit={this.handleSubmit} name={name}>
          <div className="form-group">
            <label htmlFor='Name'><small>Name</small></label>
            <input name='name' type='text' placeholder={name} onChange={this.handleName} value={this.state.name} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor='email'><small>Email</small></label>
            <input name='email' type='text' placeholder={email} onChange={this.handleEmail} value={this.state.email} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor='image'><small>Image (enter a url!)</small></label>
            <input name='image' type='text' placeholder={image} onChange={this.handleImage} value={this.state.image} className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor='shippingAddress'><small>Shipping Address</small></label>
            <input name='shippingAddress' type='text' placeholder={shippingAddress} onChange={this.handleShipping} value={this.state.shippingAddress} className="form-control"/>
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


export default withRouter(connect(mapStateToProps)(UpdateUser));
