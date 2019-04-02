# React Plug-N'-Go Modal

> Renders a mode that disables the main window but keeps it visible, with a react.js component modal window as a child window in front of it capable of rendering any children passed to it.

[![NPM](https://img.shields.io/npm/v/react-png-modal.svg)](https://www.npmjs.com/package/react-png-modal) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-png-modal
```

## Showcase

### [Examples hosted on CodeSandbox](https://31wj9p56qm.codesandbox.io/ "CodeSandbox Showcase")

### [Servify](https://www.servifyapp.com "Servify Website")

![Alt Text](https://media.giphy.com/media/5UMF6RMefKDFWMKJ3Y/giphy.gif)

### [My Personal Website](https://robertmolinamir.firebaseapp.com/ "Robert Molina")

![Alt Text](https://media.giphy.com/media/11Rm1aK7P6fwcuY8jh/giphy.gif)

## Instructions

1. Declare and define a state with a `boolean` variable that will handle the Modal rendering inside a classful or functional 'hooked' component.
2. Create an open & close setter functions for said boolean, the close setter will need to be passed down to the modal as `closeModal` and the boolean as `open`.
3. The modal will close after:
    - Pressing the ESC key on desktop.
    - Clicking the X button on the modal window.
    - Clicking anywhere on the backdrop overlay.

## Features

1. ESC key event listener triggered for desktop users, pressing it will close the modal.
2. You can place it anywhere on your DOM tree and have multiple modals (think of it like a HOC for whatever you pass as children), the modals will be placed below your `#root` div or below your body if `#root` is not found by using react ***Portals***.
3. Can handle any type of children.
4. The modal window's CSS may be changed without disrupting the functionality of the modal by passing a CSS class.
5. Removes parasitic page content jump to the right after the modal is opened (this happens because the scrollbar may disappear).
6. Locks the body scrolling.
7. Focus-locks (thanks to `react-focus-lock`) within the opened modal.
      - **NOTE**:    If you used `create-react-app`, the modal will work correctly by default because it targets the div with an id equal to `root`. If there are none then it will target the body. **However, you can pass a `bodyRef` prop (type `HTMLElement`) to target that element instead** (e.g. if your "root" div's id is not equal to `root` but instead is equal to `app`, then you should pass the reference as `document.getElementById('app)` respectively). **You can disable this feature by passing the prop `shouldContentJump` if for some reason the programmer may wish for it, more details about props down below. This feature is also disabled on mobile, since mobile devices have no scroll bar, *Portals* will still work on mobile.**.

## Props

Props               |       Functionality
-------------       |       -------------
`open`              |       Reference to element to modify its paddingRight when the scrollbar disappears.
`alwaysOpen`        |       This property will prevent the cancel button from being rendered and automatically open the modal. I assume the modal won't receive `closeModal` functionalities being passed down. e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when `alwaysOpen` turns false, removed from the DOM from outside.
`closeModal`        |       Callback passed to the modal to close it, should change the `open` type boolean prop value to false.
`shouldContentJump` |       The shouldContentJump prop enables the parasitic jump, in case for some reason the programmer may want it. `shouldContentJump` is automatically disabled on mobile.
`bodyRef`           |       A variable that stores an element for the `contentJump` and the react Portal (`ReactDOM.createPortal`) to work correctly (not always necessary, read Features point 5 for more details), make sure that's it's the element (type `HTMLElement`), not the React reference object.
`center`            |       Vertically centers the opened modal.
`className`         |       You can use your own CSS class for the modal window by passing said class as a prop (you'll be able to change everything, such as background, border, etc.).
`animationClassName`|       The `animationClassName` prop will be used to decide which animations the modal will use during opening and closing. If a string is passed then it will use one of the available (`fadeIn`, `translateX`, `translateY`) ones or fallback to the default zoom-in and zoom-out, **otherwise** it a prop type `object` is passed, then it must contain the `open` and `close` keys with their respective values as the class animations, for info check out the `Different Animations Modals` example.
`animationDuration` |       Mounting and unmount animation duration, must be in milliseconds. **Defaults to 250ms**.
`overlayColor`      |       Overlay's `background-color` CSS style property.

## CSS Variables

The modal component by default comes with a default class named **`Aesthetics`** that affects the "window" of the modal. This defaut aesthetics CSS class is defined as:

```css
.Aesthetics {
  background-color: var(--modal-background-color, rgb(255, 255, 255));
  color: var(--modal-color, inherit);
  position: relative;
  max-width: 844px;
  width: auto;
  height: 100%;
  padding: 18px;
  border-radius: 4px;
}
```

If you want to modify the window's color or background color you can simply set up those CSS variables in a parent element node, it will end up affecting every modal, you can set this up too by making use of the `bodyRef` prop. The same applies with the overlay color, its variable is:

```css
background-color: var(--modal-overlay-color, rgba(0,0,0,.7)
```

## Usage for React.js version ^15.0.0 || ^16.0.0

[![Edit React Plug N' Go Modal](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/31wj9p56qm?fontsize=14)

```jsx
import React, { Component } from 'react'

import Modal from 'react-png-modal'

class Example extends Component {
  state = {
    bIsModalOpen: false
  }

  openModal = () => {
    this.setState({
      bIsModalOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      bIsModalOpen: false
    })
  }

  render () {
    return (
      <React.Fragment>
        <Modal
          closeModal={this.closeModal}
          open={this.state.bIsModalOpen}>
          <h1>Hello world!</h1>
        </Modal>
        <div>
          <button onClick={this.openModal}>Toggle Modal</button>
        </div>
      </React.Fragment>
    )
  }
}
```

## Alternative that uses React Hooks

```jsx
import React, { useState } from 'react'

import Modal from 'react-png-modal'

const HookedModal = () => {
  const [bIsModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Modal
        closeModal={() => setIsModalOpen(false)}
        open={bIsModalOpen}>
        <h1>This is the hooked modal alternative!</h1>
      </Modal>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      </div>
    </>
  )
}
```

## License

MIT © [rmolinamir](https://github.com/rmolinamir)