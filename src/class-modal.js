import React, { Component } from 'react'
import PropTypes from 'prop-types'
// Worker function
import { isMobile } from './is-mobile'
// CSS
import classes from './Modal.css'
// JSX
import Cancel from './cancel'

/**
 * Class component
 */
export default class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func,
    toggleModal: PropTypes.func,
    show: PropTypes.bool.isRequired,
    className: PropTypes.any,
    children: PropTypes.any,
    maxWidth: PropTypes.number,
    // Reference to element to modify its paddingRight when the scrollbar disappears
    bodyRef: PropTypes.element,
    // shouldAvoidContentJump boolean that prevents contentJump function from executing if true.
    shouldAvoidContentJump: PropTypes.bool,
    // This property will prevent the cancel button from being rendered.
    // I assume the modal won't receive toggleModal nor closeModal functionalities from being passed.
    // e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when
    // alwaysShow turns false.
    alwaysShow: PropTypes.bool,
    // Removes border and background from the modal. The cancel button turns white.
    transparent: PropTypes.bool,
    // Modal background styling, transparent styling takes priority over background styling.
    background: PropTypes.string,
    // Border background styling, transparent styling takes priority over border styling.
    border: PropTypes.string
  }

  constructor(props) {
    super(props)
    this.escFunction = this.escFunction.bind(this)
    this.isMobile = isMobile()
    document.body.style.overflow = null
  }

  state = {
    pageYOffset: null
  }

  escFunction = (e) => {
    if (e.keyCode === 27) {
      // Close modal when esc is pressed
      this.props.closeModal()
    }
  }

  mobileScrollHandler = (handler) => {
    switch (handler) {
      case 'enable':
        // Enabling mobile scrolling
        document.body.style.position = null
        document.body.style.top = null
        document.body.style.width = null
        window.scrollTo(0, this.state.pageYOffset)
        break
      case 'disable':
        const pageYOffset = window.pageYOffset
        document.body.style.top = `-${pageYOffset}px`
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        this.setState({
          pageYOffset: pageYOffset
        })
        break
      default:
      // do nothing
    }
  }

  contentJumpHandler = (handler, scrollBarWidth) => {
    switch (handler) {
      case 'enable':
        // Remove scrollBarWidth to paddingRight property to the bodyRef prop if it exists, otherwise add it to
        // a div with an id equal to 'root', otherwise add it to body.
        if (this.props.bodyRef) {
          const el = this.props.bodyRef
          el.style.paddingRight = null
        } else if (document.getElementById('root')) {
          document.getElementById('root').style.paddingRight = null
        } else {
          document.body.style.paddingRight = null
        }
        break
      case 'disable':
        // Add scrollBarWidth to paddingRight property to the bodyRef prop if it exists, otherwise add it to
        // a div with an id equal to 'root', otherwise add it to body.
        if (this.props.bodyRef) {
          const el = this.props.bodyRef
          el.style.paddingRight = [scrollBarWidth, 'px'].join('')
        } else if (document.getElementById('root')) {
          console.log(document.getElementById('root'))
          document.getElementById('root').style.paddingRight = [scrollBarWidth, 'px'].join('')
        } else {
          document.body.style.paddingRight = [scrollBarWidth, 'px'].join('')
        }
        break
      default:
        // do nothing
    }
  }

  bodyScrollHandler = (handler) => {
    switch (handler) {
      case 'enable':
        // Remove overflow null to unlock body scroll
        document.body.style.overflow = null
        // Enabling mobile scrolling or removing ESC key event listener.
        if (this.isMobile) {
          this.mobileScrollHandler(handler)
        } else {
          document.removeEventListener('keydown', this.escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldAvoidContentJump is false.
          if (!this.props.shouldAvoidContentJump) {
            this.contentJumpHandler(handler)
          }
        }
        break
      case 'disable':
        const documentWidth = document.documentElement.clientWidth
        const windowWidth = window.innerWidth
        const scrollBarWidth = windowWidth - documentWidth
        // Add overflow hidden to lock body scroll
        document.body.style.overflow = 'hidden'
        // Disabling mobile scrolling or adding ESC key event listener.
        if (this.isMobile) {
          this.mobileScrollHandler(handler)
        } else {
          document.addEventListener('keydown', this.escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldAvoidContentJump is false.
          if (!this.props.shouldAvoidContentJump) {
            this.contentJumpHandler(handler, scrollBarWidth)
          }
        }
        break
      default:
        // do nothing
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  componentDidUpdate (prevProps) {
    // To prevent scrolling when the modal is open
    if (this.props.show) {
      this.bodyScrollHandler('disable')
    // Only remove overflow null when unmounting modal
    } else if ((prevProps.show !== this.props.show) && !this.props.show) {
      this.bodyScrollHandler('enable')
    }
  }

  // Removing body scroll lock on unmount
  componentWillUnmount() {
    this.bodyScrollHandler('enable')
  }

  render() {
    const noCancel = this.props.alwaysShow
    return (
      <div className={this.props.show ? classes.BodyOverlay : classes.Null} >
        <div onClick={this.props.closeModal} className={this.props.show ? classes.ModalWrapper : null} >
          <div className={this.props.show ? classes.ModalContainer : null} >
            <div
              // Stopping propagation to stop the ModalWrapper closeModal execution from triggering upon
              // interacting with the modal's children elements.
              onClick={(e) => { e.stopPropagation() }}
              style={{
                visibility: this.props.show ? 'visible' : 'hidden',
                transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0',
                maxWidth: this.props.maxWidth ? [this.props.maxWidth, 'px'].join('') : null,
                // Transparent or background styling
                border: this.props.transparent ? 0
                  : (this.props.border ? this.props.border : null),
                background: this.props.transparent ? 'none'
                  // Background styling, if passed as props.
                  : (this.props.background ? this.props.background : null)
              }}
              className={this.props.className ? this.props.className : classes.Modal}>
              {noCancel ? null
                : (
                  <div className={classes.CloseButtonWrapper}>
                    <button
                      type='button'
                      onClick={this.props.toggleModal}
                      className={classes.CancelButton}
                      aria-busy='false' >
                      <Cancel fill={this.props.transparent ? '#FFF' : null} />
                    </button>
                  </div>
                )}
              <section>
                {this.props.children}
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
