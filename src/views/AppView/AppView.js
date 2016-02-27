import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkAuth, selectBalls, playGame, clearResult } from '../../redux/modules/keno'
import { Grid, Panel, Row, Col, Button } from 'react-bootstrap'
import BigNumberCircle from 'components/BigNumberCircle/BigNumberCircle'
import DrawnNumbersCircle from 'components/DrawnNumbersCircle/DrawnNumbersCircle'
import classes from './AppView.scss'

export class AppView extends React.Component {
  static propTypes = {
    gamblerObject: PropTypes.object.isRequired,
    gameSettings: PropTypes.object.isRequired,
    checkAuth: PropTypes.func.isRequired,
    drawnNumbers: PropTypes.string,
    numbersMatched: PropTypes.string,
    selectedBalls: PropTypes.string,
    totalNumbersMatched: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    clearResult: PropTypes.func.isRequired,
    playGame: PropTypes.func.isRequired,
    selectBalls: PropTypes.func.isRequired
  };

  constructor () {
    super()
    this.state = {
      'selectedNumbers': [],
      'circlesDisabled': false,
      'selectedNumbersCount': 0,
      'gameButtonDisabled': true,
      'clearButtonDisable': false
    }
  }

  componentDidMount () {
    // if user is not logged - redirect to login page
    this.props.checkAuth()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.isLoading) {
      this.setState({
        'gameButtonDisabled': true,
        'clearButtonDisable': true
      })
    } else {
      this.setState({
        'gameButtonDisabled': false,
        'clearButtonDisable': false
      })
    }
    if (nextProps.selectedBalls === '') {
      this.setState({
        'gameButtonDisabled': true
      })
    }
  }

  clearResult () {
    this.props.clearResult()
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

    // Enable/disable game button
    if (selectedNumbersCount !== 0) {
      this.setState({
        'gameButtonDisabled': false
      })
    } else {
      this.setState({
        'gameButtonDisabled': true
      })
    }
    this.props.selectBalls(this.state.selectedNumbers)
  }

  playGame () {
    this.props.playGame()
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
    const drawnNumberCircles = []
    if (this.props.drawnNumbers !== undefined) {
      const drawnNumbers = this.props.drawnNumbers.split(',')
      drawnNumbers.forEach((item) => {
        drawnNumberCircles.push(
          <DrawnNumbersCircle
            number={item}
            key={item}
          />)
      })
    }
    const numbersMatchedCircles = []
    if (this.props.numbersMatched !== undefined) {
      const numbersMatched = this.props.numbersMatched.split(',')
      numbersMatched.forEach((item) => {
        numbersMatchedCircles.push(
          <DrawnNumbersCircle
            number={item}
            key={item}
          />)
      })
    }
    let totalNumbersMatched = ''
    if (totalNumbersMatched !== undefined) {
      totalNumbersMatched = this.props.totalNumbersMatched
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} md={12}>
            <Panel><h1 className={classes.textCenter}>Welcome To Keno</h1></Panel>
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
              <h2 className={classes.textCenter}>Numbers drawn</h2>
              {drawnNumberCircles.map((i) => {
                return (
                  i
                )
              }, this)}
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <Panel>
              <Button
                bsStyle='primary'
                disabled={this.state.clearButtonDisable}
                onClick={::this.clearResult}>
                  Clear result
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <Button
                bsStyle='primary'
                disabled={this.state.gameButtonDisabled}
                onClick={::this.playGame}>
                  Play game
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <h4 className={classes.textCenter}>Total numbers</h4>
              <h2 className={classes.textCenter}>{totalNumbersMatched}</h2>
            </Panel>
          </Col>
          <Col xs={12} md={6}>
            <Panel>
              <h4 className={classes.textCenter}>Numbers matched</h4>
              {numbersMatchedCircles.map((i) => {
                return (
                  i
                )
              }, this)}
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  gamblerObject: state.keno.gamblerObject,
  isLoading: state.keno.isLoading,
  selectedBalls: state.keno.selectedBalls,
  drawnNumbers: state.keno.processBetObject.resultDetail,
  totalNumbersMatched: state.keno.processBetObject.totalNumbersMatched,
  numbersMatched: state.keno.processBetObject.numbersMatched,
  gameSettings: state.keno.gameSettings
})
export default connect((mapStateToProps), {
  checkAuth,
  clearResult,
  playGame,
  selectBalls
})(AppView)
