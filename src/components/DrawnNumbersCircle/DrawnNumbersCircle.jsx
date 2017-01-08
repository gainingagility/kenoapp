
import React, { PropTypes } from 'react'

export default class DrawnNumbersCircle extends React.Component {

  static propTypes = {
    number: PropTypes.string.isRequired
  };

  render () {
    // Change style of circle on check
    return (
      <div className="number-circle number-circle-matched">
        <div className="number-circle-bg" />
        <span>{this.props.number}</span>
      </div>
    )
  }
}
