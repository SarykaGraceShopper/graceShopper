import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history'
import store from '../store'
import { addCartDragon } from '../store/cartReducer'

class SingleDragon extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleClick(evt) {
      evt.preventDefault();
      history.goBack();
  }

  handleAddToCart(evt) {
    const dragonId = this.props.match.params.dragonId
    console.log('single dragon comp dragon id', dragonId)
    const userId = this.props.user.id
    console.log('single drag comp user id', userId)
    const addCartOrderDispatch = addCartDragon(dragonId, userId)
    store.dispatch(addCartOrderDispatch)
  }

  render() {
    const dragon = this.props.dragons.length
    && this.props.dragons.filter(dragon => {
    return (dragon.id == this.props.match.params.dragonId)
  })[0];
    return (
      <div className="adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <button className="btn btn-default more-padding" onClick={this.handleClick}>
              <span className="glyphicon glyphicon-chevron-left" />
            </button>
          </div>
        </div>
        <div className="row dragon-row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="dragon-image" style={{backgroundImage: `url(${dragon.image})`}}>
            </div>
          </div>
          <div className="dragon-deets col-sm-12 col-md-6 col-lg-6">
            <span className="dragon-label">name:</span>
            <span className="dragon-description">&nbsp;{dragon.name}</span><br />
            <span className="dragon-label">color:</span>
            <span className="dragon-description">&nbsp;{dragon.color}</span><br />
            <span className="dragon-label">breed:</span>
            <span className="dragon-description">&nbsp;{dragon.breed}</span><br />
            <span className="dragon-label">badness:</span>
            <span className="dragon-description">&nbsp;{dragon.badness}</span><br />
            <span className="dragon-label">powers:</span>
            <span className="dragon-description">&nbsp;
              {(dragon.powers)
                ? dragon.powers.map(power => (power.name)).join(', ')
                : 'none'
              }</span><br />
            <span className="dragon-price">only ${dragon.price / 100}!</span>
            <div>
              <button onClick={this.handleAddToCart} type="addDragonToCart" className="btn btn-primary">
              Add Dragon to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dragons: state.dragons,
  user: state.user
})


export default connect(mapStateToProps)(SingleDragon);
