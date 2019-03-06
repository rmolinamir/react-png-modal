import * as React from 'react'
const { useState, useEffect, useMemo } = React
// Worker function
import { isMobile } from './is-mobile'
// CSS
import classes from './Modal.css'
// JSX
import Cancel from './cancel'

interface IModalProps {
  closeModal: () => void
  show: boolean
  className: string
  children: React.ReactNode
  maxWidth: number
  // Reference to element to modify its paddingRight when the scrollbar disappears
  bodyRef: React.RefObject<HTMLBaseElement>
  // shouldContentJump boolean that prevents contentJump function from executing if true.
  shouldContentJump: boolean
  // This property will prevent the cancel button from being rendered.
  // I assume the modal won't receive closeModal functionalities from being passed.
  // e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when
  // alwaysShow turns false.
  alwaysShow: boolean
  // Removes border and background from the modal. The cancel button turns white.
  transparent: boolean
  // Modal background styling, transparent styling takes priority over background styling.
  background: string
  // Border background styling, transparent styling takes priority over border styling.
  border: string
}

enum EHandlers {
  ENABLE,
  DISABLE
}

// enum EModalStyles {
//   SHOW = {
//     visibility: bShouldMount ? 'visible' : 'hidden',
//     transform: bShouldMount ? 'translateY(0)' : 'translateY(-100vh)',
//     opacity: bShouldMount ? 1 : 0,
//     maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined,
//     // Transparent or background styling
//     border: props.transparent ? 0
//       : (props.border ? props.border : undefined),
//     background: props.transparent ? 'none'
//       // Background styling, if passed as props.
//       : (props.background ? props.background : undefined)
//   }
//   HIDE = {
//     visibility: 'hidden',
//     transform: 'translateY(-100vh)',
//     opacity: bShouldMount ? 1 : 0,
//     maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined,
//     // Transparent or background styling
//     border: props.transparent ? 0
//       : (props.border ? props.border : undefined),
//     background: props.transparent ? 'none'
//       // Background styling, if passed as props.
//       : (props.background ? props.background : undefined)
//   }
// }

/**
 * Hook component
 */
