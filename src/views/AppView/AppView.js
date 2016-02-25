import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkAuth } from '../../redux/modules/keno'
import { Grid, Panel, Row, Col, Button } from 'react-bootstrap'
import BigNumberCircle from 'components/BigNumberCircle/BigNumberCircle'
// import classes from './LoginView.scss'

export class AppView extends React.Component {
  static propTypes = {
    gamblerObject: PropTypes.object.isRequired,
    gameSettings: PropTypes.object.isRequired,
    checkAuth: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'selectedNumbers': [],
      'circlesDisabled': false,
      'selectedNumbersCount': 0
    }
  }

  componentDidMount () {
    // if user is not logged - redirect to login page
    this.props.checkAuth()
  }

  selectNumber (selectedNumber, toAdd) {
    let selectedNumbersCount

    if (toAdd) {
      this.state.selectedNumbers.push(selectedNumber)
      selectedNumbersCount = this.state.selectedNumbersCount + 1
      this.setState({
        'selectedNumbersCount': selectedNumbersCount
      })
    } else {
      const indexOfDeletedNumber = this.state.selectedNumbers.indexOf(selectedNumber)
      this.state.selectedNumbers.splice(indexOfDeletedNumber, 1)
      selectedNumbersCount = this.state.selectedNumbersCount - 1
      this.setState({
        'selectedNumbersCount': selectedNumbersCount
      })
    }

    const checkMaxCountOfCircles = selectedNumbersCount < this.props.gameSettings.maxSelectedNumbers
    if (checkMaxCountOfCircles) {
      this.setState({
        'circlesDisabled': false
      })
    } else {
      this.setState({
        'circlesDisabled': true
      })
    }
  }

  render () {
    const numberCircles = []
    for (let i = 1; i <= this.props.gameSettings.maxCountOfNumbers; i++) {
      numberCircles.push(
        <BigNumberCircle
          number={i}
          key={i}
          selectNumber={::this.selectNumber}
          disabled={this.state.circlesDisabled}
        />)
    }
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
        <Row id='numberCircles'>
          <Col xs={12} md={12}>
            <Panel>
              {numberCircles.map((i) => {
                return (
                  i
                )
              }, this)}
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <Panel>
              Numbers drawn
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <Panel>
              <Button bsStyle='primary'>Clear result</Button>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <Button bsStyle='primary'>Play game</Button>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              Total numbers
            </Panel>
          </Col>
          <Col xs={12} md={6}>
            <Panel>
              Numbers mathed
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  gamblerObject: state.keno.gamblerObject,
  gameSettings: state.keno.gameSettings
})
export default connect((mapStateToProps), {
  checkAuth
})(AppView)
