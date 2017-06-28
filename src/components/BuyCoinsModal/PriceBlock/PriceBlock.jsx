
import React, { PropTypes } from 'react'
export default class PriceBlock extends React.Component {

  static propTypes = {
    priceBlockChecked: PropTypes.func,
    coins: PropTypes.number,
    id: PropTypes.number,
    checked: PropTypes.bool,
    price: PropTypes.string
  };

  handleBlockClick () {
    this.props.priceBlockChecked(this.props.id)
  }

  render () {
    var style = 'item left-border'
    if (this.props.checked) {
      style += ' item-active'
    }
    return (
      <div className={style} onClick={::this.handleBlockClick}>
        <p>
          <span>{this.props.coins}</span> Coins<br />
          £ <span>{this.props.price}</span>
        </p>
      </div>
    )
  }
}
