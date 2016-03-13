
import React, { PropTypes } from 'react'
import { Panel, Col } from 'react-bootstrap'
// import classes from './FriendsListItem.scss'

export default class FriendsListItem extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    picture: PropTypes.string
  };

  render () {
    return (
      <Col xs={12} md={2} style={{
        'marginRight': '5px',
        'textAlign': 'center'
      }}>
        <Panel style={{
          'minHeight': '170px'
        }}>
          <div style={{
            'minHeight': '30px'
          }}>{this.props.name}</div>
          <hr />
          <img src={this.props.picture}/>
        </Panel>
      </Col>
    )
  }
}
