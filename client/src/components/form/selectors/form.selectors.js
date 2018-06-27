import { createSelector } from 'reselect'

const getLocalState = (state) => state.form

export const getFormValues = createSelector(
  getLocalState,
  form => form && form.clientInfoForm,
)
