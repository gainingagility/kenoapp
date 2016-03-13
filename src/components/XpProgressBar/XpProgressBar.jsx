
import React, { PropTypes } from 'react'
import { Panel, ProgressBar } from 'react-bootstrap'

export default class XpProgressBar extends React.Component {

  static propTypes = {
    playerObject: PropTypes.object
  };

  render () {
    const totalXPForLevel = this.props.playerObject.wallet.xpToNextLevel + this.props.playerObject.wallet.xp
    const xpToNextLevel = this.props.playerObject.wallet.xpToNextLevel / totalXPForLevel * 100
    const currentXP = this.props.playerObject.wallet.xp / totalXPForLevel * 100
    return (
      <Panel>
        <ProgressBar>
          <ProgressBar striped bsStyle='success' label='%(percent)s%' now={currentXP} key={1} />
          <ProgressBar bsStyle='info' label='%(percent)s%' now={xpToNextLevel} key={2} />
        </ProgressBar>
      </Panel>
    )
  }
}
