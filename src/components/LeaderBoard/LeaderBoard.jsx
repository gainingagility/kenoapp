
import React, { PropTypes } from 'react'
// import classes from './LeaderBoard.scss'
import LeaderPlayer from './LeaderPlayer/LeaderPlayer.jsx'
import $ from 'jquery'
window.jQuery = $
require('ms-signalr-client')
const con = $.hubConnection('https://kenoapp.azurewebsites.net/signalr/hubs')
const hub = con.createHubProxy('social')

export default class LeaderBoard extends React.Component {

  static propTypes = {
    playerObject: PropTypes.object.isRequired,
    facebookUserObject: PropTypes.object.isRequired
  };

  constructor () {
    super()
    this.state = {
      'leaderboardInfo': []
    }
  }

  componentDidMount () {
    hub.on('onLeaderboardChange', (arr) => {
      this.setState({
        'leaderboardInfo': []
      })
      let id = 1
      console.log(arr)
      const players = JSON.parse(arr)
      const leaderBoardInfo = []
      players.forEach((i) => {
        leaderBoardInfo.push(<LeaderPlayer player={i} key={id} id={id} />)
        id++
      })
      this.setState({
        leaderboardInfo: leaderBoardInfo
      })
    })
    // con.logging = true
    con.start({ jsonp: true }).done(() => {
      hub.invoke('ShowLatestLeaderboard')
    })
  }

  componentWillUnmount () {
    con.stop()
  }

  render () {
    return (
      <div className="game-leaderboard-panel">
        <span className="game-leaderboard-title">Leaderboard</span>
        {this.state.leaderboardInfo.map((i) => {
          return (
            i
          )
        }, this)}
      </div>
    )
  }
}
