import React from 'react'
import { TextField } from '@material-ui/core'
import propTypes from 'prop-types'

export const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  fullWidth = false,
  ...custom
} = {}) => {
  return (
    <TextField
      error={touched && error}
      fullWidth={fullWidth}
      label={((touched && error) && (`${label}-${error}`)) || label}
      multiline={custom.multiline}
      {...input}
      {...custom}
    />
  )
}

renderTextField.propTypes = {
  input: propTypes.shape().isRequired,
  label: propTypes.string.isRequired,
  meta: propTypes.shape().isRequired,
  custom: propTypes.shape().isRequired, //eslint-disable-line
}


export const renderSelectField = ({
  input,
  label,
  children,
  meta: { touched, error },
  fullWidth = false,
  ...custom
} = {}) => {
  return (
    <TextField
      error={touched && error}
      fullWidth={fullWidth}
      label={label}
      select
      {...input}
      onChange={(event) => {
        input.onChange(event.target.value)
        }
      }
      {...custom}
    >
      children={children}
    </TextField>
  )
}
