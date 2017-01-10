
import React, { PropTypes } from 'react'
// import classes from './PictureProfile.scss'

export default class PictureProfile extends React.Component {

  static propTypes = {
    url: PropTypes.string
  };

  render () {
    return (
      <div className="profile-picture">
        <div className="profile-picture-inner">
          <img src={this.props.url} className="profile-picture-img" />
        </div>
      </div>
    )
  }
}
