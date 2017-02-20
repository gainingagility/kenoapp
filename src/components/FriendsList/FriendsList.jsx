
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import Slider from 'react-slick'

export default class FriendsList extends React.Component {

  static propTypes = {
    fbFriends: PropTypes.array
  };

  inviteFriend (e) {
    const FB = window.FB
    const id = e.target.value
    FB.ui({
      method: 'apprequests',
      title: 'Come join me on Golden Ball Keno',
      message: 'You should join me playing Golden Ball Keno.',
      to: id
    }, (response) => {
      console.log(response)
    })
  }

  render () {
    const settings = {
      dots: false,
      autoplay: true,
      swipe: false,
      arrows: false,
      speed: 700,
      infinity: true,
      slidesToShow: 5,
      slidesToScroll: 1
    }
    const friendsListItems = []
    if (this.props.fbFriends !== undefined) {
      this.props.fbFriends.map((i) => {
        friendsListItems.push(
          <div className="friend flex-display">
            <div className="friend-photo">
              <img src={i.picture.data.url} />
            </div>
            <div className="friend-name">{i.name}</div>
            <button className="btn-invite-friend" value={i.id} onClick={::this.inviteFriend}>Invite/Add</button>
          </div>
        )
      })
    }
    return (
      <div className="friends-list-wrapper">
        <div className="titlebox">Friends List</div>
        <div className="friends-list flex-display">
          <Slider {...settings}>
            {friendsListItems.map((i) => {
              return (
                i
              )
            }, this)}
          </Slider>
        </div>
      </div>
    )
  }
}
