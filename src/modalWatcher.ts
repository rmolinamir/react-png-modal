import { isMobile } from './isMobile'
import Modal, { IModalProps} from './Modal'

export enum EModalHandlers {
  ENABLE,
  DISABLE
}

interface IModalReferences {
  props?: IModalProps
}

class ModalWatcher {
  /**
   * Member variable that will store the ModalWatcher instance.
   */
  private static instance: ModalWatcher;

  /**
   * Object storing all of the modal component references (access to state and props).
   */
  private modalReferences:IModalReferences = {}

  /**
   * Array that holds the ID of every opened modal. Also used to determine all active modals.
   */
  private openModals: string[] = []

  /**
   * `pageYOffset` needed to scroll the user after a modal closes on mobile.
   */
  private pageYOffset = 0

  /**
   * Determines if the user is on a mobile device.
   */
  private isMobile = isMobile()

  /**
   * Read only property that can not be modified nor accessed outside of the class.
   */
  private constructor() {}

  /**
   * If get instance has not been initialized then it will construct a new ModalWatcher class object,
   * then store it into the instance property. If it has already been created then it will simply
   * return the instance property.
   * This assures that there will only ever be one instance of the watcher.
   */
  static getInstance() {
    if (!ModalWatcher.instance) {
      ModalWatcher.instance = new ModalWatcher();
    }
    return ModalWatcher.instance;
  }

  /**
   * Set the modal ID on `ComponentDidMount` for every modal.
   */
  public setModal (id:string, modalRef?: Modal) {
    if (modalRef) {
      this.modalReferences[id] = modalRef
    }
  }

  /**
   * Remove the modal ID on `ComponentWillUnmount` for every modal.
   */
  public removeModal (isOpen:boolean, id:string) {
    if (isOpen) {
      this.bodyScrollHandler(id, EModalHandlers.ENABLE)
    }
    delete this.modalReferences[id]
  }

  /**
   * Basically a worker function. Adds ID to the `openModals` array list, or removes them depending on the handler,
   * and handles the `zIndex` by executing the `zIndexHandler` helper.
   */
  public openModalsHandler (handler: EModalHandlers, id: string): void {
    this.zIndexHandler(handler, id)
    switch (handler) {
      case EModalHandlers.ENABLE:
        this.openModals.pop()
        break
      case EModalHandlers.DISABLE:
        this.openModals.push(id)
        break
    }
  }

  /**
   * Handles the `zIndex` modal CSS style properties depending on:
   *  1. IF **there is more than 1 open modal** then:
   *    1. If the modal is open, then it will add the `length` of the `openModals` array to the zIndex,
   *    2. Otherwise, set the CSS style property as `null`.
   *  2. If **there are no more than 1 open modals**, then do nothing and return void.
   */
  private zIndexHandler = (handler: EModalHandlers, id: string): void => {
    if (this.openModals.length) {
      const modal:React.RefObject<HTMLDivElement> = this.modalReferences[id].myModal
      let zIndex: string | null
      if (modal.current) {
        zIndex = modal.current.style.zIndex || '2000'
      } else {
        zIndex = '2000'
      }
      switch (handler) {
        case EModalHandlers.ENABLE:
          zIndex = null
          break
        case EModalHandlers.DISABLE:
          zIndex = (+zIndex + this.openModals.length).toString()
          break
      }
      if (modal.current) {
        modal.current.style.zIndex = zIndex
      }
    }
  }

