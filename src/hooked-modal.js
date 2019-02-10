import React, { useState, useEffect, useMemo } from 'react'
// Worker function
import { isMobile } from './is-mobile'
import { clearSelection } from './clear-selection'
// CSS
import classes from './Modal.css'
// JSX
import Cancel from './cancel'

/**
 * Hook component
 */
const modal = (props) => {
  const [pageYOffset, setPageYOffset] = useState(null)

  const escFunction = (e) => {
    if (e.keyCode === 27) {
      // Close modal when esc is pressed
      props.closeModal()
    }
  }

  const onHandleMobileScroll = (handler) => {
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

  // Similar to componentWillUnmount.
  useEffect(() => {
    /**
     * returns in useEffect hooks are known as cleanups. They execute when
     * the component hill unmount or just before useEffect is executed AFTER
     * the first time. This cleanup will remove the body scroll lock.
     */
    return () => {
      document.removeEventListener('keydown', escFunction, false)
      document.body.style.overflow = null
      // Enabling mobile scrolling
      if (isMobile()) {
        onHandleMobileScroll('enable')
      }
    }
  }, [])

  // Similar to componentDidUpdate. Watches for changes of prop.show
  useEffect(() => {
    // To prevent scrolling when the modal is open
    if (props.show && document.body.style.overflow !== 'hidden') {
      document.addEventListener('keydown', escFunction, false)
      document.body.style.overflow = 'hidden'
      // Disabling mobile scrolling
      if (isMobile()) {
        onHandleMobileScroll('disable')
      }
    // Only remove overflow null when dismounting modal
    } else if (!props.show && document.body.style.overflow === 'hidden') {
      document.removeEventListener('keydown', escFunction, false)
      document.body.style.overflow = null
      // Clears document selection
      clearSelection()
      // Enabling mobile scrolling
      if (isMobile()) {
        onHandleMobileScroll('enable')
      }
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

export default modal
