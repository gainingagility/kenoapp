
import React, { PropTypes } from 'react'
import classes from './BigNumberCircle.scss'

export default class BigNumberCircle extends React.Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    selectNumber: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'checked': true
    }
  }

  handleClick () {
    if (!this.state.checked) {
      this.addNumber()
    } else if (!this.props.disabled) {
      this.addNumber()
    }
  }

  addNumber () {
    this.props.selectNumber(this.props.number, this.state.checked)
    this.setState({
      'checked': !this.state.checked
    })
  }

  render () {
    let styleCircle
    if ((this.props.disabled && !this.state.checked) || (!this.props.disabled && !this.state.checked)) {
      styleCircle = classes.numberCircleCheckedPointer
    } else if (!this.props.disabled) {
      styleCircle = classes.numberCirclePointer
    } else {
      styleCircle = classes.numberCircleDisabled
    }
    return (
      <div className={styleCircle} onClick={::this.handleClick}>
        {this.props.number}
      </div>
    )
  }
}
