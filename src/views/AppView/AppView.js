import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkAuth } from '../../redux/modules/keno'
import { Grid, Panel, Row, Col } from 'react-bootstrap'
// import classes from './LoginView.scss'

export class AppView extends React.Component {
  static propTypes = {
    gamblerObject: PropTypes.object.isRequired,
    checkAuth: PropTypes.func.isRequired
  };

  componentDidMount () {
    // if user is not logged - redirect to login page
    this.props.checkAuth()
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel><h1>Welcome To Keno</h1></Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6}>
            <Panel><h3>Player name: {this.props.gamblerObject.name}</h3></Panel>
          </Col>
          <Col xs={12} md={6}>
            <Panel><h3>Points balance: {this.props.gamblerObject.points}</h3></Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>

          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  gamblerObject: state.keno.gamblerObject
})
export default connect((mapStateToProps), {
  checkAuth
})(AppView)
