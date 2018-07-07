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

import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'

import { getFormValues } from './selectors/form.selectors'

import {
  renderSelectField,
  renderTextField,
} from '../../components/fields'

import './signupForm.scss'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values /* , dispatch */) => {
  console.log('formvalues-async', values)
  return sleep(1000).then(() => {
    // simulate server latency
    // eslint-disable-next-line no-throw-literal
    // throw { email: 'That email is in use' }
  })
}


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
    'password',
  ]

  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })

  if (formValues.password && formValues.password.length < 6) {
    errors.password = 'It\'s too short (min. 6 chars)'
  }

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

let ClientForm = ({classes, clientInfoForm, handleSubmit, pristine, reset, serverMessage, submitting}) => { // eslint-disable-line
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
            <FormControl aria-describedby="phone-helper" className={classes.formControl}>
              <Field
                component={renderTextField}
                id="phone"
                label="Phone*"
                name="phone"
              />
              <FormHelperText id="phone-helper">Please fill that field</FormHelperText>
            </FormControl>
          </div>
          <div className="field">
            <FormControl aria-describedby="email-helper" className={classes.formControl}>
              <Field
                component={renderTextField}
                id="email"
                label="E-mail address*"
                name="email"
              />
              <FormHelperText id="email-helper">Please add your email</FormHelperText>
            </FormControl>
            <FormControl aria-describedby="password-helper" className={classes.formControl}>
              <Field
                component={renderTextField}
                id="password"
                label="password*"
                name="password"
                type="password"
              />
              <FormHelperText id="password-helper">Password must be at least 6 chars long.</FormHelperText>
            </FormControl>
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
              Sign up
            </Button>
            <Button
              disabled={pristine || submitting}
              onClick={reset}
            >
              Clear
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            {serverMessage}
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
              label="Notes"
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
  serverMessage: propTypes.string.isRequired,
}

ClientForm = reduxForm({
  form: 'clientInfoForm',
  validate,
  asyncValidate,
})(ClientForm)

const mapStateToProps = (state) => {
  return {
    clientInfoForm: (formName) => getFormValues(formName, state),
  }
}
export default connect(mapStateToProps, null)(withStyles(styles)(ClientForm))
