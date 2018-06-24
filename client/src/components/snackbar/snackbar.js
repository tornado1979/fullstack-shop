import React, { Component } from 'react'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { hideSnackBar } from '../snackbar/actionCreators/snackbar.actionCreators'

class WrapperSnackBar extends Component {
  handleClose = () => {
    this.props.closeSnackBar()
  }

  render() {
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
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.message}</span>}
        onClose={this.handleClose}
        open={this.props.open}
      />
    )
  }
}

WrapperSnackBar.propTypes = {
  message: propTypes.string.isRequired,
  open: propTypes.bool.isRequired,
}

WrapperSnackBar.propTypes = {
  closeSnackBar: propTypes.func.isRequired,
}

const newmessage = {
  message: null,
  open: false,
}

const mapDispatchToProps = dispatch => bindActionCreators({
  closeSnackBar: () => dispatch(hideSnackBar(newmessage)),
}, dispatch)

export default connect(null, mapDispatchToProps)(WrapperSnackBar)
