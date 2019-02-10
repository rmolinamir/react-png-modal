import React, { Component } from 'react'
// JSX
import { Modal } from 'react-png-modal'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bIsModalHidden: true
    }

    this.toggleModal = () => {
      this.setState((prevState) => {
        return {
          bIsModalHidden: !prevState.bIsModalHidden
        }
      })
    }

    this.closeModal = () => {
      this.setState({
        bIsModalHidden: true
      })
    }
  }

  render () {
    const showModal = !this.state.bIsModalHidden
    return (
      <React.Fragment>
        <Modal
          toggleModal={this.toggleModal}
          closeModal={this.closeModal}
          show={showModal}>
          <h1 style={{textAlign: 'center'}}>Hello world!</h1>
        </Modal>
        <div style={{textAlign: 'center'}}>
          <button onClick={this.toggleModal}>Toggle Modal</button>
          <hr />
          <h1>Page</h1>
          <h2>Content</h2>
          <h3>Would</h3>
          <h4>Go</h4>
          <h5>Here</h5>
        </div>
      </React.Fragment>
    )
  }
}

export default App;