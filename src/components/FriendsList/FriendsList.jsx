
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import { Panel, Col, Row } from 'react-bootstrap'
import _ from 'lodash'
import FriendsListItem from './FriendsListItem/FriendsListItem.jsx'

export default class FriendsList extends React.Component {

  static propTypes = {
    fbFriends: PropTypes.array
  };

  render () {
    const friendsListItems = []
    if (this.props.fbFriends !== undefined) {
      const fbFriends = _.shuffle(this.props.fbFriends)
      for (let i = 0; i < 5; i++) {
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
        <Row style={{
          'textAlign': 'center'
        }}>
          <Panel>
              {friendsListItems.map((i) => {
                return (
                  i
                )
              }, this)}
          </Panel>
        </Row>
      </Col>
    )
  }
}
