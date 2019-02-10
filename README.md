# React Plug-N'-Go Modal

> Renders a mode that disables the main window but keeps it visible, with a react.js component modal window as a child window in front of it capable of rendering any children passed to it.

[![NPM](https://img.shields.io/npm/v/react-png-modal.svg)](https://www.npmjs.com/package/react-png-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-png-modal
```

## Instructions
1. Declare and define a state with a boolean variable that will handle the Modal rendering inside a classful or functional 'hooked' component.
2. Create a toggle and close setters for said boolean, these setters will need to be passed down to the modal. (Q. Why a toggle AND a close? A. To avoid side effects.)
3. Pass props as shown in the examples, that's it!

## Features
Props             |     Functionality
-------------     |     -------------
`className`       |     Border styling, transparent styling takes priority over border styling.
`maxWidth`        |     Modal's max-width, defaults to 500px on devices with a screen width higher or equal than 600px (min-width: 600px).
`transparent`     |     Removes the border and background from the modal. The cancel button turns white (the backdrop's background will always be (rgba(0,0,0,.55))).
`alwaysShow`      |     This property will prevent the cancel button from being rendered. I assume the modal won't receive toggleModal nor closeModal functionalities from being passed. e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when alwaysShow turns false.
`background`      |     Background styling, transparent styling takes priority over background styling.
`border`          |     Border styling, transparent styling takes priority over border styling.

1. You can place it anywhere on your DOM tree.
2. Can handle any type of children. It has a max-width of 500px, but it's a property that can be changed thourgh max

## Usage for React.js version ^16.8 (see below for previous versions)

[![Edit React Plug N' Go Modal](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/l4v861zk6z)

```jsx
import React, { Component } from 'react'

import Modal from 'react-png-modal'

class Example extends Component {
  state = {
    bIsModalHidden: true
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {
        bIsModalHidden: !prevState.bIsModalHidden
      }
    })
  }

  closeModal = () => {
    this.setState({
      bIsModalHidden: true
    })
  }

  render () {
    const showModal = !this.state.bIsModalHidden;
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
            <h1>Page Content</h1>
          </div>
      </React.Fragment>
    )
  }
}
```

## Usage for React.js version ^15.0

[![Edit React Plug N' Go Modal (React.js 16.6.0)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pplxlvvoqx)

```jsx
import React, { Component } from 'react'

import { Modal } from 'react-png-modal'

class Example extends Component {
  state = {
    bIsModalHidden: true
  }

  toggleModal = () => {
    this.setState((prevState) => {
      return {
        bIsModalHidden: !prevState.bIsModalHidden
      }
    })
  }

  closeModal = () => {
    this.setState({
      bIsModalHidden: true
    })
  }

  render () {
    const showModal = !this.state.bIsModalHidden;
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
            <h1>Page Content</h1>
          </div>
      </React.Fragment>
    )
  }
}
```

## Alternative that uses React Hooks

[![Edit React Plug N' Go Modal (Functional 'Hooked' Component)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vn07y87z95)

```jsx
import React, { useState } from 'react'

import Modal from 'react-png-modal'

const HookedModal = () => {
  const [bIsModalHidden, setModalIsHidden] = useState(true)

  const showModal = !bIsModalHidden

  return (
    <>
      <Modal
        toggleModal={() => setModalIsHidden(!bIsModalHidden)}
        closeModal={() => setModalIsHidden(true)}
        show={showModal}>
        <h1 style={{textAlign: 'center'}}>This is the hooked modal alternative!</h1>
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
    </>
  )
}
```

## Pending

- Focus trapping within the modal is not yet implemented, but will be in the near future with the help of **focus-trap-react**.
- Optionally remove parasitic page content to the right after modal is toggled (this happens because the scrollbar may disappear). 

## License

MIT © [rmolinamir](https://github.com/rmolinamir)
