/* @flow */
import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { logIn } from '../../redux/modules/keno'
import { Grid, Panel, Row, Col, ButtonInput } from 'react-bootstrap'
import { Form, ValidatedInput } from 'react-bootstrap-validation'
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

  handleValidSubmit (value) {
    this.props.logIn(value.playerName)
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel><h1>Please enter your name below to play Keno!</h1></Panel>
          </Col>
        </Row>
        <Form
          encType='multipart/form-data'
          onValidSubmit={::this.handleValidSubmit}
          >
          <Row>
            <Col xs={12} md={12}>
              <ValidatedInput
                type='text'
                label='Name:'
                name='playerName'
                placeholder=''
                validate='required'
                errorHelp={{
                  required: 'Please, enter your name.'
                }}
                />
            </Col>
          </Row>
          <Row>
            <Col xs={2} md={2}>
              <ButtonInput
                type='reset'
                bsSize='large'
                bsStyle='primary'
                value='Clear'
                  />
            </Col>
            <Col xs={2} md={2}>
              <ButtonInput
                type='submit'
                bsSize='large'
                bsStyle='primary'
                value='Submit'
                  />
            </Col>
          </Row>
        </Form>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({})
export default connect((mapStateToProps), {
  logIn
})(LoginView)
