// Libraries
import React from 'react';

// CSS
import classes from '../react-png-modal.css';

// JSX
import FocusLock from 'react-focus-lock';

interface IContentProps {
  children?: React.ReactElement | React.ReactNode
  open: boolean
}

export default function Content(props: IContentProps) {
  return (
    <FocusLock disabled={!props.open} className={classes.Content}>
      {props.children}
    </FocusLock>
  );
}
