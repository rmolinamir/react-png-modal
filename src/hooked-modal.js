import React, { useState, useEffect, useMemo } from 'react'
import propTypes from 'prop-types'
// Worker function
import { isMobile } from './is-mobile'
// CSS
import classes from './Modal.css'
// JSX
import Cancel from './cancel'

/**
 * Hook component
 */
const modal = (props) => {
  const [pageYOffset, setPageYOffset] = useState(null)
  const [bIsMobile] = useState(isMobile())

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      // Close modal when esc is pressed
      props.closeModal()
    }
  }

  const mobileScrollHandler = (handler) => {
    switch (handler) {
      case 'enable':
        // Enabling mobile scrolling
        document.body.style.position = null
        document.body.style.top = null
        document.body.style.width = null
        window.scrollTo(0, pageYOffset)
        break
      case 'disable':
        const YOffset = window.pageYOffset
        document.body.style.top = `-${YOffset}px`
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        setPageYOffset(YOffset)
        break
      default:
        // do nothing
    }
  }

  const contentJumpHandler = (handler) => {
    switch (handler) {
      case 'enable':
        const documentWidth = document.documentElement.clientWidth
        const windowWidth = window.innerWidth
        const scrollBarWidth = windowWidth - documentWidth
        // Add scrollBarWidth to paddingRight property to the bodyRef prop if it exists, otherwise add it to
        // a div with an id equal to 'root', otherwise add it to body.
        if (props.bodyRef) {
          props.bodyRef.style.paddingRight = scrollBarWidth
        } else if (document.getElementById('root')) {
          document.getElementById('root').style.paddingRight = scrollBarWidth
        } else {
          document.body.style.paddingRight = scrollBarWidth
        }
        break
      case 'disable':
        // Remove scrollBarWidth to paddingRight property to the bodyRef prop if it exists, otherwise add it to
        // a div with an id equal to 'root', otherwise add it to body.
        if (props.bodyRef) {
          props.bodyRef.style.paddingRight = null
        } else if (document.getElementById('root')) {
          document.getElementById('root').style.paddingRight = null
        } else {
          document.body.style.paddingRight = null
        }
        break
      default:
        // do nothing
    }
  }

  const bodyScrollHandler = (handler) => {
    switch (handler) {
      case 'enable':
        // Remove overflow null to unlock body scroll
        document.body.style.overflow = null
        // Enabling mobile scrolling or removing ESC key event listener.
        if (bIsMobile) {
          mobileScrollHandler(handler)
        } else {
          document.removeEventListener('keydown', escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldAvoidContentJump is false.
          if (!props.shouldAvoidContentJump) {
            contentJumpHandler(handler)
          }
        }
        break
      case 'disable':
        // Add overflow hidden to lock body scroll
        document.body.style.overflow = 'hidden'
        // Disabling mobile scrolling or adding ESC key event listener.
        if (bIsMobile) {
          mobileScrollHandler(handler)
        } else {
          document.addEventListener('keydown', escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldAvoidContentJump is false.
          if (!props.shouldAvoidContentJump) {
            contentJumpHandler(handler)
          }
        }
        break
      default:
        // do nothing
    }
  }

  // Similar to componentWillUnmount.
  useEffect(() => {
    /**
     * returns in useEffect hooks are known as cleanups. They execute when
     * the component will unmount or just before useEffect is executed AFTER
     * the first time. This cleanup will remove the body scroll lock.
     */
    return () => {
      bodyScrollHandler('enable')
    }
  }, [])

  // Similar to componentDidUpdate. Watches for changes of prop.show
  useEffect(() => {
    // To prevent scrolling when the modal is open
    if (props.show && document.body.style.overflow !== 'hidden') {
      bodyScrollHandler('disable')
    // Only remove overflow null when dismounting modal
    } else if (!props.show && document.body.style.overflow === 'hidden') {
      bodyScrollHandler('enable')
    }
  }, [props.show])

  const noCancel = props.alwaysShow
  return (
    // Similar to shouldComponentUpdate, useMemo will watch for changes in props.show and props.children.
    useMemo(() => {
      return (
        <div className={props.show ? classes.BodyOverlay : classes.Null} >
          <div onClick={props.closeModal} className={props.show ? classes.ModalWrapper : null} >
            <div className={props.show ? classes.ModalContainer : null} >
              <div
                // Stopping propagation to stop the ModalWrapper closeModal execution from triggering upon
                // interacting with the modal's children elements.
                onClick={(e) => { e.stopPropagation() }}
                style={{
                  visibility: props.show ? 'visible' : 'hidden',
                  transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                  opacity: props.show ? '1' : '0',
                  maxWidth: props.maxWidth ? [props.maxWidth, 'px'].join('') : null,
                  // Transparent or background styling
                  border: props.transparent ? 0
                    : (props.border ? props.border : null),
                  background: props.transparent ? 'none'
                    // Background styling, if passed as props.
                    : (props.background ? props.background : null)
                }}
                className={props.className ? props.className : classes.Modal}>
                {noCancel ? null
                  : (
                    <div className={classes.CloseButtonWrapper}>
                      <button
                        type='button'
                        onClick={props.toggleModal}
                        className={classes.CancelButton}
                        aria-busy='false' >
                        <Cancel fill={props.transparent ? '#FFF' : null} />
                      </button>
                    </div>
                  )}
                <section>
                  {props.children}
                </section>
              </div>
            </div>
          </div>
        </div>
      )
    }, [props.show, props.children])
  )
}

modal.propTypes = {
  closeModal: propTypes.func,
  toggleModal: propTypes.func,
  show: propTypes.bool.isRequired,
  className: propTypes.any,
  children: propTypes.any,
  maxWidth: propTypes.number,
  // Reference to element to modify its paddingRight when the scrollbar disappears
  bodyRef: propTypes.element,
  // shouldAvoidContentJump boolean that prevents contentJump function from executing if true.
  shouldAvoidContentJump: propTypes.bool,
  // This property will prevent the cancel button from being rendered.
  // I assume the modal won't receive toggleModal nor closeModal functionalities from being passed.
  // e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when
  // alwaysShow turns false.
  alwaysShow: propTypes.bool,
  // Removes border and background from the modal. The cancel button turns white.
  transparent: propTypes.bool,
  // Modal background styling, transparent styling takes priority over background styling.
  background: propTypes.string,
  // Border background styling, transparent styling takes priority over border styling.
  border: propTypes.string
}

export default modal
