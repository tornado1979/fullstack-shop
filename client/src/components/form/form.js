import React from 'react'
import propTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import { TextField } from '@material-ui/core'

import { getFormValues } from './selectors/form.selectors'

import './form.scss'

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  fullWidth = false,
  ...custom
} = {}) => {
  return (<TextField
    error={touched && error}
    fullWidth={fullWidth}
    label={label}
    multiline={custom.multiline}
    {...input}
    {...custom}
  />)
}

renderTextField.propTypes = {
  input: propTypes.shape().isRequired,
  label: propTypes.string.isRequired,
  meta: propTypes.shape().isRequired,
  custom: propTypes.shape().isRequired, //eslint-disable-line
}

const renderSelectField = ({
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

const validate = formValues => {
  console.log('validate form')
  let errors = {} // eslint-disable-line
  const requiredFields = [
    'firstName',
    'lastName',
    'companyName',
    'country',
    'streetAddress',
    'townCity',
    'stateCountry',
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

let ClientForm = ({clientInfoForm, handleSubmit, pristine, reset, submitting}) => { // eslint-disable-line
  return (
    <div className="form-wrap">
      <form onSubmit={handleSubmit}>
        <div className="col-1">
          <div className="field">
            <h2>Billing Details</h2>
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              id="firstName"
              label="First Name"
              name="firstName"
            />
            <Field
              component={renderTextField}
              id="lastName"
              label="Last name"
              name="lastName"
            />
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              fullWidth
              id="companyName"
              label="Company Name"
              name="companyName"
            />
          </div>
          <div className="field">
            <Field
              component={renderSelectField}
              fullWidth
              id="country"
              label="Country"
              name="country"
            >
              <MenuItem key="1" value="Greece">Greece</MenuItem>
              <MenuItem key="2" value="UK">UK</MenuItem>
            </Field>
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              fullWidth
              id="streetAddress"
              label="Street Address"
              name="streetAddress"
              placeholder="House number and street name"
            />
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              fullWidth
              id="townCity"
              label="Town/City*"
              name="townCity"
            />
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              fullWidth
              id="stateCountry"
              label="State/Country*"
              name="stateCountry"
            />
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              fullWidth
              id="postcode"
              label="Postcode / ZIP*"
              name="postcode"
            />
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              id="phone"
              label="Phone*"
              name="phone"
            />
            <Field
              component={renderTextField}
              id="email"
              label="E-mail address*"
              name="email"
            />
          </div>
          <div>
            <Button
              disabled={pristine || submitting}
              type="submit"
            >
              Submit
            </Button>
            <Button
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear
            </Button>
          </div>
        </div>
        <div className="col-2">
          <div className="field">
            <h2>Additional Information</h2>
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              fullWidth
              id="orderNotes"
              label="Order Notes"
              multiline
              name="orderNotes"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

ClientForm.proTypes = {
  handleSubmit: propTypes.func.isRequired,
}

ClientForm = reduxForm({
  form: 'clientInfoForm',
  validate,
})(ClientForm)

const mapStateToProps = (state) => {
  return {
    clientInfoForm: (formName) => getFormValues(formName, state),
  }
}
export default connect(mapStateToProps, null)(ClientForm)
