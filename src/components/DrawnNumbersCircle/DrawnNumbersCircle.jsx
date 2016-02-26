
import React, { PropTypes } from 'react'
import classes from './DrawnNumbersCircle.scss'

export default class DrawnNumbersCircle extends React.Component {

  static propTypes = {
    number: PropTypes.string.isRequired
  };

  render () {
    // Change style of circle on check
    return (
      <div className={classes.numberCircle} >
        {this.props.number}
      </div>
    )
  }
}
