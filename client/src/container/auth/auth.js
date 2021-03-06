import React from 'react'
import propTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import green from '@material-ui/core/colors/green'
import { withStyles } from '@material-ui/core/styles'

import { getFormValues } from './selectors/form.selectors'

import { renderTextField } from '../../components/fields'

import './auth.scss'

const validate = formValues => {
  let errors = {} // eslint-disable-line
  const requiredFields = [
    'email',
    'password',
  ]

  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = 'Required'
    }
  })

  if (
    formValues.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const styles = {
  checked: {},
  root: {
    '&$checked': {
      color: green[500],
    },
    color: green[600],
  },
  size: {
    height: 40,
    width: 40,
  },
  sizeIcon: {
    fontSize: 20,
  },
}

let AuthForm = ({classes, goto, AuthForm, handleSubmit, pristine, reset, submitting}) => { // eslint-disable-line
  return (
    <div className="auth form-wrap">
      <form onSubmit={handleSubmit}>
        <div className="col-1">
          <div className="logo" />
        </div>
        <div className="col-2">
          <div className="field">
            <h2>Sign in to your account</h2>
          </div>
          <div className="field">
            <Field
              autoComplete="none"
              component={renderTextField}
              id="email"
              label="E-mail address*"
              name="email"
              placeholder="email"
            />
          </div>
          <div className="field">
            <Field
              component={renderTextField}
              id="password"
              label="Password*"
              name="password"
              placeholder="password"
              type="password"
            />
          </div>
          <div>
            <Button
              disabled={pristine || submitting}
              type="submit"
            >
              Sign in
            </Button>
            <Button
              disabled={submitting}
              onClick={goto}
            >
              Sign up
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

AuthForm.proTypes = {
  goto: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
}

AuthForm = reduxForm({
  form: 'authForm',
  validate,
})(AuthForm)

const mapStateToProps = (state) => {
  return {
    AuthForm: (formName) => getFormValues(formName, state),
  }
}
export default compose(
  connect(mapStateToProps, null),
  withStyles(styles),
)(AuthForm)
