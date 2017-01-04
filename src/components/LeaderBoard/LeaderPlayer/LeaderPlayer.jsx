
import React, { PropTypes } from 'react'

export default class LeaderPlayed extends React.Component {

  static propTypes = {
    player: PropTypes.object,
    id: PropTypes.number
  };

  constructor () {
    super()
    this.state = {
      'picture': ''
    }
  }

  addSuffix (number) {
    let j = number % 10
    let k = number % 100
    if (j === 1 && k !== 11) {
      return number + 'st'
    }
    if (j === 2 && k !== 12) {
      return number + 'nd'
    }
    if (j === 3 && k !== 13) {
      return number + 'rd'
    }
    return number + 'th'
  }

  render () {
    const pictureUrl = `http://graph.facebook.com/${this.props.player.facebookId}/picture`
    console.log(pictureUrl)
    return (
      <div className="game-leaderboard-item theme-bg">
        <div className="game-leaderboard-item-ribbon">
          <span className="game-leaderboard-item-rank">{this.addSuffix(this.props.id)}</span>
          <div className="game-leaderboard-item-name-wrapper">
            <span className="game-leaderboard-item-name-bg" />
            <span className="game-leaderboard-item-name">{this.props.player.gamblerName}</span>
          </div>
        </div>
        <div className="game-leaderboard-item-info flex-display">
          <img className="game-leaderboard-item-photo" src={pictureUrl} />
          <div className="game-leaderboard-item-score-wrapper">
            <img className="game-leaderboard-item-coins" src="assets/coins-icon.png" />
            <span className="game-leaderboard-item-score">{this.props.player.coinsWon.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</span>
          </div>
        </div>
      </div>
    )
  }
}
