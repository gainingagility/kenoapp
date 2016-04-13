
import React, { PropTypes } from 'react'
import { Panel, ProgressBar } from 'react-bootstrap'

export default class XpProgressBar extends React.Component {

  static propTypes = {
    playerObject: PropTypes.object
  };

  render () {
    const progressBarLabel = `${this.props.playerObject.wallet.xp}/${this.props.playerObject.level.levelXP}`
    return (
      <Panel>
        <ProgressBar
          striped
          bsStyle='success'
          label={progressBarLabel}
          now={this.props.playerObject.wallet.xpToNextLevel}
        />
      </Panel>
    )
  }
}
