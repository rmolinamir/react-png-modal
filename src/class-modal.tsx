import * as React from 'react'
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
  // Unmount Animation Duration
  unmountDuration: number
}

interface IModalState {
  pageYOffset: number
  wrapperClassName: string
  bShouldUnmount: boolean
}

enum EHandlers {
  ENABLE,
  DISABLE
}

export default class Modal extends React.PureComponent<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props)
    this.escFunction = this.escFunction.bind(this)
    document.body.style.overflow = null
  }

  state = {
    pageYOffset: 0,
    wrapperClassName: this.props.show ? classes.Wrapper : classes.Null,
    bShouldUnmount: false
  }

  private UnmountTimeout: any = undefined
  
  private isMobile = isMobile()

  private unmountDuration = this.props.unmountDuration || 200

  private escFunction = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      // Close modal when esc is pressed
      this.props.closeModal()
    }
  }

  private mobileScrollHandler = (handler: EHandlers) => {
    switch (handler) {
      case EHandlers.ENABLE:
        // Enabling mobile scrolling
        document.body.style.position = null
        document.body.style.top = null
        document.body.style.width = null
        window.scrollTo(0, this.state.pageYOffset)
        break
      case EHandlers.DISABLE:
        const pageYOffset = window.pageYOffset
        document.body.style.top = `-${pageYOffset}px`
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        this.setState({
          pageYOffset: pageYOffset
        })
        break
    }
  }

  private contentJumpHandler = (handler: EHandlers, scrollBarWidth?: number) => {
    switch (handler) {
      case EHandlers.ENABLE:
        // Remove scrollBarWidth to paddingRight property to the bodyRef prop if it exists, otherwise add it to
        // a div with an id equal to 'root', otherwise add it to body.
        if (this.props.bodyRef) {
          if (this.props.bodyRef.current) {
            this.props.bodyRef.current.style.paddingRight = null
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
        if (this.props.bodyRef) {
          if (this.props.bodyRef.current) {
            this.props.bodyRef.current.style.paddingRight = `${scrollBarWidth}px`
          }
        } else if (document.getElementById('root')) {
          const rootEl = document.getElementById('root')
          if (rootEl) {
            rootEl.style.paddingRight = `${scrollBarWidth}px`
          }
        } else {
          document.body.style.paddingRight = `${scrollBarWidth}px`
        }
        break
    }
  }

  private bodyScrollHandler = (handler: EHandlers) => {
    switch (handler) {
      case EHandlers.ENABLE:
        // Remove overflow null to unlock body scroll
        document.body.style.overflow = null
        // Enabling mobile scrolling or removing ESC key event listener.
        if (this.isMobile) {
          this.mobileScrollHandler(handler)
        } else {
          document.removeEventListener('keydown', this.escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldContentJump is false.
          if (!this.props.shouldContentJump) {
            this.contentJumpHandler(handler)
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
        if (this.isMobile) {
          this.mobileScrollHandler(handler)
        } else {
          document.addEventListener('keydown', this.escFunction, false)
          // Prevents content from jumping when the scroll bar disappears if shouldContentJump is false.
          if (!this.props.shouldContentJump) {
            this.contentJumpHandler(handler, scrollBarWidth)
          }
        }
        break
    }
  }

  // shouldComponentUpdate(nextProps: IModalProps) {
  //   return nextProps.show !== this.props.show || nextProps.children !== this.props.children
  // }

  componentDidUpdate (prevProps: IModalProps) {
    if (this.props.show && this.state.wrapperClassName === classes.Null) {
      // Prevent scrolling when the modal component is open.
      this.bodyScrollHandler(EHandlers.DISABLE)
      clearTimeout(this.UnmountTimeout)
      // Setting the modal wrapper class.
      this.setState({
        wrapperClassName: classes.Wrapper
      })
    } else if ((prevProps.show !== this.props.show) && !this.props.show && this.state.wrapperClassName === classes.Wrapper) {
      this.UnmountTimeout = setTimeout(() => {
        console.log('inside setTimeout', this.unmountDuration)
        // Only remove overflow null when unmounting the modal component.
        if (!this.props.show && document.body.style.overflow === 'hidden') {
          this.bodyScrollHandler(EHandlers.ENABLE)
        }
        // Setting the modal wrapper class.
        this.setState({
          wrapperClassName: classes.Null
        })
      }, this.unmountDuration)
    }
  }

  // Removing body scroll lock on unmount and clearing timeout.
  componentWillUnmount() {
    this.bodyScrollHandler(EHandlers.ENABLE)
    clearTimeout(this.UnmountTimeout)
  }

  render() {
    const noCancel = this.props.alwaysShow
    return (
      <div className={this.state.wrapperClassName} >
        <div 
          onClick={this.props.closeModal} 
          className={classes.Overlay}
          style={{
            backgroundColor: this.props.show ? 'rgba(0,0,0,.55)' : 'unset',
            transitionDuration: `${this.unmountDuration}ms`
          }} >
          <div className={classes.Container} >
            <div
              // Stopping propagation to stop the ModalWrapper closeModal execution from triggering upon
              // interacting with the modal's children elements.
              onClick={(e) => { e.stopPropagation() }}
              // TODO MOUNTING ANIMATIONS
              style={{
                transform: this.props.show ? 'translateY(0)' : 'translateY(-15vh)',
                opacity: this.props.show ? 1 : 0,
                transitionDuration: `${this.unmountDuration}ms`,
                maxWidth: this.props.maxWidth ? `${this.props.maxWidth}px` : undefined,
                // Transparent or background styling
                border: this.props.transparent ? 0
                  : (this.props.border ? this.props.border : undefined),
                background: this.props.transparent ? 'none'
                  // Background styling, if passed as props.
                  : (this.props.background ? this.props.background : undefined)
              }}
              className={[classes.Modal, this.props.className || classes.Aesthetics].join(' ')}>
              {noCancel ? null
                : (
                  <div className={classes.CloseButtonWrapper}>
                    <button
                      type='button'
                      onClick={this.props.closeModal}
                      className={classes.CancelButton}
                      aria-busy='false' >
                      <Cancel />
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
