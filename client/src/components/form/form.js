import React from 'react'
import propTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'

import { getFormValues } from './selectors/form.selectors'

import {
  renderSelectField,
  renderTextField,
} from '../../components/fields'

import './form.scss'

const validate = formValues => {
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

const styles = {
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  size: {
    width: 40,
    height: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
}

let ClientForm = ({classes, clientInfoForm, handleSubmit, pristine, reset, submitting}) => { // eslint-disable-line
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
          <div className="field">
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  value="checkedB"
                />
              }
              label="CHECK PAYMENTS"
            />
            <p>Please send a check to Store Name, Store Street, Store Town, Store State/County.</p>
          </div>
          <div className="field">
            <FormControlLabel
              control={
                <Checkbox
                  classes={{
                    root: classes.root,
                    checked: classes.checked,
                  }}
                  color="primary"
                  value="checkedB"
                />
              }
              label="PAYPAL"
            />
            <p>PayPal. you can pay with your credit card if you don’t have a PayPal account.</p>
          </div>
          <div>
            <Button
              disabled={pristine || submitting}
              type="submit"
            >
              Place Order
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
export default connect(mapStateToProps, null)(withStyles(styles)(ClientForm))
