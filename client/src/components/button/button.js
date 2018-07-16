import React from 'react'
import propTypes from 'prop-types'

// material-ui
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

// We can inject some CSS into the DOM.
const styles = {
  button: {
    background: '#4CAF50',
    border: 0,
    borderRadius: 3,
    color: 'white',
    height: 48,
    padding: '0 30px',
    '&:hover': {
      background: 'blue',
    },
  },
}

const CustomButton = ({ classes, disabled, message }) => {
  return (
    <Button
      className={classes.button}
      disabled={disabled}
    >
      {message}
    </Button>
  )
}

CustomButton.propTypes = {
  classes: propTypes.shape().isRequired,
  disabled: propTypes.bool,
  message: propTypes.string.isRequired,
}
CustomButton.defaultProps = {
  disabled: true,
}

export default withStyles(styles)(CustomButton)