  /**
   * The main function that handles body scrolling.
   * If enabling (`EModalHandlers.ENABLE`) the body scroll, then release the lock.
   * Else, if disabling (`EModalHandlers.DISABLE`) the body scroll, then lock the scroll. 
   */
  public bodyScrollHandler = (id:string, handler: EModalHandlers) => {
    const modal = this.modalReferences[id]
    switch (handler) {
      case EModalHandlers.ENABLE:
        this.openModalsHandler(handler, id)
        /**
         * The body will only be unlocked when `openModals` array's length is at 0.
         * Being at 0 means the last modal opened was hidden.
         */
        if (this.openModals.length === 0) {
          /**
           * The body scroll will be unlocked, here we:
           * 1. Set the document.body overflow as `null`.
           * If on mobile:
           *  2. Disable the scroll lock that works on mobile devices.
           * Else:
           *  3. Remove the ESC key event listener that closes the modal.
           *  4. Disable the scroll lock for desktop devices.
           *  5. Restore the body styling back to normal due to the `contentJumpHandler` added CSS.
           */
          document.body.style.overflow = null
          if (this.isMobile) {
            this.mobileScrollHandler(handler)
          } else {
            document.removeEventListener('keydown', this.escFunction, false)
            /**
             * Prevents content from jumping when the scroll bar disappears if shouldContentJump is false.
             */
            if (!modal.props.shouldContentJump) {
              this.contentJumpHandler(handler, modal.props.bodyRef)
            }
          }
        }
        break
      case EModalHandlers.DISABLE:
        this.openModalsHandler(handler, id)
        /**
         * The body will only be locked ONLY when the `openModals` array's length is equal to 1,
         * meaning that **it will only run when the first Modal is mounted**.
         * Being at 1 means the a modal just mounted.
         */
        if (this.openModals.length === 1) {
          const documentWidth = document.documentElement.clientWidth
          const windowWidth = window.innerWidth
          const scrollBarWidth = windowWidth - documentWidth
          /**
           * The body scroll will be locked, here we:
           * 1. Calculate the width of the page scrollBar.
           * 2. Set the document.body overflow as `hidden`.
           * If on mobile:
           *  3. Enable the the scroll lock that works on mobile devices.
           * Else:
           *  3. Add the ESC key event listener that closes the modal.
           *  4. Enable the scroll lock for desktop devices.
           *  5. Disable parasitic page jump when the modal opens, since the body scrollbar is hidden
           *     because of the overflow.
           */
          document.body.style.overflow = 'hidden'
          if (this.isMobile) {
            this.mobileScrollHandler(handler)
          } else {
            document.addEventListener('keydown', this.escFunction, false)
            if (!modal.props.shouldContentJump) {
              this.contentJumpHandler(handler, modal.props.bodyRef, scrollBarWidth)
            }
          }
        }
        break
    }
  }

  /**
   * The `escFunction` closes the **currently active modal, which is always the last item in the `openModals` array**.
   * Since the ID's of the modal are stored, we use these as a `pointer` to the modal class inside the `modalReferences`
   * object, then execute the respective `closeModal` props.
   */
  private escFunction = (event: KeyboardEvent) => {
    if (event.keyCode === 27) {
      const activeModalId = this.openModals[this.openModals.length - 1]
      const activeModal = this.modalReferences[activeModalId]
      if (activeModal.props) {
        if (activeModal.props.closeModal) {
          activeModal.props.closeModal()
        }
      }
    }
  }

  /**
   * Applies CSS styling that works on mobile devices, it's necessary for it to work on mobile.
   */
  private mobileScrollHandler = (handler: EModalHandlers) => {
    switch (handler) {
      case EModalHandlers.ENABLE:
        document.body.style.position = null
        document.body.style.top = null
        document.body.style.width = null
        window.scrollTo(0, this.pageYOffset)
        break
      case EModalHandlers.DISABLE:
        const pageYOffset = window.pageYOffset
        document.body.style.top = `-${pageYOffset}px`
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        this.pageYOffset = pageYOffset
        break
    }
  }

  private contentJumpHandler = (handler: EModalHandlers, bodyRef?: HTMLElement, scrollBarWidth:number = 0) => {
    /**
     * Adds or removes the `scrollBarWidth` to the `paddingRight` CSS property 
     * from the `bodyRef` prop if it exists, otherwise remove it 
     * from the `#root` div, else, remove the styles from the `body` tag.
     */
    let ref: HTMLElement | HTMLElement = document.body;
    if (bodyRef) {
      ref = bodyRef
    } else if (document.getElementById('root')) {
      const rootEl = document.getElementById('root')
      if (rootEl) {
        ref = rootEl
      }
    }
    switch (handler) {
      case EModalHandlers.ENABLE:
        ref.style.paddingRight = null
        break
      case EModalHandlers.DISABLE:
        ref.style.paddingRight = `${scrollBarWidth}px`
        break
    }
  }

}

export const modalWatcher = ModalWatcher.getInstance();