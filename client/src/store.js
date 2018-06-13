import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// reducers
import { reducer as products } from './pages/home/reducers/home.reducers'
import { reducers as cart } from './container/cart/reducers/cart.reducers'

// middlewares
import logger from './middlewares/logger'

// Initial state
const initialState = {
  cart: {
    items: [],
  },
  products: {
    items: [],
  },
}

const enhancers = []
const middleware = [
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
    products,
  }),
  initialState,
  composedEnhancers,
)

export default store
