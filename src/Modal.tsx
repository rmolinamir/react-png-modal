import * as React from 'react'
// Worker functions
import { modalWatcher, EModalHandlers } from './modalWatcher'
import { idGenerator as setId } from './idGenerator'
// CSS
import classes from './Modal.css'
// JSX
import Portal from './Portal'
import Cancel from './Cancel'
import Content from './Content'
// import FocusTrap from 'react-focus-trap'

export interface IModalProps {
  children?: React.ReactElement | React.ReactNode
  /**
   * `closeModal` function that closes the modal.
   */
  closeModal: () => void
  /**
   * Custom CSS class for the modal content window.
   */
  className: string
  /**
   * Determines if the Modal should be shown or hidden, the Modal is always mounted by default.
   */
  open: boolean
  /**
   * Reference to element to modify its paddingRight when the scrollbar disappears.
   */
  bodyRef: HTMLElement
  /**
   * `shouldContentJump` boolean that prevents the `contentJump` `modalWatcher` function from executing if true.
   */
  shouldContentJump: boolean
  /**
   * This property will prevent the cancel button from being rendered and automatically open the modal.
   * I assume the modal won't receive `closeModal` functionalities being passed down.
   * e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when
   * `alwaysOpen` turns false, removed from the DOM from outside.
   */
  alwaysOpen: boolean
  /**
   * Removes border and background from the modal. The cancel button turns white.
   */
  transparent: boolean
  /**
   * Overlay's `background-color` CSS style property.
   */
  overlayColor: string
  /**
   * Vertically centers the opened modal.
   */
  center: boolean
  /**
   * Mounting and unmount animation duration.
   */
  animationDuration: number
  /**
   * The `animationClassName` prop will be used to decide which animations the modal will use during opening and closing.
   * If a string is passed then it will use one of the available (`fadeIn`, `translateX`, `translateY`) ones or fallback
   * to the default zoom-in and zoom-out, **otherwise** it a prop type `object` is passed, then it must contain the `open`
   * and `close` keys with their respective values as the class animations, for info check out the `Different Animations Modals`
   * example.
   */
  animationClassName: string | IAnimationClassNames
}

export interface IModalState {
  pageYOffset: number
  wrapperClassName: string
  animationClassName: string
  bShouldUnmount: boolean
}

interface IAnimationClassNames {
  open: string
  close: string
}

