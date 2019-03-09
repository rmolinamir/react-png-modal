import React from 'react'
import propTypes from 'prop-types'
// CSS
import classes from './Example.module.css'
import Button from 'react-png-button'

const example = (props) => {
  return (
    <div className={classes.Example}>
      <h2 id={props.id} className={classes.Title}>{props.title}</h2>
      <div className={classes.Example}>
        {props.children}
      </div>
      <Button style={{ padding: '6px' }} button='primary' onClick={() => window.scrollTo(0, 0)}>Back to top</Button>
    </div>
  )
}

example.propTypes = {
  children: propTypes.any,
  id: propTypes.string,
  title: propTypes.string
}

export default example
