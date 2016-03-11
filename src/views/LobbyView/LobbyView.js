/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { } from '../../redux/modules/keno'
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
    playerObject: PropTypes.object.isRequired
  };

  render () {
    const playerObject = JSON.stringify(this.props.playerObject)
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel style={{'textAlign': 'center'}}><h1>
            Lobby view</h1>
              <div style={{'wordWrap': 'break-word'}}>{playerObject}</div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  playerObject: state.keno.playerObject
})
export default connect((mapStateToProps), {
})(LobbyView)