const modal = (props: IModalProps) => {
  const [bIsMobile] = useState<boolean>(isMobile())

  const [bDidMount, setDidMount] = useState<boolean>(props.alwaysShow)
  const [bShouldMount, setShouldMount] = useState<boolean>(props.alwaysShow)
  const [bShouldUnmount, setShouldUnmount] = useState<boolean>(false)
  const [UnmountTimeout, setUnmountTimeout] = useState()

  const [wrapperClass, setWrapperClass] = useState<string>(classes.Null)
  const [pageYOffset, setPageYOffset] = useState<number>(0)

  const transformDuration = 500

  const escFunction = (event: KeyboardEvent): void => {
    if (event.keyCode === 27) {
      // Close modal when esc is pressed
      props.closeModal()
    }
  }

  const mobileScrollHandler = (handler: EHandlers) => {
    switch (handler) {
      case EHandlers.ENABLE:
        // Enabling mobile scrolling
        document.body.style.position = null
        document.body.style.top = null
        document.body.style.width = null
        window.scrollTo(0, pageYOffset)
        break
      case EHandlers.DISABLE:
        const YOffset = window.pageYOffset
        document.body.style.top = `-${YOffset}px`
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        setPageYOffset(YOffset)
        break
    }
  }

  const contentJumpHandler = (handler: EHandlers, scrollBarWidth?: number) => {
    switch (handler) {
      case EHandlers.ENABLE:
        // Remove scrollBarWidth to paddingRight property to the bodyRef prop if it exists, otherwise add it to
        // a div with an id equal to 'root', otherwise add it to body.
        if (props.bodyRef) {
          if (props.bodyRef.current) {
            props.bodyRef.current.style.paddingRight = null
          }
        } else if (document.getElementById('root')) {
          const rootEl = document.getElementById('root')
          if (rootEl) {
            rootEl.style.paddingRight = null
          }
        } else {
          document.body.style.paddingRight = null
        }
        break
      case EHandlers.DISABLE:
        // Add scrollBarWidth to paddingRight property to the bodyRef prop if it exists, otherwise add it to
        // a div with an id equal to 'root', otherwise add it to body.
        if (props.bodyRef) {
          if (props.bodyRef.current) {
            props.bodyRef.current.style.paddingRight = [scrollBarWidth, 'px'].join('')
          }
        } else if (document.getElementById('root')) {
          const rootEl = document.getElementById('root')
          if (rootEl) {
            rootEl.style.paddingRight = [scrollBarWidth, 'px'].join('')
          }
        } else {
          document.body.style.paddingRight = [scrollBarWidth, 'px'].join('')
        }
        break
    }
  }

  const bodyScrollHandler = (handler: EHandlers) => {
    switch (handler) {
      case EHandlers.ENABLE:
        // Remove overflow null to unlock body scroll
        document.body.style.overflow = null
        // Enabling mobile scrolling or removing ESC key event listener.
        if (bIsMobile) {
          mobileScrollHandler(handler)
        } else {
          document.removeEventListener('keydown', escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldContentJump is false.
          if (!props.shouldContentJump) {
            contentJumpHandler(handler)
          }
        }
        break
      case EHandlers.DISABLE:
        const documentWidth = document.documentElement.clientWidth
        const windowWidth = window.innerWidth
        const scrollBarWidth = windowWidth - documentWidth
        // Add overflow hidden to lock body scroll
        document.body.style.overflow = 'hidden'
        // Disabling mobile scrolling or adding ESC key event listener.
        if (bIsMobile) {
          mobileScrollHandler(handler)
        } else {
          document.addEventListener('keydown', escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldContentJump is false.
          if (!props.shouldContentJump) {
            contentJumpHandler(handler, scrollBarWidth)
          }
        }
        break
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
      bodyScrollHandler(EHandlers.ENABLE)
      clearTimeout(UnmountTimeout)
    }
  }, [])

  // Similar to componentDidUpdate. Watches for changes of prop.show
  useEffect(() => {
    if (bDidMount) {
      if (!props.show) {
        setShouldMount(false)
        setUnmountTimeout(
          setTimeout(() => {
            console.log('inside setTimeout', transformDuration)
            console.log('bShouldUnmount', bShouldUnmount)
            setShouldUnmount(props.show)
            setWrapperClass(classes.Null)
            // To prevent scrolling when the modal is open
            if (!props.show && document.body.style.overflow === 'hidden') {
              bodyScrollHandler(EHandlers.ENABLE)
            }
          }, transformDuration)
        )
      } else {
        setShouldMount(props.show)
        setWrapperClass(classes.Wrapper)
        clearTimeout(UnmountTimeout)
        // Only remove overflow null when dismounting modal
        if (props.show && document.body.style.overflow !== 'hidden') {
          bodyScrollHandler(EHandlers.DISABLE)
        } 
      }
    } else {
      setDidMount(true)
    }
  }, [props.show])

  console.log(wrapperClass)

  const noCancel = props.alwaysShow
  return (
    // Similar to shouldComponentUpdate, useMemo will watch for changes in props.show and props.children.
    useMemo(() => {
      return (
        <div className={wrapperClass} >
          <div onClick={props.closeModal} className={classes.Overlay} >
            <div className={classes.Container} >
              <div
                // Stopping propagation to stop the ModalWrapper closeModal execution from triggering upon
                // interacting with the modal's children elements.
                onClick={(e) => { e.stopPropagation() }}
                style={{
                  // visibility: bShouldMount ? 'visible' : 'hidden',
                  transitionDuration: `${transformDuration}ms`,
                  transform: bShouldMount ? 'translateY(0)' : 'translateY(-100vh)',
                  opacity: bShouldMount ? 1 : 0,
                  maxWidth: props.maxWidth ? `${props.maxWidth}px` : undefined,
                  // Transparent or background styling
                  border: props.transparent ? 0
                    : (props.border ? props.border : undefined),
                  background: props.transparent ? 'none'
                    // Background styling, if passed as props.
                    : (props.background ? props.background : undefined)
                }}
                className={[classes.Modal, props.className || classes.Aesthetics].join(' ')}>
                {noCancel ? null
                  : (
                    <div className={classes.Close}>
                      <button
                        type='button'
                        onClick={props.closeModal}
                        className={classes.CancelButton}
                        aria-busy='false' >
                        <Cancel />
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
    }, [props.show, props.children, bShouldMount, bShouldUnmount, wrapperClass])
  )
}

export default modal
