
import React, { PropTypes } from 'react'
import classes from './BigNumberCircle.scss'

export default class BigNumberCircle extends React.Component {

  static propTypes = {
    number: PropTypes.string.isRequired
  };

  constructor () {
    super()
    this.state = {
      'checked': true
    }
  }

  handleClick () {
    this.setState({
      'checked': !this.state.checked
    })
  }

  render () {
    // Change style of circle on check
    const styleCircle = this.state.checked ? classes.numberCircle : classes.numberCircleChecked
    return (
      <div className={styleCircle} onClick={::this.handleClick}>
        {this.props.number}
      </div>
    )
  }
}
