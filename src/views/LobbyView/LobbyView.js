/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { } from '../../redux/modules/keno'
import LobbyObject from 'components/LobbyObject/LobbyObject.jsx'
import GamesList from 'components/GamesList/GamesList.jsx'
import FriendsList from 'components/FriendsList/FriendsList.jsx'
import XpProgressBar from 'components/XpProgressBar/XpProgressBar.jsx'
import PictureProfile from 'components/PictureProfile/PictureProfile.jsx'
import { Grid, Panel, Row, Col } from 'react-bootstrap'
// import classes from './LoginView.scss'

// Use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience I've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
type Props = {
  logIn: Function
};

// Avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class LobbyView extends React.Component<void, Props, void> {
  static propTypes = {
    playerObject: PropTypes.object.isRequired,
    kenoGames: PropTypes.array.isRequired,
    facebookUserObject: PropTypes.object.isRequired
  };

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={10}>
            <Col xs={12} md={12}>
              <Panel>
                <LobbyObject
                  text='Coin balance:'
                  value={String(this.props.playerObject.wallet.coinBalance)}
                />
                <LobbyObject
                  text='Ball balance:'
                  value={String(this.props.playerObject.wallet.ballBalance)}
                />
                <LobbyObject
                  text='Welcome,'
                  value={this.props.facebookUserObject.name}
                />
                <LobbyObject
                  text='Bar balance:'
                  value={String(this.props.playerObject.wallet.barBalance)}
                />
                <LobbyObject
                  text='Level:'
                  value={String(this.props.playerObject.level.levelNumber)}
                />
                <LobbyObject
                  text='Status:'
                  value={this.props.playerObject.level.levelStatus}
                />
              </Panel>
            </Col>
          </Col>
          <Col xs={12} md={2} style={{'textAlign': 'center'}}>
            <Panel>
              <PictureProfile url={this.props.facebookUserObject.picture} />
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12} style={{'textAlign': 'center'}}>
            <XpProgressBar playerObject={this.props.playerObject}/>
          </Col>
        </Row>
        <Row>
          <GamesList kenoGames={this.props.kenoGames}/>
        </Row>
        <Row>
          <FriendsList fbFriends={this.props.facebookUserObject.friends}/>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  playerObject: state.keno.playerObject,
  kenoGames: state.keno.kenoGames,
  facebookUserObject: state.keno.facebookUserObject
})
export default connect((mapStateToProps), {
})(LobbyView)
