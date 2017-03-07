/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { startGame, logIn } from '../../redux/modules/keno'
import GamesList from 'components/GamesList/GamesList.jsx'
import FriendsList from 'components/FriendsList/FriendsList.jsx'
import XpProgressBar from 'components/XpProgressBar/XpProgressBar.jsx'
import PictureProfile from 'components/PictureProfile/PictureProfile.jsx'
import LeaderBoard from 'components/LeaderBoard/LeaderBoard.jsx'
import TrophiesButton from 'components/Modals/Buttons/TrophiesButton/TrophiesButton'
import Spinner from 'react-spinkit'
// import classes from './LoginView.scss'

// Use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience I've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
type Props = {
  startGame: Function
};

// Avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class LobbyView extends React.Component<void, Props, void> {
  static propTypes = {
    playerObject: PropTypes.object.isRequired,
    kenoGames: PropTypes.array.isRequired,
    lobbyPageLoading: PropTypes.bool.isRequired,
    userTrophies: PropTypes.string,
    startGame: PropTypes.func,
    logIn: PropTypes.func,
    facebookUserObject: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.logIn()
  }

  handleLogOut () {
    window.localStorage.clear()
    window.location.href = '/login'
  }

  render () {
    let coinBalance = ''
    let barBalance = ''
    let ballBalance = ''
    let levelNumber = ''
    let levelStatus = ''
    if (Object.keys(this.props.playerObject).length !== 0) {
      coinBalance = this.props.playerObject.wallet.coinBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      barBalance = this.props.playerObject.wallet.barBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      ballBalance = this.props.playerObject.wallet.ballBalance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
      levelNumber = this.props.playerObject.level.displayLevelInfo
      levelStatus = this.props.playerObject.level.levelStatus
    }
    return (
      <div className="lobby">
        {this.props.lobbyPageLoading ? <Spinner spinnerName="double-bounce" noFadeIn /> : <div>
          <div className="main-container flex-display">
            <div className="main">
              <div className="header">
                <div className="header-content">
                  <div className="header-content-bg" />
                  <div className="header-content-wrapper flex-display">
                    <img className="header-logo" src="assets/bg_logo.png" />
                    <div className="header-info flex-display theme-bg">
                      <div className="header-info-border" />
                      <div className="header-info-item flex-display right-separator">
                        <div className="header-info-item-icon icon-coins" />
                        <span className="header-info-item-text">
                          {coinBalance}
                        </span>
                      </div>
                      <div className="header-info-item flex-display right-separator">
                        <div className="header-info-item-icon icon-goldbars" />
                        <span className="header-info-item-text">
                          {barBalance}
                        </span>
                      </div>
                      <div className="header-info-item flex-display right-separator">
                        <div className="header-info-item-icon icon-goldball" />
                        <span className="header-info-item-text">
                          {ballBalance}
                        </span>
                      </div>
                      <div className="header-info-item flex-display right-separator">
                        <div className="header-info-item-icon icon-charts" />
                        <span className="header-info-item-text">
                          {levelNumber}
                        </span>
                      </div>
                      <div className="header-info-item flex-display right-separator">
                        <div className="header-info-item-icon icon-awards" />
                        <span className="header-info-item-text">
                          {this.props.userTrophies}
                        </span>
                      </div>
                      <div className="header-info-item flex-display">
                        <span className="header-info-item-text header-info-item-welcome">
                          Welcome back {this.props.facebookUserObject.name} {levelStatus}!
                        </span>
                      </div>
                    </div>
                    <PictureProfile url={this.props.facebookUserObject.picture} />
                  </div>
                </div>
                <XpProgressBar playerObject={this.props.playerObject} />
              </div>
              <div className="buttons-bar">
                <div className="buttons-bar-left flex-display theme-bg">
                  <div className="button-item right-separator">MY ACCOUNT</div>
                  <div className="button-item right-separator">SHOP</div>
                  <TrophiesButton />
                  <div className="button-item right-separator">LEADERBOARD</div>
                  <div className="button-item right-separator">MINI LEAGUE</div>
                  <div className="button-item right-separator">SUGGESTIONS</div>
                  <div className="button-item">SUPPORT</div>
                </div>
                <div className="buttons-bar-right flex-display theme-bg">
                  <div className="fb-likes flex-display right-separator">
                    <btn className="btn-fb-like" />
                    <div className="lbl-fb-like">- Lisa and 450 like this</div>
                  </div>
                  <div className="button-item" onClick={::this.handleLogOut}>Logout</div>
                </div>
              </div>
              <div className="lobby-main flex-display">
                <GamesList
                  startGame={this.props.startGame}
                  kenoGames={this.props.kenoGames}
                  />
                <div className="leaderboard-panel-wrapper">
                  <LeaderBoard playerObject={this.props.playerObject} facebookUserObject={this.props.facebookUserObject} />
                </div>
              </div>
              <div className="footer">
                <div className="footer-bg" />
                <FriendsList fbFriends={this.props.facebookUserObject.friends} />
              </div>
            </div>
          </div>
        </div>}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  playerObject: state.keno.playerObject,
  kenoGames: state.keno.kenoGames,
  userTrophies: state.keno.userTrophies,
  lobbyPageLoading: state.keno.lobbyPageLoading,
  facebookUserObject: state.keno.facebookUserObject
})

export default connect((mapStateToProps), {
  startGame, logIn
})(LobbyView)
