
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import { Panel, Col } from 'react-bootstrap'
import Slider from 'react-slick'

export default class FriendsList extends React.Component {

  static propTypes = {
    fbFriends: PropTypes.array
  };

  render () {
    const settings = {
      dots: false,
      arrows: false,
      autoplay: true,
      speed: 700,
      infinity: true,
      slidesToShow: 5,
      slidesToScroll: 1
    }
    const friendsListItems = []
    if (this.props.fbFriends !== undefined) {
      this.props.fbFriends.map((i) => {
        friendsListItems.push(
          <Panel key={i.id} style={{
            'minHeight': '170px',
            'width': '180px',
            'textAlign': 'center'
          }}>
            <div style={{
              'minHeight': '30px'
            }}>{i.name}</div>
            <hr />
            <img style={{
              'margin': '0 auto'
            }}src={i.picture.data.url}/>
          </Panel>)
      })
    }
    return (
      <Col xs={12} md={12}>
        <Panel style={{'maxHeight': '200px'}}>
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
