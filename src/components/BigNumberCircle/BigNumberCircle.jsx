
import React, { PropTypes } from 'react'

export default class BigNumberCircle extends React.Component {

  static propTypes = {
    number: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired,
    checked: PropTypes.bool.isRequired,
    drawnNumbers: PropTypes.string,
    selectNumber: PropTypes.func.isRequired,
    gameType: PropTypes.string,
    bgImage: PropTypes.string
  };

  constructor () {
    super()
    this.state = {
      'checked': true
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.state.checked !== !nextProps.checked) {
      this.setState({
        checked: !nextProps.checked
      })
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
    const circleStyle = this.state.checked ? 'number-circle-normal' : 'number-circle-checked'
    let mouseArrowStyle
    let imgDir = this.state.checked ? 'normal/' : 'select/'
    if ((this.props.disabled && !this.state.checked) || (!this.props.disabled && !this.state.checked)) {
      mouseArrowStyle = ' number-circle-pointer'
    } else if (!this.props.disabled) {
      mouseArrowStyle = ' number-circle-pointer'
    } else {
      mouseArrowStyle = ' number-circle-disabled'
    }
    if (this.props.disabled && this.props.drawnNumbers !== undefined) {
      mouseArrowStyle = ' number-circle-disabled'
    }
    let style = 'number-circle'
    style += ` ${circleStyle} ${mouseArrowStyle}`
    if (this.props.drawnNumbers !== undefined) {
      const numbersMatched = this.props.drawnNumbers.split(',')
      numbersMatched.forEach((item) => {
        if (Number(item) === this.props.number && !this.state.checked) {
          style += ' number-circle-matched'
          imgDir = 'win/'
        } else if (Number(item) === this.props.number) {
          style += ' number-circle-drawn'
          imgDir = 'win/'
        }
      })
    }
    let bgImage = ''
    if (this.props.bgImage && this.props.bgImage.length) {
      if (this.props.gameType === 'Keno_Blackjack') {
        bgImage = 'url(images/black_jack/' + imgDir + this.props.bgImage + ')'
      }
    }
    return (
      <div className={style} onClick={::this.handleClick} style={{backgroundImage: bgImage}}>
        <div className="number-circle-bg" />
        <span>{this.props.number}</span>
      </div>
    )
  }
}
