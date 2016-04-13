import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { checkUserLogIn } from '../../redux/modules/keno'
import LoginView from '../LoginView/LoginView.js'
import LobbyView from '../LobbyView/LobbyView.js'
import GameView from '../GameView/GameView.js'

export class AppView extends React.Component {
  static propTypes = {
    page: PropTypes.string,
    checkUserLogIn: PropTypes.func
  };

  componentDidMount () {
    // if user is not logged - redirect to login page
    this.props.checkUserLogIn()
  }

  render () {
    switch (this.props.page) {
      case 'login':
        return (<LoginView />)
      case 'lobby':
        return (<LobbyView />)
      case 'game':
        return (<GameView />)
      default:
        return (<LoginView />)
    }
  }
}

const mapStateToProps = (state) => ({
  page: state.router.locationBeforeTransitions.query.page
})
export default connect((mapStateToProps), {
  checkUserLogIn
})(AppView)
