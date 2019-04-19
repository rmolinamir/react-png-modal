import React, { useState } from 'react'
// CSS
import classes from './App.module.css'
// JSX
import Modal from 'react-png-modal'
import Button from 'react-png-button'
import Example from './Example/Example'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const App = () => {
  /**
   * default modal.
   */
  const [bDefaultModal, setDefaultModal] = useState(false)
  /**
   * Big modal.
   */
  const [bBigModal, setBigModal] = useState(false)
  /**
   * Centered modal.
   */
  const [bCenteredModal, setCenteredModal] = useState(false)
  /**
   * Multiple modals.
   */
  const [bMultipleModal1, setMultipleModal1] = useState(false)
  const [bMultipleModal2, setMultipleModal2] = useState(false)
  const [bMultipleModal3, setMultipleModal3] = useState(false)
  /**
   * Focus locked modal.
   */
  const [bFocusLockedModal, setFocusLockedModal] = useState(false)
  /**
   * Different animations modal.
   */
  const [bDifferentAnimationsModal1, setDifferentAnimationsModal1] = useState(false)
  const [bDifferentAnimationsModal2, setDifferentAnimationsModal2] = useState(false)
  const [bDifferentAnimationsModal3, setDifferentAnimationsModal3] = useState(false)
  /**
   * Custom CSS modal.
   */
  const [bCustomCSSModal, setCustomCSSModal] = useState(false)
  /**
   * Custom Overlay modal.
   */
  const [bOverlayModal, setOverlayModal] = useState(false)
  /**
   * Transparent modal.
   */
  const [bTransparentModal, setTransparentModal] = useState(false)
  /**
   * Custom Animation modal.
   */
  const [bCustomAnimationModal, setCustomAnimationModal] = useState(false)
  /**
   * Custom Animation Duration modal.
   */
  const [bCustomAnimationDurationModal, setCustomAnimationDurationModal] = useState(false)
  /**
   * "Always Open" modal.
   */
  const [bAlwaysOpenModal, setAlwaysOpenModal] = useState(false)
  /**
   * Should (Page) Content Jump modal.
   */
  const [bShouldContentJumpModal, setShouldContentJumpModal] = useState(false)
  /**
   * `bodyRef` modal.
   */
  const [bBodyRefModal, setBodyRefModal] = useState(false)

  const AlwaysOpenModalHandler = () => {
    setAlwaysOpenModal(true)
    setTimeout(() => {
      setAlwaysOpenModal(false)
    }, 6000)
  }

  return (
    <div className={classes.App}>
      <h1 className={classes.Title}>React Plug-N'-Go Modal</h1>
      <h2 className={classes.Header}>Examples</h2>
      <ul className={classes.List}>
        <li className={classes.Item}><a className={classes.Anchor} href='#default-modal'>Default modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#big-modal'>Big modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#centered-modal'>Centered modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#multiple-modals'>Multiple modals</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#focus-locked-modal'>Focus locked modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#different-animations modal'>Different animations modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#custom-css-modal'>Custom CSS modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#custom-overlay-modal'>Custom Overlay modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#transparent-modal'>Transparent modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#custom-animation-modal'>Custom Animation modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#custom-animation-duration-modal'>Custom Animation Duration modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#always-open-modal'>"Always Open" modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#should-content-jump-modal'>Should (Page) Content Jump modal</a></li>
        <li className={classes.Item}><a className={classes.Anchor} href='#bodyref-modal'>`bodyRef` modal</a></li>
      </ul>

      <Example title='Default Modal' id='default-modal'>
        <Modal
          closeModal={() => setDefaultModal(false)}
          open={bDefaultModal}>
          <h3>Default modal</h3>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </Modal>
        <Button onClick={() => setDefaultModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  closeModal={() => setDefaultModal(false)}
  open={bDefaultModal}>
  <h3>Default modal</h3>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='big-modal' title='Big Modal'>
        <Modal
          closeModal={() => setBigModal(false)}
          open={bBigModal}>
          <h3>Big modal</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique, velit a pellentesque condimentum, mauris ex elementum erat, sit amet laoreet leo velit sed enim. Curabitur pretium venenatis sapien vitae faucibus. Sed vitae justo a nisi gravida egestas. Pellentesque lacinia tellus arcu. Nullam non nunc in nunc fringilla vestibulum. Aliquam imperdiet eu enim vel porta. Aenean mollis, nulla sed auctor feugiat, elit enim convallis nibh, at dapibus quam velit quis leo. Proin placerat id nisl quis viverra. Praesent rutrum, massa at molestie porttitor, magna mi mollis dui, a semper sem libero eget risus. Etiam tincidunt, dolor id ultrices bibendum, metus nibh accumsan nisl, vitae sollicitudin sem nibh eu ex. Phasellus elementum dui eu libero pretium fermentum vel nec dolor. Maecenas feugiat, neque eget ultrices fermentum, augue ligula ultrices enim, nec pretium neque dui vitae leo. Sed vitae leo lacus. Quisque turpis urna, semper non sapien eu, scelerisque maximus nunc.
          </p>
          <p>
            Sed accumsan, turpis finibus lobortis finibus, dui justo tempus purus, eget posuere dui neque quis dolor. Pellentesque magna enim, dictum sed felis ut, venenatis mollis ante. Cras velit erat, malesuada eu elit vitae, dictum scelerisque quam. Nullam nec dolor risus. Proin eu porttitor eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nunc leo, condimentum sit amet orci at, sodales faucibus neque. Cras dolor odio, ultricies sed cursus et, fermentum vitae augue. Praesent dictum ullamcorper nunc, vel tempor lorem dictum in. Morbi eget sapien vel ex eleifend volutpat. Aliquam nec mauris lacus. Nunc egestas suscipit efficitur.
          </p>
          <p>
            Mauris vitae ipsum eget ipsum rhoncus pretium nec id dui. Ut gravida enim id lorem suscipit tincidunt vitae eget tortor. Maecenas elementum dui eu tortor tincidunt rutrum. Fusce feugiat libero a urna pharetra euismod. Proin eget turpis ut sapien tincidunt dictum quis in turpis. Nam sollicitudin quis diam at congue. Vestibulum pharetra nisi sit amet leo faucibus interdum. Phasellus nunc sapien, mollis vitae justo facilisis, gravida pretium urna. Mauris mauris arcu, sollicitudin eget tellus non, efficitur viverra tortor. Donec ac cursus nisl. In pulvinar condimentum neque sed congue.
          </p>
          <p>
            Etiam auctor elementum orci, ut lacinia ante finibus ut. In fermentum sodales tellus in tincidunt. Mauris sed quam cursus, iaculis lorem eget, lacinia lacus. Suspendisse potenti. Mauris eget nisl nec sem posuere dictum id sit amet ipsum. Sed luctus euismod mollis. Donec nec sem at lacus laoreet aliquet cursus sed nibh. Vestibulum congue velit vel erat mattis, ut rhoncus diam mattis. Nullam non leo consequat felis hendrerit iaculis in at ligula. Suspendisse neque est, faucibus sit amet sodales convallis, varius ac est. Aenean congue justo nec tellus tincidunt, in rutrum arcu aliquet. Suspendisse in tortor et urna aliquet iaculis et vitae velit. Vestibulum id congue quam.
          </p>
          <p>
            Ut non mollis elit. Integer volutpat eu dolor vel euismod. Nullam cursus dolor ut fringilla pulvinar. Duis eget massa eros. Nulla laoreet eleifend consequat. Proin eu tortor odio. Vivamus consequat velit dui, at sodales ante auctor et. Duis fermentum mattis porttitor. In sed orci sed libero tincidunt euismod. Maecenas est lectus, pharetra at volutpat in, sodales et leo.
          </p>
        </Modal>
        <Button onClick={() => setBigModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  closeModal={() => setBigModal(false)}
  open={bBigModal}>
  <h3>Big modal</h3>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique, velit a pellentesque condimentum, mauris ex elementum erat, sit amet laoreet leo velit sed enim. Curabitur pretium venenatis sapien vitae faucibus. Sed vitae justo a nisi gravida egestas. Pellentesque lacinia tellus arcu. Nullam non nunc in nunc fringilla vestibulum. Aliquam imperdiet eu enim vel porta. Aenean mollis, nulla sed auctor feugiat, elit enim convallis nibh, at dapibus quam velit quis leo. Proin placerat id nisl quis viverra. Praesent rutrum, massa at molestie porttitor, magna mi mollis dui, a semper sem libero eget risus. Etiam tincidunt, dolor id ultrices bibendum, metus nibh accumsan nisl, vitae sollicitudin sem nibh eu ex. Phasellus elementum dui eu libero pretium fermentum vel nec dolor. Maecenas feugiat, neque eget ultrices fermentum, augue ligula ultrices enim, nec pretium neque dui vitae leo. Sed vitae leo lacus. Quisque turpis urna, semper non sapien eu, scelerisque maximus nunc.
  </p>
  <p>
    Sed accumsan, turpis finibus lobortis finibus, dui justo tempus purus, eget posuere dui neque quis dolor. Pellentesque magna enim, dictum sed felis ut, venenatis mollis ante. Cras velit erat, malesuada eu elit vitae, dictum scelerisque quam. Nullam nec dolor risus. Proin eu porttitor eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nunc leo, condimentum sit amet orci at, sodales faucibus neque. Cras dolor odio, ultricies sed cursus et, fermentum vitae augue. Praesent dictum ullamcorper nunc, vel tempor lorem dictum in. Morbi eget sapien vel ex eleifend volutpat. Aliquam nec mauris lacus. Nunc egestas suscipit efficitur.
  </p>
  <p>
    Mauris vitae ipsum eget ipsum rhoncus pretium nec id dui. Ut gravida enim id lorem suscipit tincidunt vitae eget tortor. Maecenas elementum dui eu tortor tincidunt rutrum. Fusce feugiat libero a urna pharetra euismod. Proin eget turpis ut sapien tincidunt dictum quis in turpis. Nam sollicitudin quis diam at congue. Vestibulum pharetra nisi sit amet leo faucibus interdum. Phasellus nunc sapien, mollis vitae justo facilisis, gravida pretium urna. Mauris mauris arcu, sollicitudin eget tellus non, efficitur viverra tortor. Donec ac cursus nisl. In pulvinar condimentum neque sed congue.
  </p>
  <p>
    Etiam auctor elementum orci, ut lacinia ante finibus ut. In fermentum sodales tellus in tincidunt. Mauris sed quam cursus, iaculis lorem eget, lacinia lacus. Suspendisse potenti. Mauris eget nisl nec sem posuere dictum id sit amet ipsum. Sed luctus euismod mollis. Donec nec sem at lacus laoreet aliquet cursus sed nibh. Vestibulum congue velit vel erat mattis, ut rhoncus diam mattis. Nullam non leo consequat felis hendrerit iaculis in at ligula. Suspendisse neque est, faucibus sit amet sodales convallis, varius ac est. Aenean congue justo nec tellus tincidunt, in rutrum arcu aliquet. Suspendisse in tortor et urna aliquet iaculis et vitae velit. Vestibulum id congue quam.
  </p>
  <p>
    Ut non mollis elit. Integer volutpat eu dolor vel euismod. Nullam cursus dolor ut fringilla pulvinar. Duis eget massa eros. Nulla laoreet eleifend consequat. Proin eu tortor odio. Vivamus consequat velit dui, at sodales ante auctor et. Duis fermentum mattis porttitor. In sed orci sed libero tincidunt euismod. Maecenas est lectus, pharetra at volutpat in, sodales et leo.
  </p>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='centered-modal' title='Centered Modal'>
        <Modal
          center
          closeModal={() => setCenteredModal(false)}
          open={bCenteredModal}>
          <h3>Centered Modal</h3>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </Modal>
        <Button onClick={() => setCenteredModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  closeModal={() => setCenteredModal(false)}
  open={bCenteredModal}>
  <h3>Centered Modal</h3>
  <p>
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
  </p>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='multiple-modals' title='Multiple Modals'>
        <Modal
          center
          closeModal={() => setMultipleModal1(false)}
          open={bMultipleModal1}>
          <h3>Multiple Modal 1</h3>
          <p>
            Keep going!
          </p>
          <Modal
            center
            closeModal={() => setMultipleModal2(false)}
            open={bMultipleModal2}>
            <h3>Multiple Modal 2</h3>
            <p>
              This literally can go on forever...
            </p>
            <Modal
              center
              closeModal={() => setMultipleModal3(false)}
              open={bMultipleModal3}>
              <h3>Multiple Modal 3</h3>
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
              </p>
            </Modal>
            <Button onClick={() => setMultipleModal3(true)}>Open the modal</Button>
          </Modal>
          <Button onClick={() => setMultipleModal2(true)}>Open the modal</Button>
        </Modal>
        <Button onClick={() => setMultipleModal1(true)}>Open the first multiple modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  closeModal={() => setMultipleModal1(false)}
  open={bMultipleModal1}>
  <h3>Multiple Modal 1</h3>
  <p>
    Keep going!
  </p>
  <Modal
    center
    closeModal={() => setMultipleModal2(false)}
    open={bMultipleModal2}>
    <h3>Multiple Modal 2</h3>
    <p>
      This literally can go on forever...
    </p>
    <Modal
      center
      closeModal={() => setMultipleModal3(false)}
      open={bMultipleModal3}>
      <h3>Multiple Modal 3</h3>
      <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
      </p>
    </Modal>
    <Button onClick={() => setMultipleModal3(true)}>Open the modal</Button>
  </Modal>
  <Button onClick={() => setMultipleModal2(true)}>Open the modal</Button>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='focus-locked-modal' title='Focus-Locked Modal'>
        <Modal
          center
          closeModal={() => setFocusLockedModal(false)}
          open={bFocusLockedModal}>
          <h3>Focus-Locked Modal</h3>
          <p>
            Try tabbing to cycle through the focusable elements or shift+tabbing to go backwards. This can't be disabled.
          </p>
          <form>
            <div>
              <label>
                <div>Username</div>
                <input type='text' />
              </label>
            </div>
            <br />
            <div>
              <label>
                <div>Password</div>
                <input type='password' />
              </label>
            </div>
            <br />
            <button>Submit (not really)</button>
          </form>
        </Modal>
        <Button onClick={() => setFocusLockedModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  closeModal={() => setFocusLockedModal(false)}
  open={bFocusLockedModal}>
  <h3>Focus-Locked Modal</h3>
  <p>
    Try tabbing to cycle through the focusable elements or shift+tabbing to go backwards.
  </p>
  <form>
    <div>
      <label>
        <div>Username</div>
        <input type='text' />
      </label>
    </div>
    <br />
    <div>
      <label>
        <div>Password</div>
        <input type='password' />
      </label>
    </div>
    <br />
    <button>Submit (not really)</button>
  </form>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='different-animations modal' title='Different Animations Modal'>
        <p>
          Keep in mind that the default animation is the zoom-in & zoom-out you've seen so far, click the buttons below to check out all of the shipped animations.
        </p>
        <p>
          <Button button='danger' onClick={() => setDifferentAnimationsModal1(true)}><code className={classes.Code}>TranslateY</code></Button>
        </p>
        <p>
          <Button button='danger' onClick={() => setDifferentAnimationsModal2(true)}><code className={classes.Code}>TranslateX</code></Button>
        </p>
        <p>
          <Button button='danger' onClick={() => setDifferentAnimationsModal3(true)}><code className={classes.Code}>FadeIn</code></Button>
        </p>
        <p>
          <Button button='danger' onClick={() => setCenteredModal(true)}><code className={classes.Code}>Default</code></Button>
        </p>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  animationClassName={'TranslateY'}
  closeModal={() => setDifferentAnimationsModal1(false)}
  open={bDifferentAnimationsModal1}>
  <h3>TranslateY modal</h3>
  <p>
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
  </p>
</Modal>

<Modal
  center
  animationClassName={'TranslateX'}
  closeModal={() => setDifferentAnimationsModal2(false)}
  open={bDifferentAnimationsModal2}>
  <h3>TranslateX modal</h3>
  <p>
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
  </p>
</Modal>

<Modal
  center
  animationClassName={'FadeIn'}
  closeModal={() => setDifferentAnimationsModal3(false)}
  open={bDifferentAnimationsModal3}>
  <h3>FadeIn modal</h3>
  <p>
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
  </p>
</Modal>`}
        </SyntaxHighlighter>
        <Modal
          center
          animationClassName={'TranslateY'}
          closeModal={() => setDifferentAnimationsModal1(false)}
          open={bDifferentAnimationsModal1}>
          <h3>TranslateY modal</h3>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </Modal>
        <Modal
          center
          animationClassName={'TranslateX'}
          closeModal={() => setDifferentAnimationsModal2(false)}
          open={bDifferentAnimationsModal2}>
          <h3>TranslateX modal</h3>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </Modal>
        <Modal
          center
          animationClassName={'FadeIn'}
          closeModal={() => setDifferentAnimationsModal3(false)}
          open={bDifferentAnimationsModal3}>
          <h3>FadeIn modal</h3>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </Modal>
      </Example>

      <Example id='custom-css-modal' title='Custom CSS Modal'>
        <Modal
          center
          className={classes.CustomModal}
          closeModal={() => setCustomCSSModal(false)}
          open={bCustomCSSModal}>
          <h3>Custom CSS Modal</h3>
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
          </p>
        </Modal>
        <Button onClick={() => setCustomCSSModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  className={classes.CustomModal}
  closeModal={() => setCustomCSSModal(false)}
  open={bCustomCSSModal}>
  <h3>Custom CSS Modal</h3>
  <p>
    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
  </p>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='custom-overlay-modal' title='Custom Overlay Modal'>
        <Modal
          center
          className={classes.CustomModal}
          overlayColor='rgba(102, 205, 170, .7)'
          closeModal={() => setOverlayModal(false)}
          open={bOverlayModal}>
          <h3>Custom Overlay Modal</h3>
          <p>
            Remember it's a <em><strong><code style={{ fontSize: '1.2em' }}>background-color</code></strong></em> CSS style property type prop.
          </p>
        </Modal>
        <Button onClick={() => setOverlayModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  className={classes.CustomModal}
  overlayColor='rgba(102, 205, 170, .7)'
  closeModal={() => setOverlayModal(false)}
  open={bOverlayModal}>
  <h3>Custom Overlay Modal</h3>
  <p>
    Remember it's a <em><strong><code style={{ fontSize: '1.2em' }}>background-color</code></strong></em> CSS style property type prop.
  </p>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='transparent-modal' title='Transparent Modal'>
        <Modal
          transparent
          center
          overlayColor='rgba(102, 205, 170, .7)'
          closeModal={() => setTransparentModal(false)}
          open={bTransparentModal}>
          <img
            alt=''
            src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
        </Modal>
        <Button onClick={() => setTransparentModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  transparent
  center
  overlayColor='rgba(102, 205, 170, .7)'
  closeModal={() => setTransparentModal(false)}
  open={bTransparentModal}>
  <img
    alt=''
    src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='custom-animation-modal' title='Custom Animation Modal'>
        <Modal
          center
          transparent
          overlayColor='rgba(102, 205, 170, .7)'
          closeModal={() => setCustomAnimationModal(false)}
          animationClassName={{
            open: classes.CustomAnimation_Open,
            close: classes.CustomAnimation_Close
          }}
          open={bCustomAnimationModal}>
          <img
            alt=''
            src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
        </Modal>
        <Button onClick={() => setCustomAnimationModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  transparent
  overlayColor='rgba(102, 205, 170, .7)'
  closeModal={() => setCustomAnimationModal(false)}
  animationClassName={{
    open: classes.CustomAnimation_Open,
    close: classes.CustomAnimation_Close
  }}
  open={bCustomAnimationModal}>
  <img
    alt=''
    src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='custom-animation-duration-modal' title='Custom Animation Duration Modal'>
        <Modal
          center
          transparent
          overlayColor='rgba(102, 205, 170, .9)'
          className={classes.CustomModal2}
          closeModal={() => setCustomAnimationDurationModal(false)}
          animationDuration={2000}
          animationClassName={{
            open: classes.CustomAnimation_Open,
            close: classes.CustomAnimation_Close
          }}
          open={bCustomAnimationDurationModal}>
          <h3>Custom Animation Duration Modal</h3>
          <p>
            The current animation duration is set as 2000 milliseconds.
          </p>
          <img
            alt=''
            src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
        </Modal>
        <Button onClick={() => setCustomAnimationDurationModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  center
  transparent
  overlayColor='rgba(102, 205, 170, .9)'
  className={classes.CustomModal2}
  closeModal={() => setCustomAnimationDurationModal(false)}
  animationDuration={2000}
  animationClassName={{
    open: classes.CustomAnimation_Open,
    close: classes.CustomAnimation_Close
  }}
  open={bCustomAnimationDurationModal}>
  <h3>Custom Animation Duration Modal</h3>
  <p>
    The current animation duration is set as 2000 milliseconds.
  </p>
  <img
    alt=''
    src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example id='always-open-modal' title='"Always Open" Modal'>
        {bAlwaysOpenModal ? (
          <Modal
            alwaysOpen
            center
            transparent
            animationDuration={0}
            overlayColor='rgba(102, 205, 170, 1)'
            open={bAlwaysOpenModal}>
            <h3>Don't worry, the modal will automatically dismount in 6 seconds.</h3>
            <img
              style={{ width: '100%' }}
              alt=''
              src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
          </Modal>
        )
          : null}
        <Button onClick={AlwaysOpenModalHandler}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`{bAlwaysOpenModal ? (
  <Modal
    alwaysOpen
    center
    transparent
    animationDuration={0}
    overlayColor='rgba(102, 205, 170, 1)'
    open={bAlwaysOpenModal}>
    <h3>Don't worry, the modal will automatically dismount in 6 seconds.</h3>
    <img
      style={{ width: '100%' }}
      alt=''
      src={'https://media3.giphy.com/media/MDJ9IbxxvDUQM/giphy.gif?cid=3640f6095c820e41375938416f1ea2c3'} />
  </Modal>
)
  : null}`}
        </SyntaxHighlighter>
      </Example>

      <Example id='should-content-jump-modal' title='Should (Page) Content Jump Modal'>
        <Modal
          shouldContentJump
          closeModal={() => setShouldContentJumpModal(false)}
          open={bShouldContentJumpModal}>
          <h3>Should (Page) Content Jump modal</h3>
          <p>
            <strong><em>shouldContentJump</em></strong> is automatically disabled on mobile, no scroll bar and all that... y'know.
          </p>
          <p>
            The <strong><em>shouldContentJump</em></strong> prop enables the parasitic jump, in case for some reason the programmer may want it.
          </p>
        </Modal>
        <Button onClick={() => setShouldContentJumpModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  shouldContentJump
  closeModal={() => setShouldContentJumpModal(false)}
  open={bShouldContentJumpModal}>
  <h3>Should (Page) Content Jump modal</h3>
  <p>
    The <strong><em>shouldContentJump</em></strong> prop enables the parasitic jump, in case for some reason the programmer may want it.
  </p>
</Modal>`}
        </SyntaxHighlighter>
      </Example>

      <Example title='`bodyRef` Modal' id='bodyref-modal'>
        <Modal
          bodyRef={document.body}
          closeModal={() => setBodyRefModal(false)}
          center
          open={bBodyRefModal}>
          <h3>`bodyRef` modal</h3>
          <p>
            Open your dev-tools and check how the modal is inside the `<strong>body</strong>` HTML element instead of being inside the `<strong>#root</strong>` element unlike the other modals.
          </p>
        </Modal>
        <Button onClick={() => setBodyRefModal(true)}>Open the modal</Button>
        <SyntaxHighlighter language='jsx' style={atomDark}>{`<Modal
  bodyRef={document.body}
  closeModal={() => setDefaultModal(false)}
  center
  open={bDefaultModal}>
  <h3>Default modal</h3>
</Modal>`}
        </SyntaxHighlighter>
      </Example>
    </div>
  )
}

export default App
