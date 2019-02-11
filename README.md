# React Plug-N'-Go Modal

> Renders a mode that disables the main window but keeps it visible, with a react.js component modal window as a child window in front of it capable of rendering any children passed to it.

[![NPM](https://img.shields.io/npm/v/react-png-modal.svg)](https://www.npmjs.com/package/react-png-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-png-modal
```

## Instructions
1. Declare and define a state with a boolean variable that will handle the Modal rendering inside a classful or functional 'hooked' component.
2. Create close setter for said boolean, these setter will need to be passed down to the modal.
3. Pass props as shown in the examples, that's it!

## Features

1. ESC key event listener triggered for desktop users, pressing it will close the modal.
2. You can place it anywhere on your DOM tree and have multiple modals (think of it like a HOC for whatever you pass as children).
3. Can handle any type of children. It has a max-width of 500px, but it's a property that can be changed by passing a prop named `maxWidth` (see below for all the other available props).
4. The modal's CSS may be changed without disrupting the functionality of the modal (**don't change the position: relative though or else it'll look bad because it will overflow the backdrop, if you need something absolutely positioned then do it through a child div element.**).
5. Removes parasitic page content jump to the right after the modal is opened (this happens because the scrollbar may disappear). If you used create-react-app, chances are this feature will work correctly by default because it targets the div with an id equal to `root`. If there are none then it will target the body. **However, you can pass a `bodyRef` prop (type element) to target that reference instead** (e.g. if your "root" div's id is not equal to `root` but instead is equal to `app`, then you should pass the reference as `document.getElementById('app)`). **You can disable this feature by passing the prop `shouldContentJump`, more details about props down below.**.

Props               |       Functionality
-------------       |       -------------
`shouldContentJump` |       Pass this prop as **true** if you want content jumps when opening the modal (not recommended).
`bodyRef`           |       A reference to an element for contentJump to work correctly (not always necessary, read Features point 5 for more details), make sure that's it's the element and not the whole React reference object.
`closeModal`        |       Callback passed to the modal to close it, should change the 'show' prop's boolean value to false.
`className`         |       You can use your own desired CSS class for the modal window by passing said class as a prop (you'll be able to change everything, such as background, border, etc.).
`maxWidth`          |       Modal's max-width, defaults to 500px on devices with a screen width higher or equal than 600px (min-width: 600px).
`transparent`       |       Removes the border and background from the modal. The cancel button turns white (the backdrop's background will always be (rgba(0,0,0,.55))).
`alwaysShow`        |       This property will prevent the cancel button from being rendered. I assume the modal won't receive toggleModal nor closeModal functionalities from being passed. e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when alwaysShow turns false.
`background`        |       Background styling, transparent styling takes priority over background styling.
`border`            |       Border styling, transparent styling takes priority over border styling.

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
          <h1>Hello world!</h1>
        </Modal>
        <div>
          <button onClick={this.toggleModal}>Toggle Modal</button>
        </div>
      </React.Fragment>
    )
  }
}
```

## Usage for React.js version ^15.0

[![Edit React Plug N' Go Modal (React.js 16.6.0)](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pplxlvvoqx)

### (!) DON'T use the default export if you're not using React.js version 16.8.0 or more.

```jsx
import React, { Component } from 'react'

import { Modal } from 'react-png-modal' // You can't use the default export if you're not using the latest React.js v^16.8.0

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
          <h1>Hello world!</h1>
        </Modal>
        <div>
          <button onClick={this.toggleModal}>Toggle Modal</button>
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
        <h1>This is the hooked modal alternative!</h1>
      </Modal>
      <div>
        <button onClick={() => setModalIsHidden(!bIsModalHidden)}>Toggle Modal</button>
      </div>
    </>
  )
}
```

## Pending

- Focus trapping within the modal is not yet implemented, but will be in the near future with the help of **focus-trap-react**. 

## License

MIT © [rmolinamir](https://github.com/rmolinamir)
