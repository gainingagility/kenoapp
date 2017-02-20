
import React, { PropTypes } from 'react'
import RoundDetailedInformationBtn from
'components/Modals/Buttons/RoundDetailedInformationBtn/RoundDetailedInformationBtn'

export default class PayoutResultTable extends React.Component {

  static propTypes = {
    paytableItems: PropTypes.Array,
    selectedNumbersCount: PropTypes.Number,
    rounds: PropTypes.Array
  };

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
    let payTable = this.props.paytableItems.find((e) => {
      return parseInt(e.numberspicked, 0) === parseInt(this.props.selectedNumbersCount, 0)
    })
    if (payTable) { payTable = payTable.paytableitem } else {
      payTable = []
    }

    let totalWon = 0
    const playedRounds = []
    const rounds = this.props.rounds
    for (let i = 1; i <= rounds.length; i++) {
      const index = i - 1
      totalWon += rounds[index].won
      playedRounds.push(
        <RoundDetailedInformationBtn
          round={i}
          key={index}
          game={rounds[index]}
        />
        )
    }

    return (
      <div className="game-score-panel">
        <div className="game-score-panel-title">
          <span className="game-score-panel-title-payout">Payout</span>
          <span className="game-score-panel-title-results">Results</span>
        </div>
        <div className="game-score-panel-main theme-bg">
          <div className="game-score-panel-header flex-display">
            <span className="game-score-panel-header-item">Hits</span>
            <span className="game-score-panel-header-item">Payouts</span>
            <span className="game-score-panel-header-item">Round</span>
            <span className="game-score-panel-header-item">Hits</span>
            <span className="game-score-panel-header-item">Payouts</span>
          </div>
          <div className="game-score-panel-content flex-display">
            <div className="game-score-panel-content-payout flex-display">
              {payTable.map((e) => {
                return (
                  <div className="game-score-panel-content-row flex-display">
                    <span className="game-score-panel-content-item">{e.matched}</span>
                    <span className="game-score-panel-content-item">{this.numberFormatter(e.payout)}</span>
                  </div>
                )
              })}
            </div>
            <div className="game-score-panel-content-results flex-display">
              {playedRounds.map((i) => {
                return (
                  i
                )
              }, this)}
            </div>
          </div>
          <div className="game-score-panel-footer flex-display">
            <span className="game-score-panel-footer-totalwin">Total Win</span>
            <img className="coins-icon" src="assets/coins-icon.png" />
            <span className="game-score-panel-footer-totalscore">{this.numberFormatter(totalWon)}</span>
          </div>
        </div>
      </div>
    )
  }
}
