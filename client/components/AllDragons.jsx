import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {withRouter} from 'react-router'
import history from '../history'
import store from '../store'

class AllDragons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredDragons: [],
      selectedKey: '',
      selectedValue: ''
    }
    this.makeSets = this.makeSets.bind(this);
    this.filterDragons = this.filterDragons.bind(this);
    this.displayDragons = this.displayDragons.bind(this);
  }

  makeSets(whichKey) {
    let dragonSets = new Set();
    this.props.dragons.length && this.props.dragons.forEach(dragon => {
      for (var key in dragon) {
        if (key === whichKey) dragonSets.add(dragon[key]);
      }
    });
    return Array.from(dragonSets).sort();
  }

  filterDragons(key, value) {
    this.setState({
      filteredDragons: this.props.dragons.filter(dragon => dragon[key] === value),
      selectedKey: key,
      selectedValue: value.toString()
    });
  }

  displayDragons() {
    return (this.state.filteredDragons.length)
      ? this.state.filteredDragons
      : this.props.dragons;
  }

  render() {
    return (
      <div className="adjacent-jsx-elements-must-be-wrapped-in-an-enclosing-tag">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h1>Dragons</h1>
              narrow your search by&nbsp;
              <select
                onChange=
                  {
                    (event) => this.filterDragons('color', event.target.value)
                  }
                value=
                  {
                    (this.state.selectedKey === 'color')
                      ? this.state.selectedValue
                      : 'color'
                  }
                >
                <option value="color">color</option>
                {
                  this.makeSets('color').map((color, index) => (
                    <option key={index} name={color} value={color}>{color}</option>
                  ))
                }
              </select> or&nbsp;
              <select
                onChange=
                  {
                    (event) => this.filterDragons('breed', event.target.value)
                  }
                value=
                  {
                    (this.state.selectedKey === 'breed')
                      ? this.state.selectedValue
                      : 'breed'
                  }
                >
                <option value="breed">breed</option>
                {
                  this.makeSets('breed').map((breed, index) => (
                    <option key={index} name={breed} value={breed}>{breed}</option>
                  ))
                }
              </select> or&nbsp;
              <select
                onChange=
                  {
                    (event) => this.filterDragons('badness', event.target.value)
                  }
                value=
                  {
                    (this.state.selectedKey === 'badness')
                      ? this.state.selectedValue
                      : 'badness'
                  }
                >
                <option value="badness">badness</option>
                {
                  this.makeSets('badness').map((badness, index) => (
                    <option key={index} name={badness} value={badness}>{badness}</option>
                  ))
                }
              </select>
          </div>
        </div>
        <div className="row">
          {
            this.props.dragons && this.displayDragons().map(dragon => (
            <div className="col-sm-6 col-md-6 col-lg-3" key={dragon.id}>
              <Link to={`/dragons/${dragon.id}`}>
                <h3>{dragon.name}</h3>
                  <div className="dragon-image" style={{backgroundImage: `url(${dragon.image})`}}>
                  </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  dragons: state.dragons
});

export default connect(mapStateToProps)(AllDragons);
