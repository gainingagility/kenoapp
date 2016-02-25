
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
    // Change style of circle on check
    const styleCircle = this.state.checked ? classes.numberCircle : classes.numberCircleChecked
    return (
      <div className={styleCircle} onClick={::this.handleClick}>
        {this.props.number}
      </div>
    )
  }
}
