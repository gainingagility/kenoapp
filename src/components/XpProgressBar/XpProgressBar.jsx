
import React, { PropTypes } from 'react'

export default class XpProgressBar extends React.Component {

  static propTypes = {
    playerObject: PropTypes.object
  };

  render () {
    let percentToNextLvl = 0
    let progressBarLabel = 0
    let xpToNextLevel = 0
    let overlayClassName = 'progress-overlay flex-display'
    if (Object.keys(this.props.playerObject).length !== 0) {
      percentToNextLvl = parseInt((this.props.playerObject.wallet.xp/this.props.playerObject.level.levelXP * 100), 0)
      progressBarLabel = `XP  ${this.props.playerObject.wallet.xp}/${this.props.playerObject.level.levelXP} (${percentToNextLvl}% To next level)`
      xpToNextLevel = this.props.playerObject.wallet.xpToNextLevel
      if (xpToNextLevel < 20) {
        overlayClassName += ' small-percent'
      }
    }
    return (
      <div className="header-progress">
        <div className="header-progress-percent-bar" style={{width: xpToNextLevel + '%'}}>
          <div className={overlayClassName}>
            <span>{progressBarLabel}</span>
          </div>
        </div>
      </div>
    )
  }
}
