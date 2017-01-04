import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { showModal } from 'redux/modules/modal'

export class RoundDetailedInformationBtn extends React.Component {

  static propTypes = {
    showModal: PropTypes.func.isRequired,
    round: PropTypes.number,
    game: PropTypes.object
  };

  handleShowLogInModal () {
    const modalProps = Object.assign({}, this.props) // Second parameter must be object.
    this.props.showModal('roundDetails', modalProps)
  }

  numberFormatter (num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G'
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num
  }

  render () {
    const matched = this.props.game !== undefined ? this.props.game.matched : ''
    console.log(this.props)
    return (
      <div
        onClick={::this.handleShowLogInModal}
        style={{
          'cursor': 'pointer'
        }}
        className="game-score-panel-content-row flex-display"
      >
        <span className="game-score-panel-content-item">{this.props.round}</span>
        <span className="game-score-panel-content-item">{matched}</span>
        <span className="game-score-panel-content-item">{this.numberFormatter(this.props.game.won)}</span>
      </div>
    )
  }
}

export default connect(null, {
  showModal
})(RoundDetailedInformationBtn)