export default class Modal extends React.PureComponent<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props)
    const animationClassNames: IAnimationClassNames = this.animationClassHandler(props.animationClassName)
    this.animationClassNames = animationClassNames
    /**
     * `animationDuration` will be 250 by default.
     * If `animationDuration` is 0, then we have to check specifically for it.
     */
    this.animationDuration = this.props.animationDuration || (this.props.animationDuration === 0 ? 0 : 250)
    this.myModalId = setId()
    this.myModal = React.createRef()
    this.state = {
      pageYOffset: 0,
      wrapperClassName: this.props.open || this.props.alwaysOpen ? classes.Wrapper : classes.Null,
      animationClassName: animationClassNames.open,
      bShouldUnmount: false
    }
  }

  /**
   * Called inside the `constructor` function. This helper function will return an `IAnimationClassNames` object,
   * that contains the animations executed when the modal opens and closes.
   */
  private animationClassHandler = (className?: string | IAnimationClassNames): IAnimationClassNames => {
    /**
     * If `className` is of type `string`, meaning, the user wants a specific animation:
     */
    const defaultAnimations: IAnimationClassNames = { open: classes.Zoom_Open, close: classes.Zoom_Close }
    if (typeof className === 'string') {
      if (className) {
        className = className.toLowerCase()
      }
      switch (className) {
        case 'translatey': return { open: classes.TranslateY_Open, close: classes.TranslateY_Close }
        case 'translatex': return { open: classes.TranslateX_Open, close: classes.TranslateX_Close }
        case 'fadein': return { open: classes.FadeIn_Open, close: classes.FadeIn_Close }
        default:
          console.warn('No animation classes match your query. Defaulted to: ', defaultAnimations)
          return defaultAnimations
      }
    /**
     * If `className` is of type `IAnimationClassNames`.
     */
    } else {
      if (className) {
        return { ...className }
      } else {
        /**
         * Default case.
         */
        return defaultAnimations
      }
    }
  }

  private animationClassNames: IAnimationClassNames
  
  private animationDuration: number

  private myModalId: string

  private myModal: React.RefObject<HTMLDivElement>

  private UnmountTimeout: any = undefined

  /**
   * If the Modal starts with `this.props.open` equal `true`, then execute the `bodyScrollHandler`
   * to disable the scroll on `componentDidMount`.
   */
  componentDidMount () {
    modalWatcher.setModal(this.myModalId, this)
    if (this.props.open || this.props.alwaysOpen) {
      modalWatcher.bodyScrollHandler(this.myModalId, EModalHandlers.DISABLE)
    }
  }

  componentDidUpdate (prevProps: IModalProps) {
    if (this.props.open && this.state.wrapperClassName === classes.Null) {
      /**
       * Prevent scrolling when the modal component is open.
       */
      modalWatcher.bodyScrollHandler(this.myModalId, EModalHandlers.DISABLE)
      clearTimeout(this.UnmountTimeout)
      /**
       * Setting the mounting modal and animation CSS classes.
       */
      const animationClassName_Open = this.animationClassNames.open
      this.setState({
        wrapperClassName: classes.Wrapper,
        animationClassName: animationClassName_Open
      })
    } else if ((prevProps.open !== this.props.open) && !this.props.open && this.state.wrapperClassName === classes.Wrapper) {
      /**
       * Setting the animation CSS class.
       */
      const animationClassName_Close = this.animationClassNames.close
      this.setState({
        animationClassName: animationClassName_Close
      })
      /**
       * Timeout to let the animation play, then unmount modal, hide the modal, and release scroll lock.
       */
      this.UnmountTimeout = setTimeout(() => {
        if (!this.props.open) {
          modalWatcher.bodyScrollHandler(this.myModalId, EModalHandlers.ENABLE)
        }
        this.setState({
          wrapperClassName: classes.Null,
        })
      }, this.animationDuration)
    }
  }

  /**
   * When and if unmounted, remove the modal from the watcher list.
   * The watcher will remove any leftover event listeners, etc.
   * Also clearTimeout, if any.
   */
  componentWillUnmount() {
    modalWatcher.removeModal(this.myModalId)
    clearTimeout(this.UnmountTimeout)
  }

  render() {
    const noCancel = this.props.alwaysOpen
    return (
      <Portal domNode={this.props.bodyRef}>
        <div
          ref={this.myModal}
          className={this.state.wrapperClassName} >
          <div 
            onClick={this.props.closeModal} 
            className={classes.Overlay}
            style={{
              backgroundColor: (this.props.open || this.props.alwaysOpen) && this.props.overlayColor || undefined,
              transitionDuration: `${this.animationDuration}ms`,
              alignItems: this.props.center ? 'center' : undefined
            }} >
            <div className={classes.Container} >
              <div
                /**
                 * Stopping propagation to stop the ModalWrapper closeModal execution from triggering upon
                 * interacting with the modal's children elements.
                 */
                onClick={(e) => { e.stopPropagation() }}
                style={{
                  transitionDuration: `${this.animationDuration}ms`,
                  animationDuration: `${this.animationDuration}ms`,
                  /**
                   * Transparent  styling.
                   */
                  border: this.props.transparent ? 'none' : undefined,
                  background: this.props.transparent ? 'none' : undefined
                }}
                className={[
                  classes.Modal, 
                  this.props.className || classes.Aesthetics, 
                  this.state.animationClassName
                  ].join(' ')}>
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
                  <Content open={this.props.open}>
                    {this.props.children}
                  </Content>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}
