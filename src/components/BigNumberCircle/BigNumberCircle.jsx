
import React, { PropTypes } from 'react'
import classes from './BigNumberCircle.scss'

export default class BigNumberCircle extends React.Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    drawnNumbers: PropTypes.string,
    selectNumber: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'checked': true
    }
  }

  handleClick () {
    if (!this.state.checked && !(this.props.drawnNumbers !== undefined)) {
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
    const circleStyle = this.state.checked ? classes.numberCircle: classes.numberCircleChecked
    let mouseArrowStyle
    if ((this.props.disabled && !this.state.checked) || (!this.props.disabled && !this.state.checked)) {
      mouseArrowStyle = classes.numberCirclePointer
    } else if (!this.props.disabled) {
      mouseArrowStyle = classes.numberCirclePointer
    } else {
      mouseArrowStyle = classes.numberCircleDisabled
    }
    if (this.props.disabled && this.props.drawnNumbers !== undefined) {
      mouseArrowStyle = classes.numberCircleDisabled
    }
    let style = `${circleStyle} ${mouseArrowStyle}`
    if (this.props.drawnNumbers !== undefined) {
      const numbersMatched = this.props.drawnNumbers.split(',')
      numbersMatched.forEach((item) => {
        if (Number(item) === this.props.number && !this.state.checked) {
          style +=` ${classes.numberCircleMathed}`
        } else if (Number(item) === this.props.number) {
          style +=` ${classes.numberCircleDrawn}`
        }
      })
    }
    return (
      <div className={style} onClick={::this.handleClick}>
        {this.props.number}
      </div>
    )
  }
}
