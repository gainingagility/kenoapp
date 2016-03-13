
import React, { PropTypes } from 'react'
import { Panel } from 'react-bootstrap'
// import classes from './FriendsListItem.scss'

export default class FriendsListItem extends React.Component {

  static propTypes = {
    name: PropTypes.string,
    picture: PropTypes.string
  };

  render () {
    return (
      <Panel className='slick-slide' style={{
        'minHeight': '170px',
        'width': '180px',
        'marginRight': '15px',
        'textAlign': 'center'
      }}>
        <div style={{
          'minHeight': '30px'
        }}>{this.props.name}</div>
        <hr />
        <img style={{
          'marginLeft': '50px'
        }}src={this.props.picture}/>
      </Panel>
    )
  }
}
