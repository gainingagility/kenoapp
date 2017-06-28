
import React, { PropTypes } from 'react'
import PriceBlock from './PriceBlock/PriceBlock.jsx'
import Modal from 'react-modal'

export default class BuyCoinsModal extends React.Component {

  static propTypes = {
    modalIsOpen: PropTypes.bool,
    buyCoinsPack: PropTypes.func,
    closeModal: PropTypes.func
  };

  constructor () {
    super()
    this.state = {
      priceBlocks: [
        {id: 1, coins: 10, price: '0.50'},
        {id: 2, coins: 25, price: '1.00'},
        {id: 3, coins: 50, price: '1.50'},
        {id: 4, coins: 100, price: '5.00'}
      ],
      checkedBlockId: null
    }
  }

  priceBlockChecked (id) {
    this.setState({
      checkedBlockId: id
    })
  }

  buyCoins () {
    const FB = window.FB
    const coins = this.state.priceBlocks[this.state.checkedBlockId - 1].coins
    const buyCoinsPack = this.props.buyCoinsPack
    FB.ui({
      method: 'pay',
      action: 'purchaseitem',
      product: `https://kenoapp.herokuapp.com/og/coins${coins}.html`,
      quantity: '1'
    },
    (res) => {
      if (res.payment_id !== undefined) {
        buyCoinsPack(coins, res.payment_id)
      }
    }
    )
  }

  render () {
    const priceBlocks = []
    const buyButtonDissabled = this.state.checkedBlockId === null

    this.state.priceBlocks.forEach((block) => {
      const isBlockChecked = this.state.checkedBlockId === block.id
      if (isBlockChecked) {
        priceBlocks.push(
          <PriceBlock
            key={block.id}
            id={block.id}
            coins={block.coins}
            price={block.price}
            priceBlockChecked={::this.priceBlockChecked}
            checked
            />)
      } else {
        priceBlocks.push(
          <PriceBlock
            key={block.id}
            checked={false}
            id={block.id}
            coins={block.coins}
            price={block.price}
            priceBlockChecked={::this.priceBlockChecked}
            />)
      }
    })

    return (
      <div>
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.props.closeModal}
          className="popup-buy-coins" >
          <p className="popup-title">Buy More Coins</p>
          <img className="popup-icon" src="assets/icon-buy-more-coins.png" />
          <div className="popup-content flex-display">
            {priceBlocks.map((i) => {
              return (
                i
              )
            }, this)}
          </div>
          <button className="popup-button" onClick={::this.buyCoins} disabled={buyButtonDissabled}>BUY MORE COINS</button>
        </Modal>
      </div>
    )
  }
}
