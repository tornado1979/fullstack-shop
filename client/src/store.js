import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux'
import thunk from 'redux-thunk'

// form reducers
import { reducer as formReducer } from 'redux-form'

// reducers
import { reducer as products } from './pages/home/reducers/home.reducers'
import { reducers as cart } from './container/cart/reducers/cart.reducers'
import { reducers as snackbar } from './components/snackbar/reducers/snackbar.reducers'
import { reducers as user } from './container/auth/reducers/auth.reducers'
import { reducers as orders } from './components/order/reducers/order.reducers'
// middlewares
import logger from './middlewares/logger'
import { handleSnackBar } from './middlewares/snackbar'

// actionCreators
import { fetchCart } from './container/cart/actionCreators/cart.actionCreators'


// read localStorage
const userSaved = localStorage.getItem('user') !== null ? JSON.parse(localStorage.getItem('user')) : null

// Initial state
const initialState = {
  cart: {
    items: [],
  },
  orders: {
    orders: [],
  },
  products: {
    items: [],
  },
  snackbar: {
    message: '',
    open: false,
    variant: 'info',
  },
  user: {
    loading: false,
    message: '',
    user: {
      companyName: userSaved && userSaved.companyName,
      country: userSaved && userSaved.country,
      email: userSaved && userSaved.email,
      firstName: userSaved && userSaved.firstName,
      id: userSaved && userSaved._id,
      lastName: userSaved && userSaved.lastName,
      phone: userSaved && userSaved.phone,
      postcode: userSaved && userSaved.postcode,
      stateCountry: userSaved && userSaved.stateCountry,
      streetAddress: userSaved && userSaved.streetAddress,
      token: userSaved && userSaved.token,
      townCity: userSaved && userSaved.townCity,
    },
  },
}

const enhancers = []
const middleware = [
  handleSnackBar,
  thunk,
]

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger)
  const devToolsExtension = window.devToolsExtension // eslint-disable-line prefer-destructuring

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
)

const appreducers = combineReducers({
  cart,
  form: formReducer,
  orders,
  products,
  snackbar,
  user,
})

const rootreducers = (state, action) => {
  if (action.type === 'SIGN_OUT') {
    state = undefined // eslint-disable-line
  }

  return appreducers(state, action)
}

const store = createStore(
  rootreducers,
  initialState,
  composedEnhancers,
)

store.subscribe(() => {
  console.log('[Subscription]', store.getState())
})

if (userSaved) {
  store.dispatch(fetchCart(userSaved.token))
}


export default store
