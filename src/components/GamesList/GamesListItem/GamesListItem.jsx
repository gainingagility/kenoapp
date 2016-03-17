
import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
// import classes from './GamesListItem.scss'

export default class GamesListItem extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    minBet: PropTypes.number,
    maxBet: PropTypes.number,
    id: PropTypes.number,
    startGame: PropTypes.func,
    boardNumbers: PropTypes.number
  };

  handleClick () {
    this.props.startGame(this.props.id)
  }

  render () {
    return (
      <Panel className='slick-slide'
        onClick={::this.handleClick}
        style={{
          'width': '200px',
          'cursor': 'pointer',
          'marginRight': '15px'
        }}>
        <div>{this.props.name}</div>
        <div>Min bet: {this.props.minBet}</div>
        <div>Max bet: {this.props.maxBet}</div>
        <div>Board numbers: {this.props.boardNumbers}</div>
      </Panel>
    )
  }
}
