/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../redux/modules/keno'
import { Grid, Panel, Row, Col } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
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
export class LoginView extends React.Component<void, Props, void> {
  static propTypes = {
    logIn: PropTypes.func.isRequired
  };

  responseFacebook (response) {
    if (response.status !== 'unknown' && response.message === undefined) {
      this.props.logIn(response)
    }
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel style={{'textAlign': 'center'}}><h1>
            Welcome to Golden Ball Casino - Social Gambling At It's Best!</h1>
              <h4>Please, login using your Facebook details below.</h4>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <FacebookLogin
              // heroku appId='458885024321985'
              appId='988449867905257'
              callback={::this.responseFacebook}
              scope='public_profile, email, user_friends'
              autoLoad
              />
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect((mapStateToProps), {
  logIn
})(LoginView)
