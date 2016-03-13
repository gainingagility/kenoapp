
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import { Panel, Col, Row } from 'react-bootstrap'
import FriendsListItem from './FriendsListItem/FriendsListItem.jsx'
import Slider from 'react-slick'

export default class FriendsList extends React.Component {

  static propTypes = {
    fbFriends: PropTypes.array
  };

  render () {
    const settings = {
      arrows: false,
      autoplay: true,
      dots: false,
      speed: 700,
      infinity: true,
      autoplaySpeed: 5000,
      swipeToSlide: false,
      slidesToShow: 4,
      slidesToScroll: 1
    }
    const friendsListItems = []
    if (this.props.fbFriends !== undefined) {
      const fbFriends = this.props.fbFriends
      for (let i = 0; i < fbFriends.length; i++) {
        friendsListItems.push(
          <FriendsListItem
            key={fbFriends[i].id}
            name={fbFriends[i].name}
            picture={fbFriends[i].picture.data.url}
          />)
      }
    }
    return (
      <Col xs={12} md={12}>
        <Panel>
          <Slider {...settings}>
            {friendsListItems.map((i) => {
              return (
                i
              )
            }, this)}
          </Slider>
        </Panel>
      </Col>
    )
  }
}
