
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import GameListItem from './GamesListItem/GamesListItem.jsx'

export default class GamesList extends React.Component {

  static propTypes = {
    kenoGames: PropTypes.array,
    startGame: PropTypes.func
  };

  render () {
    const gamesListItems = []
    this.props.kenoGames.map((i) => {
      gamesListItems.push(
        <GameListItem
          key={i.name}
          name={i.name}
          id={i.id}
          startGame={this.props.startGame}
          minBet={i.kenoGameConfig.minBet}
          maxBet={i.kenoGameConfig.maxBet}
          locked={i.isActive}
          boardNumbers={i.kenoGameConfig.boardNumbers}
        />)
    })
    return (
      <div className="games-list flex-display">
        {gamesListItems.map((i) => {
          return (
            i
          )
        }, this)}
      </div>
    )
  }
}
