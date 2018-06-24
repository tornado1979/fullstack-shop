import React from 'react'
import propTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { TextField } from '@material-ui/core'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
} = {}) =>
  (<TextField
    errorText={touched && error}
    htmlText={label}
    {...input}
    {...custom}
  />)

renderTextField.propTypes = {
  input: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  meta: propTypes.shape().isRequired,
  custom: propTypes.array.isRequired, //eslint-disable-line
}

const renderSelectField = ({
  input,
  label,
  children,
  meta: { touched, error },
  ...custom
} = {}) => (
  <Select
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    {...custom}
  >
    children={children}
  </Select>
)

const validate = formValues => {
  let errors = {} // eslint-disable-line
  const requiredFields = [
    'firstName',
    'lastName',
    'country',
    'address',
    'city',
    'country',
    'postcode',
    'phone',
    'email',
  ]

  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })

  return errors
}

let ClientForm = ({handleSubmit, pristine, reset, submitting}) => { // eslint-disable-line
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          component={renderTextField}
          label="First Name"
          name="firstName"
        />
      </div>
      <div>
        <Field
          component={renderTextField}
          label="Last name"
          name="lastName"
        />
      </div>
      <div>
        <Field
          component={renderSelectField}
          label="Country"
          name="country"
        >
          <MenuItem value="Greece">Greece</MenuItem>
          <MenuItem value="UK">UK</MenuItem>
        </Field>
      </div>
      <div>
        <Button
          disabled={pristine || submitting}
          type="submit"
        >
          Submit
        </Button>
      </div>
    </form>
  )
}

ClientForm.proTypes = {
  handleSubmit: propTypes.func.isRequired,
}

ClientForm = reduxForm({
  form: 'clientInfoForm',
  validate,
})(ClientForm)

export default ClientForm
