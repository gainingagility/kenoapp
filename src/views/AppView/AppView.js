import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkUserLogIn,
          selectBalls,
          playGame,
          clearResult,
          leaveGame,
          addToAmount,
          subtractFromAmount } from '../../redux/modules/keno'
import { Grid, Panel, Row, Col, Button } from 'react-bootstrap'
import BigNumberCircle from 'components/BigNumberCircle/BigNumberCircle'
import DrawnNumbersCircle from 'components/DrawnNumbersCircle/DrawnNumbersCircle'
import showPopupMsg from 'redux/utils/PopupUtils.js'
import classes from './AppView.scss'

export class AppView extends React.Component {
  static propTypes = {
    playerObject: PropTypes.object.isRequired,
    gameSettings: PropTypes.object.isRequired,
    facebookUserObject: PropTypes.object.isRequired,
    gameObject: PropTypes.object.isRequired,
    checkUserLogIn: PropTypes.func.isRequired,
    leaveGame: PropTypes.func.isRequired,
    drawnNumbers: PropTypes.string,
    numbersMatched: PropTypes.string,
    selectedBalls: PropTypes.string,
    totalNumbersMatched: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    betAmount: PropTypes.number.isRequired,
    clearResult: PropTypes.func.isRequired,
    addToAmount: PropTypes.func.isRequired,
    subtractFromAmount: PropTypes.func.isRequired,
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
    this.props.checkUserLogIn()
    // Trigger action to leave game if the user closes the browser/tab
    window.onbeforeunload = () => {
      this.props.leaveGame()
    }
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
    if (nextProps.drawnNumbers !== undefined) {
      this.setState({
        'circlesDisabled': true,
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

  exitGame () {
    this.props.leaveGame()
  }

  addToAmount () {
    this.props.addToAmount()
  }

  subtractFromAmount () {
    this.props.subtractFromAmount()
  }

  showGameInformation () {
    showPopupMsg(this.props.gameObject.kenoGame.kenoGameConfig.payTable)
  }

  render () {
    const numberCircles = []
    for (let i = 1; i <= this.props.gameObject.kenoGame.kenoGameConfig.boardNumbers; i++) {
      numberCircles.push(
        <BigNumberCircle
          number={i}
          key={i}
          drawnNumbers={this.props.drawnNumbers}
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
    if (this.props.totalNumbersMatched !== undefined && this.props.totalNumbersMatched !== 0) {
      const numbersMatched = this.props.numbersMatched.split(',')
      numbersMatched.sort()
      numbersMatched.forEach((item) => {
        numbersMatchedCircles.push(
          <DrawnNumbersCircle
            number={item}
            key={item}
          />)
      })
    }
    let totalNumbersMatched = ''
    if (this.props.totalNumbersMatched !== undefined) {
      totalNumbersMatched = this.props.totalNumbersMatched
    }
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            <h1 className={classes.textCenter}>Welcome To {this.props.gameObject.kenoGame.name}</h1>
          </Col>
          <Col xs={12} md={4}>
            <h3 className={classes.textCenter}>Player Name: <br />
            {this.props.facebookUserObject.name}</h3>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4}>
            <h4 className={classes.textCenter}>Points Balance: {this.props.playerObject.wallet.coinBalance}</h4>
          </Col>
          <Col xs={12} md={4}>
            <h4 className={classes.textCenter}>Level: {this.props.playerObject.level.levelNumber}</h4>
          </Col>
          <Col xs={12} md={4}>
            <h4 className={classes.textCenter}>Status: {this.props.playerObject.level.levelStatus}</h4>
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
          <Col xs={12} md={5}>
            <Panel>
              <h4 className={classes.textCenter}>Numbers matched</h4>
              {numbersMatchedCircles.map((i) => {
                return (
                  i
                )
              }, this)}
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <h4 className={classes.textCenter}>Total numbers</h4>
              <h2 className={classes.textCenter}>{totalNumbersMatched}</h2>
            </Panel>
          </Col>
          <Col xs={12} md={5}>
            <Panel>
              <h4 className={classes.textCenter}>Game message</h4>
            </Panel>
          </Col>
        </Row>
        <Row className={classes.textCenter}>
          <Col xs={12} md={3}>
            <Panel>
              <Button
                bsStyle='info'
                onClick={::this.showGameInformation}>
                  Game information
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <Button
                bsStyle='success'
                onClick={::this.subtractFromAmount}>
                  -
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <h3>{this.props.betAmount}</h3>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <Button
                bsStyle='success'
                onClick={::this.addToAmount}>
                  +
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={3}>
            <Panel>
              <Button
                bsStyle='danger'>
                  Buy More Coins
              </Button>
            </Panel>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <Panel>
              <Button
                bsStyle='warning'
                onClick={::this.exitGame}>
                  Exit Game
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={3}>
            <Panel>
              <Button
                bsStyle='primary'
                disabled={this.state.clearButtonDisable}
                onClick={::this.clearResult}>
                  Clear result
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={3}>
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
              <Button
                bsStyle='success'>
                  Play 5
              </Button>
            </Panel>
          </Col>
          <Col xs={12} md={2}>
            <Panel>
              <Button
                bsStyle='success'>
                  Play 10
              </Button>
            </Panel>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => ({
  playerObject: state.keno.playerObject,
  facebookUserObject: state.keno.facebookUserObject,
  gameObject: state.keno.gameObject,
  isLoading: state.keno.isLoading,
  betAmount: state.keno.betAmount,
  selectedBalls: state.keno.selectedBalls,
  drawnNumbers: state.keno.processBetObject.resultDetail,
  totalNumbersMatched: state.keno.processBetObject.totalNumbersMatched,
  numbersMatched: state.keno.processBetObject.numbersMatched,
  gameSettings: state.keno.gameSettings
})
export default connect((mapStateToProps), {
  checkUserLogIn,
  clearResult,
  leaveGame,
  addToAmount,
  subtractFromAmount,
  playGame,
  selectBalls
})(AppView)
