
import React, { PropTypes } from 'react'

export default class DrawnNumbersCircle extends React.Component {

  static propTypes = {
    number: PropTypes.string.isRequired,
    gameType: PropTypes.string,
    bgImage: PropTypes.string
  };

  render () {
    // Change style of circle on check
    let bgImage = ''
    if (this.props.bgImage && this.props.bgImage.length) {
      if (this.props.gameType === 'Keno_Blackjack') {
        bgImage = 'url(images/black_jack/win/' + this.props.bgImage + ')'
      }
    }
    return (
      <div className="number-circle number-circle-matched" style={{backgroundImage: bgImage}}>
        <div className="number-circle-bg" />
        <span>{this.props.number}</span>
      </div>
    )
  }
}
