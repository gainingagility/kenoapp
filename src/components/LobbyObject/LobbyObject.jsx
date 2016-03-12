
import React, { PropTypes } from 'react'
// import classes from './LobbyObject.scss'
import { Panel, Col } from 'react-bootstrap'

export default class LobbyObject extends React.Component {

  static propTypes = {
    value: PropTypes.string,
    text: PropTypes.string
  };

  render () {
    return (
      <Col xs={12} md={4}>
        <Panel>
          {this.props.text} {this.props.value}
        </Panel>
      </Col>
    )
  }
}
