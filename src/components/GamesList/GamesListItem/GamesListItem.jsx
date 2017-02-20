
import React, { PropTypes } from 'react'
// import classes from './GamesListItem.scss'

export default class GamesListItem extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    minBet: PropTypes.number,
    maxBet: PropTypes.number,
    locked: PropTypes.bool,
    id: PropTypes.number,
    startGame: PropTypes.func,
    boardNumbers: PropTypes.number
  };

  handleClick () {
    this.props.startGame(this.props.id)
  }

  render () {
    let gameClassName = ''
    switch (this.props.name) {
      case 'Keno Bingo UK':
        gameClassName = 'uk_game '
        break
      case 'Keno Bingo USA':
        gameClassName = 'usa_game '
        break
      case 'Keno Blackjack':
        gameClassName = 'blackjack_game '
        break
      case 'Keno Roulette':
        gameClassName = 'roulette_game '
        break
      default:
        break
    }
    // gameClassName += this.props.locked ? 'game-card' : 'game-card locked-game-list-item'
    gameClassName += 'game-item'
    return (
      <div className={gameClassName} onClick={::this.handleClick}>
        <div className="game-item-img" />
        <div className="game-item-info flex-display theme-bg">
          <div className="game-item-info-item">
            Min<br />Bet<br />
            <span>{this.props.minBet}</span>
          </div>
          <div className="right-separator" />
          <div className="game-item-info-item">
            Boarding<br />Numbers<br />
            <span>{this.props.boardNumbers}</span>
          </div>
          <div className="right-separator" />
          <div className="game-item-info-item">
            Max<br />Bet<br />
            <span>{this.props.maxBet}</span>
          </div>
        </div>
      </div>
    )
  }
}
