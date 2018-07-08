import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// form reducers
import { reducer as formReducer } from 'redux-form'

// reducers
import { reducer as products } from './pages/home/reducers/home.reducers'
import { reducers as cart } from './container/cart/reducers/cart.reducers'
import { reducers as snackbar } from './components/snackbar/reducers/snackbar.reducers'
import { reducers as user } from './container/auth/reducers/auth.reducers'

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
      email: userSaved && userSaved.email,
      token: userSaved && userSaved.token,
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

const store = createStore(
  combineReducers({
    cart,
    form: formReducer,
    products,
    snackbar,
    user,
  }),
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
