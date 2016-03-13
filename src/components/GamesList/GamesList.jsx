
import React, { PropTypes } from 'react'
// import classes from './GamesList.scss'
import { Panel, Col } from 'react-bootstrap'
import GameListItem from './GamesListItem/GamesListItem.jsx'
import Slider from 'react-slick'

export default class GamesList extends React.Component {

  static propTypes = {
    kenoGames: PropTypes.array
  };

  render () {
    const settings = {
      arrows: true,
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    }
    const gamesListItems = []
    this.props.kenoGames.map((i) => {
      gamesListItems.push(
        <GameListItem
          key={i.kenoGameConfig.id}
          name={i.name}
          minBet={i.kenoGameConfig.minBet}
          maxBet={i.kenoGameConfig.maxBet}
          boardNumbers={i.kenoGameConfig.boardNumbers}
        />)
    })
    return (
      <Col xs={12} md={12}>
        <Panel>
          <Slider {...settings}>
            {gamesListItems.map((i) => {
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
