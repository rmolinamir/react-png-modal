import React, { Component } from 'react'
// JSX
import Modal from 'react-png-modal'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bIsModalOpen: false,
      bIsModal2Open: false
    }

    this.openModal = () => {
      this.setState({
        bIsModalOpen: true
      })
    }

    this.openModal2 = () => {
      this.setState({
        bIsModal2Open: true
      })
    }

    this.closeModal = () => {
      this.setState({
        bIsModalOpen: false
      })
    }

    this.closeModal2 = () => {
      this.setState({
        bIsModal2Open: false
      })
    }
  }

  render () {
    return (
      <React.Fragment>
        <Modal
          open={this.state.bIsModalOpen}
          closeModal={this.closeModal}>
          <h1 style={{ textAlign: 'center' }}>Multiple Modals</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <input type='number' />
          <button onClick={this.openModal2}>Open Modal 2</button>
          <Modal
            open={this.state.bIsModal2Open}
            closeModal={this.closeModal2}>
            <h2>Multiple Modals</h2>
            <input type='text' />
            <input type='number' />
            <button>Submit</button>
          </Modal>
        </Modal>
        <div className='App'>
          <button onClick={this.openModal}>Toggle Modal</button>
          <hr />
          <h1>Page</h1>
          <h2>Content</h2>
          <h3>Would</h3>
          <h4>Go</h4>
          <h5>Here</h5>
          <hr />
          <button onClick={this.openModal}>Toggle Modal</button>
        </div>
      </React.Fragment>
    )
  }
}

export default App
