import React, { PropTypes } from 'react'

export default class TrophiesList extends React.Component {

  static propTypes = {
    trophies: PropTypes.array
  };

  render () {
    let trophiesNodes = this.props.trophies.map((trophy, index) => {
      let className = 'item bottom-border '
      if (!trophy.isActive) {
        className += 'item-achieved'
      }
      let iconClassName = 'item-icon '
      if (trophy.trophyName.toLowerCase().includes('ball')) {
        iconClassName += 'item-icon-ball'
      } else {
        iconClassName += 'item-icon-bet'
      }
      return (
        <div className={className}>
          <p className="item-title">{trophy.trophyName}</p>
          <div className={iconClassName} />
          <p className="item-description">{trophy.trophyDescription}</p>
        </div>
      )
    })

    return (
      <div id="trophies" className="popup-content flex-display">
        {trophiesNodes}
      </div>
    )
  }
}
