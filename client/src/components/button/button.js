import React from 'react'
import propTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

// We can inject some CSS into the DOM.
const styles = {
  button: {
    '&:hover': {
      background: 'blue',
    },
    background: '#4CAF50',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
}

const CustomButton = ({
  classes,
  disabled,
  handleClick,
  message,
}) => {
  return (
    <Button
      className={classes.button}
      disabled={disabled}
      onClick={handleClick}
    >
      {message}
    </Button>
  )
}

CustomButton.propTypes = {
  classes: propTypes.shape().isRequired,
  disabled: propTypes.bool,
  handleClick: propTypes.func.isRequired, // coming from e.g. order.js
  message: propTypes.string.isRequired,
}
CustomButton.defaultProps = {
  disabled: true,
}

export default withStyles(styles)(CustomButton)
