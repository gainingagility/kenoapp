import React, { PropTypes } from 'react'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { hideModal } from 'redux/modules/modal'
import TrophiesList from './TrophiesList.jsx'
import ReactPaginate from 'react-paginate'

export class TrophiesModal extends React.Component {

  static propTypes = {
    hideModal: PropTypes.func.isRequired,
    trophies: PropTypes.array
  };

  constructor (props) {
    super(props)

    this.state = {
      data: this.props.trophies.slice(0, 3),
      pageNum: this.props.trophies.length / 3,
      offset: 0
    }
  }

  loadTrophies () {
    const offset = this.state.offset
    const data = this.props.trophies.slice(offset, offset + 3)
    this.setState({data: data, pageNum: Math.ceil(this.props.trophies.length / 3)})
  }

  handlePageClick = (data) => {
    const selected = data.selected
    const offset = Math.ceil(selected * 3)

    this.setState({offset: offset}, () => {
      this.loadTrophies()
    })
  }

  handleModalCloseRequest () {
    this.props.hideModal()
  }

  render () {
    return (
      <Modal
        className="popup-trophies"
        onRequestClose={::this.handleModalCloseRequest}
        closeTimeoutMS={150}
        isOpen
      >
        <TrophiesList trophies={this.state.data} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={<a href="">...</a>}
          pageNum={this.state.pageNum}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          clickCallback={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'} />
      </Modal>
    )
  }
}

export default connect(null, {
  hideModal
})(TrophiesModal)
