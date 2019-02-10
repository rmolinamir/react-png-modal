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
    show: PropTypes.bool,
    className: PropTypes.any,
    children: PropTypes.element,
    maxWidth: PropTypes.number,
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

  onHandleMobileScroll = (handler) => {
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

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  }

  componentDidUpdate (prevProps) {
    // To prevent scrolling when the modal is open
    if (this.props.show) {
      document.addEventListener('keydown', this.escFunction, false)
      document.body.style.overflow = 'hidden'
      // Disabling mobile scrolling
      if (isMobile()) {
        this.onHandleMobileScroll('disable')
      }
    // Only remove overflow null when dismounting modal
    } else if ((prevProps.show !== this.props.show) && !this.props.show) {
      document.removeEventListener('keydown', this.escFunction, false)
      document.body.style.overflow = null
      // Enabling mobile scrolling
      if (isMobile()) {
        this.onHandleMobileScroll('enable')
      }
    }
  }

  // Removing body scroll lock on dismount
  componentWillUnmount() {
    document.removeEventListener('keydown', this.escFunction, false)
    document.body.style.overflow = null
    // Enabling mobile scrolling
    if (isMobile()) {
      this.onHandleMobileScroll('enable')
    }
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
