import { combineReducers, createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// reducers
import { reducer as products } from './pages/home/reducers/home.reducers'
import { reducers as cart } from './container/cart/reducers/cart.reducers'

// middlewares
import logger from './middlewares/logger'

// actionCreators
import { fetchCart } from './container/cart/actionCreators/cart.actionCreatros'

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

store.dispatch(fetchCart())

export default store
