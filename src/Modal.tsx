import * as React from 'react'
// Worker functions
import { modalWatcher, EModalHandlers } from './modalWatcher'
import { idGenerator as setId } from './idGenerator'
// CSS
import classes from './Modal.css'
// JSX
import Portal from './Portal'
import Cancel from './Cancel'
import FocusTrap from 'react-focus-trap'

export interface IModalProps {
  closeModal: () => void
  className: string
  children: React.ReactElement
  /**
   * Determines if the Modal should be shown or hidden, the Modal is always mounted by default.
   */
  open: boolean
  /**
   * Reference to element to modify its paddingRight when the scrollbar disappears.
   */
  bodyRef: React.RefObject<HTMLBaseElement>
  /**
   * `shouldContentJump` boolean that prevents the `contentJump` `modalWatcher` function from executing if true.
   */
  shouldContentJump: boolean
  /**
   * This property will prevent the cancel button from being rendered.
   * I assume the modal won't receive `closeModal` functionalities being passed down.
   * e.g. Commonly used for modals while uploading data to a backend, the modal dismounts when
   * `alwaysShow` turns false, removed from the DOM while outside.
   */
  alwaysShow: boolean
  /**
   * Removes border and background from the modal. The cancel button turns white.
   */
  transparent: boolean
  /**
   * Centers the opened Modal.
   */
  center: boolean
  /**
   * Unmount animation duration.
   */
  animationDuration: number
}

export interface IModalState {
  pageYOffset: number
  wrapperClassName: string
  animationClassName: string
  bShouldUnmount: boolean
}

export default class Modal extends React.PureComponent<IModalProps, IModalState> {
  constructor(props: IModalProps) {
    super(props)
    document.body.style.overflow = null
  }

  state = {
    pageYOffset: 0,
    wrapperClassName: this.props.open ? classes.Wrapper : classes.Null,
    animationClassName: classes.TranslateY_Open,
    bShouldUnmount: false
  }

  private myModalId: string = setId()

  private UnmountTimeout: any = undefined
  
  private animationDuration = this.props.animationDuration || 200

  componentDidMount () {
    modalWatcher.setModal(this.myModalId, this)
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
      this.setState({
        wrapperClassName: classes.Wrapper,
        animationClassName: classes.TranslateY_Open
      })
    } else if ((prevProps.open !== this.props.open) && !this.props.open && this.state.wrapperClassName === classes.Wrapper) {
      /**
       * Setting the animation CSS class.
       */
      this.setState({
        animationClassName: classes.TranslateY_Close
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
    const noCancel = this.props.alwaysShow
    return (
      <Portal>
        <div className={this.state.wrapperClassName} >
          <div 
            onClick={this.props.closeModal} 
            className={classes.Overlay}
            style={{
              backgroundColor: this.props.open ? 'rgba(0,0,0,.7)' : 'unset',
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
                  <FocusTrap className={classes.Content} active={this.props.open}>
                      {this.props.children}
                  </FocusTrap>
                </section>
              </div>
            </div>
          </div>
        </div>
      </Portal>
    )
  }
}
