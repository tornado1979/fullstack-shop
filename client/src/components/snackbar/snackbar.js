import React, { Component } from 'react'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import { withStyles /* , MuiThemeProvider, createMuiTheme, withTheme */} from '@material-ui/core/styles'
import classNames from 'classnames'

import { hideSnackBar } from '../snackbar/actionCreators/snackbar.actionCreators'

/*
const theme = createMuiTheme({
  overrides: {
    MuiSnackbar: { // Name of the component ⚛️ / style sheet
      root: { // Name of the rule
        color: 'red', // Some CSS
      },
    },
  },
}) */

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const styles1 = theme => ({
  success: {
    backgroundColor: 'green',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: 'orange',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})


class WrapperSnackBar extends Component {
  handleClose = () => {
    this.props.closeSnackBar()
  }

  render() {
    console.log('properties', this.props)
    const {
      className,
      classes,
      variant,
    } = this.props

    const Icon = variantIcon[variant]

    return (
      <Snackbar
        action={[
          <IconButton
            aria-label="Close"
            color="inherit"
            key="close"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        autoHideDuration={6000}
        className={classNames(classes[variant], className)}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={
          <span className={classes.message} id="client-snackbar" >
            <Icon className={classNames(classes.icon, classes.iconVariant)} />
            {this.props.message}
          </span>}
        onClose={this.handleClose}
        open={this.props.open}
      />
    )
  }
}

WrapperSnackBar.propTypes = {
  className: propTypes.string, // eslint-disable-line
  classes: propTypes.shape().isRequired,
  closeSnackBar: propTypes.func.isRequired,
  message: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
  variant: propTypes.oneOf(['success', 'warning', 'error', 'info']),
}

WrapperSnackBar.defaultProps = {
  variant: 'info',
}

const emptyMessage = {
  message: '',
  open: false,
  variant: 'info',
}

const mapDispatchToProps = dispatch => bindActionCreators({
  closeSnackBar: () => dispatch(hideSnackBar(emptyMessage)),
}, dispatch)

export default connect(null, mapDispatchToProps)(withStyles(styles1)(WrapperSnackBar))
