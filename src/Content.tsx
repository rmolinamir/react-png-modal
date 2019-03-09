import * as React from 'react'
// CSS
import classes from './Modal.css'
// JSX
import FocusLock from 'react-focus-lock'

interface IContentProps {
  children?: React.ReactElement | React.ReactNode
  open: boolean
}

const content = (props: IContentProps) => {
  return (
    <FocusLock disabled={!props.open} className={classes.Content}>
      {props.children}
    </FocusLock>
  )
}

export default content
